import { Injectable } from '@angular/core';
import 'rxjs/add/operator/first';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
// Product Class -->

export class Product {

  productId: string;
  productTitle: string;
  productDescription: string;
  productPrice: string;
  productImage: string;
  productImages: string[]; // String Array
  starrating: number[] = [];
  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }

}

// <-- Product Class

// DashboardBridgeService -->

@Injectable()
export class DashboardBridgeService {

  ajaxInProgress = false;   // Ajax Loader Flag for Home dashboard
  products: Product[] = []; // Array for Home Dashboard
  recommendedProducts = [];
  sideNavLabel: string;     // Sub-Label for SideNav Panel
  //--------------------------------------------------------------
  gender: string = localStorage.getItem('gender'); // Value for Side-Nav Filter [ Gender ]
  style: string = 'boots';  // Value for Side-Nav Filter [ Style  ]
  size: number;   // Value for Side-Nav Filter [ Size   ]
  options: any = {};   // Product Filter Object
  //--------------------------------------------------------------
  currentProduct: Product = new Product({ productImages: [''] }); // Object for Product Dashboard

  mMenu = [{ categoryKey: 'boots', categoryValue: 'Boots'},{ categoryKey: 'formals', categoryValue: 'Formal Shoes'}];
  fMenu = [{ categoryKey: 'boots', categoryValue: 'Boots'},{ categoryKey: 'formals', categoryValue: 'Formal Shoes'},{ categoryKey: 'heels', categoryValue: 'Heels'}];

  categories = null;

  constructor(private productService: ProductService) {
    if (this.gender == 'm') {
      this.sideNavLabel = 'Men\'s Shoes';
      this.categories = this.mMenu;
    } else {
      this.sideNavLabel = 'Women\'s Shoes';
      this.categories = this.fMenu;
    }
  }

  changeGender(gender) {
    if (this.gender != gender) {
      this.style = this.options.style = 'boots';
      this.size = this.options.size = 0;
    }
    this.gender = this.options.gender = gender;
    if (gender == 'm') {
      this.sideNavLabel = 'Men\'s Shoes';
      this.categories = this.mMenu;
    } else {
      this.sideNavLabel = 'Women\'s Shoes';
      this.categories = this.fMenu;
    }
    this.loadData();
  }

  changeStyle(style) {
    this.style = this.options.style = style;
    this.loadData();
  }

  changeSize(size) {
    this.size = this.options.size = size;
    this.loadData();
  }

  loadData() {
    this.products = [];
    this.ajaxInProgress = true;
    this.productService.getProductByStyle(this.options).first().subscribe(
      (dataArray: any) => {
        for (let entry of dataArray) {
          let product: Product = new Product();
          product.productId = entry.productid;
          product.productTitle = entry.name;
          product.productDescription = this.trimDescription(entry.description);
          product.productImage = entry.imageslocation[entry.color].location[0];
          product.productPrice = entry.price.currentprice;
          for (var i = 0; i < 5; i++) {
            if (i < entry.starrating) {
              product.starrating.push(1);
            } else {
              product.starrating.push(0);
            }

          }
          this.products.push(product);
        }
        this.ajaxInProgress = false;
      });
  }

  trimDescription(desc: string) {
    // Method to trim product description while displaying as thumbnail in home dashboard
    if ((desc !=null) && (desc != undefined) && (desc.length > 75)) {
      return (desc.substr(0, 75) + '...');
    }
    return desc;
  }

  loadReccomendations() {
    this.recommendedProducts = [];

    this.productService.loadRecommendations().first().subscribe(
      (dataArray: any) => {

        var slide: Product[] = [];
        var count = 0;
        for (let entry of dataArray.recommendations) {

          console.log(JSON.stringify(entry));

          let product: Product = new Product();
          product.productId = entry.Product.productid;
          product.productTitle = entry.Product.name;
          product.productDescription = this.trimDescription(entry.Product.description);
          product.productImage = entry.Product.imagelocation[0].location[0];
          product.productPrice = entry.Product.price.currentPrice;

          for (var i = 0; i < 5; i++) {
            if (i < entry.Product.starrating) {
              product.starrating.push(1);
            } else {
              product.starrating.push(0);
            }

          }
          slide.push(product);
          if (count == 3) { //pack products into slides of 4 product and push to array
            this.recommendedProducts.push(slide);
            slide = [];
            count = 0;
            continue;
          }
          count++; //increment count on each iteration

        }
        this.recommendedProducts.push(slide);

      });

  }
  
  logClickStream(style, gender, productid, browsedate, affinity) {

    var payload = { 
                    customerId: localStorage.getItem('currentUser'),
                    styleGenderProductId: (style + '-' + gender + '-' + productid),
                    clickStreamData: {
                      style: style,
                      gender: gender,
                      productId: productid,
                      browsedDate: browsedate,
                      affinity: affinity 
                    }
                  };

    this.productService.logClickStreamData(payload);
    
  }

}

// <-- DashboardBridgeService