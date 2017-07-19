import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

export class CartItem {
  productImage: string;
  productId: string;
  gender: string;
  style: string;
  productTitle: string;
  productPrice: number;
  productCount: number = 1;
  productTotalPrice: number;
  isCheckedOut: boolean = false;
}

export class Style {
  style : string;
  gender : string;

}

@Injectable()
export class CartService {

  public items: CartItem[] = [];
  public itemCount: number = 0;
  public totalAmount: number = 0;

  constructor(private http: Http) { 
    var cartJSON = localStorage.getItem("cart");
    this.items = JSON.parse(cartJSON);
    if(this.items==null){
      this.items=[];
    }
  }

  addToCart(event, item) {

    let itemPresentInCart = false;

    if (this.items.length > 0) {
      for (let entry of this.items) {
        if (entry.productId == item.productId) {
          itemPresentInCart = true;
          entry.productCount = entry.productCount + 1;
          entry.productTotalPrice = entry.productPrice * entry.productCount; 
        } 
      }
    }

    if (!itemPresentInCart) {

      let cartItem: CartItem = new CartItem();
      cartItem.gender = item.gender;
      cartItem.productImage = item.productImages[0];
      cartItem.productTitle = item.productTitle.slice(0, 12);
      cartItem.productId = item.productId;
      cartItem.productPrice = item.productPrice;
      cartItem.productTotalPrice = item.productPrice;
      cartItem.style = item.style;
      
      this.items.push(cartItem);
    }

    this.itemCount = this.itemCount + 1;
    localStorage.setItem("cart", JSON.stringify(this.items));
    itemPresentInCart = false;
    this.refreshTotalAmount();
  }

  refreshTotalAmount() {
    if (this.items.length > 0) {
      for (let entry of this.items) {
        this.totalAmount = this.totalAmount + entry.productTotalPrice; 
      }
    }
  }

}
