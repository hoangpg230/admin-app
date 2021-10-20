import { Component, OnChanges, DoCheck, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../core/services/authentication.service'
import { NotificationService } from './../core/services/notification.service';
import { UtilityService } from './../core/services/utility.service';
import { Menus } from './../core/common/Menus';

declare var $: any
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit, DoCheck {
  importScriptTags(url: string) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = url;
    this.elementRef.nativeElement.appendChild(s);
  }
  ngAfterViewInit() {
    this.importScriptTags('./../../assets/js/sb-admin-2.min.js')
  }

  userInfo: any
  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private authenticationService: AuthenticationService,
    private utilityService: UtilityService,
  ) { }
  menus: any = Menus.menus
 
  currentRouter: string = "main/home"
  changeRoute(e: any, route: any) {
    
    if(this.currentRouter != route.substr(1)) {
     
      $('#loader').addClass('loader')
    }
    e.preventDefault()
    if (e.path[0].className != 'dashboard') {
      e.path[0].parentElement.parentElement.parentElement.querySelector('a').click()
    }
    var promise = new Promise(resolve => {
      setTimeout(() => {
        resolve(this.router.navigate([route]))
      }, 200)
    })
    promise.then(res => this.currentRouter = this.router.url.substr(1))
    .then(res=>{
      $('#loader').hasClass('loader') && $('#loader').removeClass('loader')
    })
  }


  logOut() {
    $('.btn-dismiss-modal').click()
    setTimeout(() => {
      this.authenticationService.Logout()
      this.utilityService.navigateToLogin()
    }, 500)
  }
  ngOnInit(): void {
    this.userInfo = this.authenticationService.getUser()
  }
  
  ngDoCheck(): void {
    
  }

}
