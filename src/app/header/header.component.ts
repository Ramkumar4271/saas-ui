import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loggedUser: any = '';
  loggedUserSubsription: any;
  popupTitle = '';
  popupMessage: string = '';
  popupSubsription: any;
  @ViewChild('model', { static: false }) model: ElementRef<HTMLInputElement> = {} as ElementRef;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('fullname')){
      this.loggedUser = sessionStorage.getItem('fullname');
    }
    this.loggedUserSubsription = this.authService.isLoggedIn.subscribe(value => this.loggedUser = value);
    this.popupSubsription = this.authService.showPopup.subscribe(value => {
      this.popupTitle = value.title;
      this.popupMessage = value.message;
      this.showModel();
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.loggedUserSubsription.unsubscribe();
  }

  showModel() {
    let el: HTMLElement = this.model.nativeElement;
    el.click();
  }

}
