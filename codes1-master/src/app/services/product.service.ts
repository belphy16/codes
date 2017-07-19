import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams,RequestMethod } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  logClickStreamData(payload: any) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('https://1gt97pyvwb.execute-api.ap-southeast-1.amazonaws.com/nonprod/clickstreamlog', JSON.stringify(payload), { headers: headers }).subscribe(r => {
      return r.json();
    });

  }

  getProductByStyle(urlParams: any) {

    let params: URLSearchParams = new URLSearchParams();
    params.set('style', urlParams.style);
    params.set('gender', urlParams.gender);
    if (urlParams.size && urlParams.size > 0) {
      params.set('size', urlParams.size);
    }

    return this.http.get('https://seo3hck9i0.execute-api.ap-southeast-1.amazonaws.com/nonprod/ProductByStyle', { search: params }).map((response: Response) => response.json());

  }

  getProductByProductId(urlParams: any) {

    let params: URLSearchParams = new URLSearchParams();
    params.set('style', urlParams.style);
    params.set('gender', urlParams.gender);
    params.set('productid', urlParams.productId);
    if ((urlParams.size != undefined) && (urlParams.size != null)) {
      params.set('size', urlParams.size);
    }
    if ((urlParams.color != undefined) && (urlParams.color != null)) {
      params.set('color', urlParams.color);
    }
    if ((urlParams.material != undefined) && (urlParams.material != null)) {
      params.set('material', urlParams.material);
    }

    return this.http.get('https://seo3hck9i0.execute-api.ap-southeast-1.amazonaws.com/nonprod/ProductByProductId', { search: params }).map((response: Response) => response.json());

  }

  getProductPrice(urlParams: any) {

    let params: URLSearchParams = new URLSearchParams();
    params.set('style', urlParams.style);
    params.set('gender', urlParams.gender);

    return this.http.get('https://seo3hck9i0.execute-api.ap-southeast-1.amazonaws.com/nonprod/ProductPrice', { search: params }).map((response: Response) => response.json());

  }

  loadRecommendations() {

    let params: URLSearchParams = new URLSearchParams();
    params.set('custid', localStorage.getItem("currentUser"));

    return this.http.get('http://infy-recommendation-service-dev.ap-southeast-1.elasticbeanstalk.com/RecommendationApi/RecommendationByCustomerId/', { search: params }).map((response: Response) => { 
      return response.json();
    });
  }

}
