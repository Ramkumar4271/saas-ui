import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  pricings: any[] = [];
  selectedService: any = {};
  isServiceAdded = false;
  
  constructor(private router: Router, private appService: AppService, private authService: AuthService) { }

  ngOnInit(): void {
    this.appService.getPricing().subscribe((response: any) => {
      this.pricings = response.data;
      this.selectedService = this.appService.selectedService;
      this.isServiceAdded = this.appService.isServiceAdded;
    });
  }

  onPurshase(pricing: any) {
    const order = {
      "service_id": this.selectedService.id,
      "service_name": this.selectedService.name,
      "pricing_id": pricing.id,
      "pricing_name": pricing.name,
      "price": pricing.price
    };
    this.appService.createOrder(order).subscribe((response) => {
      console.log("Created Order", response.data);
      this.appService.selectedService = {};
      this.appService.isServiceAdded = false;
      this.router.navigate(['/checkout']);
    });
    
  }

}
