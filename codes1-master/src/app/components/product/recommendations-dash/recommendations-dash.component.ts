import { Component, OnInit } from '@angular/core';
import { DashboardBridgeService } from "../../../services/dashboard-bridge.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-recommendations-dash',
  templateUrl: './recommendations-dash.component.html',
  styleUrls: ["../product.component.css"]
})
export class RecommendationsDashComponent implements OnInit {

  constructor(private dashboardBridge: DashboardBridgeService,private router: Router) { }

  ngOnInit() {
    this.dashboardBridge.loadReccomendations();
  }
  showProductDetails(productId, gender, style) {
    this.dashboardBridge.options.productId = productId;
    this.dashboardBridge.options.size = 0;
    this.dashboardBridge.options.gender = this.dashboardBridge.gender; 
    this.dashboardBridge.options.style = this.dashboardBridge.style;
    this.dashboardBridge.logClickStream(this.dashboardBridge.style, this.dashboardBridge.gender, productId, new Date(),1);
    this.router.navigate(['/product', this.dashboardBridge.options]);
  }
}
