import { Component, OnInit } from '@angular/core';
import { Product, DashboardBridgeService } from '../../services/dashboard-bridge.service';
import { CartItem,CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']  
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private dashboardBridge: DashboardBridgeService) { }

  ngOnInit() {
   
  }

  changeGender(gender) {
    this.dashboardBridge.changeGender(gender);
    this.dashboardBridge.size = this.dashboardBridge.options.size = 0;
    this.dashboardBridge.style = this.dashboardBridge.options.style = 'boots';
    this.dashboardBridge.loadData();
  }

toHome(){
    this.router.navigate(['/home']);
}
}
