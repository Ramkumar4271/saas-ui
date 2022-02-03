import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateGaurdService } from './authenticate-gaurd.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PricingComponent } from './pricing/pricing.component';
import { ServicesComponent } from './services/services.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'services', component: ServicesComponent },
  { path: 'pricing', component: PricingComponent, canActivate: [ AuthenticateGaurdService]},
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent},  
  { path: 'checkout', component: CheckoutComponent, canActivate: [ AuthenticateGaurdService]},
  { path: '', redirectTo: 'home', pathMatch: "full"},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
