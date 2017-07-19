import { Component, OnInit } from '@angular/core';
import { DashboardBridgeService } from "../../../services/dashboard-bridge.service";
import { CartItem, CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-dash',
  templateUrl: './product-dash.component.html',
  styleUrls: ["../product.component.css"]
})
export class ProductDashComponent implements OnInit {
  currentThumb: number = 0;
  constructor(private dashboardBridge: DashboardBridgeService, private cart: CartService) { }

  ngOnInit() {
    this.currentThumb = 0;
  }

  // Method for pushing Product to Shopping Cart
  addToCart(event, item, affinity) {
    item.gender = this.dashboardBridge.gender;
    item.style = this.dashboardBridge.style;
    this.cart.addToCart(event, item);
    event.stopPropagation();

    this.dashboardBridge.logClickStream(this.dashboardBridge.style, this.dashboardBridge.gender, item.productId, new Date(), affinity);
  }

  setCurrentThumb(index) {
    this.currentThumb = index;
  }
}

