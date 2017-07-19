import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import {HomeDashComponent} from './home-dash/home-dash.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import {DashboardBridgeService} from '../../services/dashboard-bridge.service';
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[DashboardBridgeService]
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    $('#list').click(function (event) { event.preventDefault(); $('#products .item').addClass('list-group-item'); });
    $('#grid').click(function (event) { event.preventDefault(); $('#products .item').removeClass('list-group-item'); $('#products .item').addClass('grid-group-item'); });

  }
}

