import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  orders: any[] = [];
  total: number = 0;

  constructor(private appService: AppService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.appService.getOrders().subscribe((response) => {
      this.orders = response.data;
      this.orders.forEach(order => this.total += order.price);
    })
  }

  deleteOrder(id: any) {
    this.appService.deleteOrder(id).subscribe((response: any) => {
      this.authService.showPopup.emit({ title: 'Info', message: response.data });
      const index = this.orders.findIndex(o => o.order_id === id);
      this.orders.splice(index, 1);
      this.orders.forEach(order => this.total += order.price);
      if(this.orders.length==0){
        this.router.navigate(['/services']);
      }
    })
  }

  placeOrders() {
    this.appService.placeOrders(this.orders).subscribe((response) => {
      this.authService.showPopup.emit({title: 'Order Status', message: response.data});
      this.router.navigate(['/home']);
    });
  }

}
