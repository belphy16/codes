import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MyShoeRackRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideNavComponent } from './components/home/side-nav/side-nav.component';
import { HomeDashComponent } from './components/home/home-dash/home-dash.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDashComponent } from './components/product/product-dash/product-dash.component';
import { RecommendationsDashComponent } from './components/product/recommendations-dash/recommendations-dash.component';
import { DashboardBridgeService } from './services/dashboard-bridge.service';
import { CartComponent } from './components/header/cart/cart.component';
import { CartService } from './services/cart.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutDashComponent } from './components/checkout/checkout-dash/checkout-dash.component';
import { PromotionsDashComponent } from './components/checkout/promotions-dash/promotions-dash.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    HomeDashComponent,
    ProductComponent,
    ProductDashComponent,
    RecommendationsDashComponent,
    CartComponent,
    CheckoutComponent,
    CheckoutDashComponent,
    PromotionsDashComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyShoeRackRoutingModule
  ],
  providers: [
    AuthService,
    ProductService,
    DashboardBridgeService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
