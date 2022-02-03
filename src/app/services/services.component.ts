import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  services: any[] = [];
  icons = ['bi-display', 'bi-bar-chart-line', 'bi-briefcase', 'bi-pencil-square', 'bi-phone', 'bi-layers'];
  isLogged = false;

  constructor(private router: Router, private appService: AppService, private authService: AuthService) { }

  ngOnInit(): void {
    this.appService.getServices().subscribe((response: any) => {
      this.services = response.data;
    });
    this.isLogged = this.authService.validateToken();
  }

  onPricing(service: any) {
    this.appService.selectedService = service;
    this.appService.isServiceAdded = true;
    // console.log(this.appService.orders)
    this.router.navigate(['/pricing']);
  }

}
