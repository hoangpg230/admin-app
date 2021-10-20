import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


//services
import { AuthenticationService } from './../app/core/services/authentication.service';
import { NotificationService } from './../app/core/services/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) { }

  
  ngOnInit() {

  }
}
