import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../core/services/authentication.service'
import { NotificationService } from './../core/services/notification.service';
import { UtilityService } from './../core/services/utility.service';

declare var Validator: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    
  ]
})
export class LoginComponent implements OnInit {
  $:any = document.querySelector.bind(document)
  constructor(
    private utilityService: UtilityService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isEmail('#email'),
        Validator.minLength('#password', 6),
      ],
      onSubmit:  (data:any)=> {
        this.$('#loader').classList.add('loader');
        this.authenticationService.Login(data.email, data.password).subscribe(res=>{
          this.utilityService.Navigate('main/home')
          this.$('#loader').classList.remove('loader');
        }, error=>{
          this.notificationService.alertErrorMS("Thông báo", error)
          this.$('#loader').classList.remove('loader');
        });

      }
    })
  }

}
