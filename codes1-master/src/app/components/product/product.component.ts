import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product, DashboardBridgeService } from "../../services/dashboard-bridge.service";
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit, OnDestroy {

  paramsSub: any;
  filterOptions: any = {};
  currentProduct: Product = null;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private dashboardBridge: DashboardBridgeService) { }

  ngOnInit() {

    this.paramsSub = this.route.params.subscribe(params => {
      this.filterOptions.productId = params['productId'],
        this.filterOptions.gender = params['gender'],
        this.filterOptions.style = params['style']
      this.productService.getProductByProductId(this.filterOptions).first().subscribe(
        (data: any) => {

          this.dashboardBridge.currentProduct = new Product();
          this.dashboardBridge.currentProduct.productId = data.productid;
          this.dashboardBridge.currentProduct.productTitle = data.name;
          for (var i = 0; i < 5; i++) {
            if (i < data.starrating) {
              this.dashboardBridge.currentProduct.starrating.push(1);
            } else {
              this.dashboardBridge.currentProduct.starrating.push(0);
            }

          }
          this.dashboardBridge.currentProduct.productDescription = data.description;
          this.dashboardBridge.currentProduct.productImages = data.imageslocation[data.color].location;
          this.dashboardBridge.currentProduct.productPrice = data.price.currentprice;
        });
    });


  }

  ngOnDestroy() {
    this.filterOptions = {};
    this.currentProduct = null;
  }

}
