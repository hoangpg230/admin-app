import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from '../../../core/services/utility.service';
import { MessageConstants } from '../../../core/common/message.constants';



declare var Validator: any, $: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
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
    label: "Mật khẩu:",
    id: "password",
    name: "password",
    type: "password",
    value: "",
    placeholder: "Nhập mật khẩu...",
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
       
        localStorage.setItem('listEmailUser', btoa(JSON.stringify(this.listEmailUser)))
        this.listEmailUser = JSON.parse(atob(localStorage.getItem('listEmailUser') || '{}'))
      }, error => this.notificationService.alertErrorMS("Thông báo", error)
    )

    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#name'),
        Validator.isEmail('#email'),
        Validator.isExist('#email', this.listEmailUser),
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
            avatar: result,
          }

          that.dataService.POST('api/user/insert', dataSubmit).subscribe(
            res => {
              that.notificationService.alertSuccessMS("Thông báo", MessageConstants.CREATE_OK_MSG)
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
