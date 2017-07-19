import { Component, OnInit } from '@angular/core';
import { Product, DashboardBridgeService } from '../../../services/dashboard-bridge.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['../home.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private dashboardBridge: DashboardBridgeService) { }

  ngOnInit() {
    
  }
 
}
