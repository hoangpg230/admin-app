import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from '../../../core/services/utility.service';
import { MessageConstants } from '../../../core/common/message.constants';

declare var Validator: any, $: any;
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenService: AuthenticationService,
    private dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService
  ) {

  }


  listEmailUser: any[] = [];

  branch = {
    name: "user",
    route: 'user'
  }

  inputs = [{
    label: "Tên người dùng:",
    id: "name",
    name: "name",
    type: "text",
    value: "",
    placeholder: "Nhập tên người dùng...",
    width: "col col-lg-9"
  },
  {
    label: "Email:",
    id: "email",
    name: "email",
    type: "email",
    value: "",
    placeholder: "Nhập email...",
    width: "col col-lg-9"
  },
  {
    label: "Mật khẩu mới:",
    id: "password",
    name: "password",
    type: "password",
    value: "",
    placeholder: "Nhập mật khẩu mới...",
    width: "col col-lg-9"
  },
  {
    label: "Nhập lại mật khẩu:",
    id: "password_confirmation",

    type: "password",
    value: "",
    placeholder: "Nhập lại mật khẩu...",
    width: "col col-lg-9"
  },
  {
    label: "Địa chỉ:",
    id: "address",
    name: "address",
    type: "text",
    value: "",
    placeholder: "Nhập địa chỉ...",
    width: "col col-lg-9"
  },
  {
    label: "Số điện thoại:",
    id: "phoneNumber",
    name: "phoneNumber",
    type: "text",
    value: "",
    placeholder: "Nhập số điện thoại...",
    width: "col col-lg-9"
  },
  {
    label: "Ảnh đại diện:",
    id: "avatar",
    name: "avatar",
    type: "file",
    value: "",
    placeholder: "Chọn hình ảnh...",
    width: "col col-lg-9"
  },
  ]
  keyImage = "avatar"

  backPage() {
    this.utilityService.Navigate('/main/category/index')
  }

  ngOnInit(): void {

    this.dataService.GET('api/user/getAll').subscribe(
      (res: any) => {
        res.forEach((res: any) => {
          if (res) {
            this.listEmailUser.push(res.email)
          }
        })
        this.dataService.GET('api/user/getById?id=' + this.route.snapshot.paramMap.get('id')).subscribe(
          (_res: any) => {

            this.inputs[0].value = _res.name;
            this.inputs[1].value = _res.email;
            this.inputs[2].value = '';
            this.inputs[4].value = _res.address;
            this.inputs[5].value = _res.phoneNumber;
            this.inputs[6].value = _res.avatar;

            var newListEmailUser = this.listEmailUser.filter((value: any) => value != _res.email)
            localStorage.setItem('listEmailUser', btoa(JSON.stringify(newListEmailUser)))
          }
        )


      }, error => this.notificationService.alertErrorMS("Thông báo", error)
    )

    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#name'),
        Validator.isEmail('#email'),
        Validator.isExist('#email', JSON.parse(atob(localStorage.getItem('listEmailUser') || '{}'))),
        Validator.minLength('#password', 6),
        Validator.isRequired('#password_confirmation'),
        Validator.isConfirmed('#password_confirmation', function () {
          return $('#form-1 #password').val();
        }, 'Mật khẩu nhập lại không chính xác'),
        Validator.isRequired('#address'),
        Validator.isPhoneNumber('#phoneNumber'),
      ],
      onSubmit: (data: any) => {
        Object.keys(data).forEach(key => key == 'undefined' ? delete data[key] : {})
        const that = this
        var form = new FormData();
        form.append("image", $("#avatar")[0].files[0]);

        function uploadImage() {
          return new Promise((resolve, reject) => {
            if ($('#avatar').val()) {
              $('#loader').addClass('loader');
              var settings = {
                "url": "https://api.imgbb.com/1/upload?key=c5cfc2d7918ba161a5fdbea2e2cc7883",
                "method": "POST",
                "timeout": 0,
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
              };
              $.ajax(settings).done(function (response: any) {
                var jx = JSON.parse(response);
                resolve(jx.data.url);
              })
            }
            else {
              $('#loader').addClass('loader');
              resolve('');
            }
          })
        }
        async function asyncCall() {
          const result = await uploadImage();
          let dataSubmit = {
            ...data,
            userId: that.route.snapshot.paramMap.get('id'),
            avatar: result,
          }

          that.dataService.PUT('api/user/update', dataSubmit).subscribe(
            res => {
              that.notificationService.alertSuccessMS("Thông báo", MessageConstants.UPDATE_OK_MSG)
              that.utilityService.Navigate('main/user/index')
              $('#loader').removeClass('loader');
            }, err => {
              that.notificationService.alertErrorMS("Thông báo", err),
                $('#loader').removeClass('loader');
            }
          )
        }
        asyncCall()

      }
    })
  }
}
