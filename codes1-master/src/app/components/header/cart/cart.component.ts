import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../../services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService) { }

  ngOnInit() {
  }

  removeItem(item) {
    this.cartService.items.forEach((element,index) => {
      if(element===item){
         this.cartService.items.splice(index, 1);
         this.cartService.itemCount = this.cartService.itemCount - item.productCount;
         if (this.cartService.itemCount < 0) {
           this.cartService.itemCount = 0;
           this.cartService.items = [];
         } 
         localStorage.setItem("cart", JSON.stringify(this.cartService.items));
         return;
      }
    });
  }



}
