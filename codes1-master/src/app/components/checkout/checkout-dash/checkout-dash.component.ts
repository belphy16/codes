import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, CartService } from '../../../services/cart.service';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-checkout-dash',
  templateUrl: './checkout-dash.component.html',
  styles: ['.panel-info { border-color: #DADADA; } .panel-info>.panel-heading{ background-image:linear-gradient(to bottom,#EAEAEA 0,#ECECEC 100%);}']
})
export class CheckoutDashComponent implements OnInit {

  constructor(private cartService: CartService, private http: Http, private router: Router) { }

  grandTotal: number = 0;

  ngOnInit() {
    this.calculateGrandTotal();
  }

  calculateGrandTotal() {
    this.grandTotal = 0;
    var itemPrice = 0;
    for (let i of this.cartService.items) {
        if(typeof i.productTotalPrice === 'string')
        itemPrice = parseInt(i.productTotalPrice);
        else
        itemPrice = i.productTotalPrice;
      this.grandTotal = this.grandTotal + itemPrice;
    }
  }

  doCheckout() {

    if (this.cartService.items.length == 0) {
      alert('Your Shopping Cart is Empty. Please add atleast one item !!');
      return;
    }

   // let orderDate = new Date();

    let params: URLSearchParams = new URLSearchParams();
    params.set('customerid', localStorage.getItem('currentUser'));

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let d = new Date();
    let orderDate = [ d.getFullYear(),      
      ((d.getMonth()+1)+"").length>1?d.getMonth():"0"+d.getMonth(),
                    (d.getDate()+"").length>1?d.getDate():"0"+d.getDate(),
                    ].join('-')+
                    ' ' +
                  [ (d.getHours()+"").length>1?d.getHours():"0"+d.getHours(),
                    (d.getMinutes()+"").length>1?d.getMinutes():"0"+d.getMinutes(),
                    (d.getSeconds()+"").length>1?d.getSeconds():"0"+d.getSeconds()].join(':');

    let orderPayload = {
      'customerId': localStorage.getItem('currentUser'),
      'orderdate': orderDate,
      'totalamount': this.grandTotal,
      'itemcount': this.cartService.itemCount,
      'styles': []
    }

    let mStyles = [];
    let fStyles = [];

    for (let entry of this.cartService.items) {
      let styleObj: any = {};
      styleObj.style = entry.style;
      styleObj.gender = entry.gender;
      styleObj.productids = [];

      if (entry.gender == 'm') {
        if (mStyles.indexOf(entry.style) == -1) {
          mStyles.push(entry.style);
          orderPayload.styles.push(styleObj);
        }
      } else {
        if (fStyles.indexOf(entry.style) == -1) {
          fStyles.push(entry.style);
          orderPayload.styles.push(styleObj);
        }
      }
    }

    mStyles = [];
    fStyles = [];

    for (let sty of orderPayload.styles) {
      for (let itm of this.cartService.items) {
        if ((!itm.isCheckedOut) && (sty.gender == itm.gender) && (sty.style == itm.style)) {
          let prodObj: any = {};
          prodObj.id = itm.productId;
          prodObj.itemcount = itm.productCount;
          prodObj.totalamount = itm.productTotalPrice;
          prodObj.isrecommended = true;
          itm.isCheckedOut = true;
          sty.productids.push(prodObj);
        }
      }
    }

 //   console.log('Order Payload :: ' + JSON.stringify(orderPayload));

    this.http.post('https://4vd004sjgc.execute-api.ap-southeast-1.amazonaws.com/nonprod/customerorder?custid=' + localStorage.getItem("currentUser"), 
      JSON.stringify(orderPayload), { headers: headers })
        .subscribe(response => {
//          console.log(response.json());
          return response.json();
        });

    this.cartService.items = [];
    localStorage.setItem("cart", JSON.stringify(this.cartService.items));
    this.cartService.itemCount = 0;
    this.grandTotal = 0;

    alert('Order Placed Successfully !!!');

    this.router.navigate(['/home']);

  }

  updateProductQuantity(i, productCount) {

    this.cartService.items[i].productCount = productCount;
    this.cartService.items[i].productTotalPrice = productCount * this.cartService.items[i].productPrice;
    this.calculateGrandTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartService.items));
    
  }

}
