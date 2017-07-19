import { Component, OnInit } from '@angular/core';
import { Product, DashboardBridgeService } from '../../../services/dashboard-bridge.service';
import { CartItem, CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-dash',
  templateUrl: './home-dash.component.html',
  styleUrls: ['../home.component.css','./home-dash.component.css']
})
export class HomeDashComponent implements OnInit {

  constructor(private router: Router,private dashboardBridge: DashboardBridgeService) { }

  ngOnInit() {

    if(localStorage.getItem('gender') == null) {
      this.dashboardBridge.gender = this.dashboardBridge.options.gender = 'm';  
    } else {
      this.dashboardBridge.gender = this.dashboardBridge.options.gender = localStorage.getItem('gender');
    }
    this.dashboardBridge.size = this.dashboardBridge.options.size = 0;
    this.dashboardBridge.style = this.dashboardBridge.options.style = 'boots';
    this.dashboardBridge.loadData();
  }

  // Method for displaying Product Details
  loadProduct(productId: string, affinity:number) {
    this.dashboardBridge.options.productId = productId;
    this.dashboardBridge.logClickStream(this.dashboardBridge.style,this.dashboardBridge.gender,productId,new Date(),affinity);
    this.router.navigate(['/product', this.dashboardBridge.options]);
  }

}
