import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from '../../../core/services/utility.service';
import { MessageConstants } from '../../../core/common/message.constants';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';



declare var $: any, Validator: any
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
  ) { }

  public Editor = ClassicEditor;
  public model = {
    editorData: '<p>Hello, world!</p>'
  };

  branch = {
    name: "sản phẩm",
    route: 'product'
  }

  inputs = [{
    label: "Tên Sản Phẩm:",
    id: "name",
    name: "name",
    type: "text",
    value: "",
    placeholder: "Nhập tên sản phẩm...",
    width: "col col-lg-9"
  },
  {
    label: "Giá Sản Phẩm:",
    id: "price",
    class: "format_number",
    name: "price",
    type: "number",
    value: "",
    placeholder: "Nhập giá sản phẩm...",
    width: "col col-lg-9"
  },
  {
    label: "Hình Ảnh:",
    id: "image",
    name: "image",
    type: "file",
    value: "",
    placeholder: "Chọn file ảnh...",
    width: "col col-lg-9"
  },
  {
    label: "Số lượng:",
    id: "remainQuantity",
    name: "remainQuantity",
    type: "number",
    value: "",
    placeholder: "Nhập số lượng...",
    width: "col col-lg-9"
  }]
  keyImage = "image"

  select = {
    label: "Chọn danh mục cha",
    name: "categoryId",
  }

  handleOptionChange(value: any) {
    Object.assign(this.select, { referenId: value })
  }

  backPage() {
    this.utilityService.Navigate('/main/product/index')
  }

  ngOnInit(): void {
   
    this.dataService.GET('api/category/getAll').subscribe(
      res => {
        Object.assign(this.select, { data: res })
      }, error => this.notificationService.alertErrorMS("Thông báo", error)
    )
    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#name'),
        Validator.isRequired('#price'),
        Validator.isRequired('#image'),
        Validator.isRequired('#remainQuantity'),
        Validator.isRequired('#categoryId'),
      ],
      onSubmit: (data: any) => {
        Object.assign(data, { slug: this.utilityService.makeSeoTitle(data.name) });
        const that = this
        var form = new FormData();
        form.append("image", $("#image")[0].files[0]);

        function uploadImage() {
          return new Promise((resolve, reject) => {
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
          })
        }
        async function asyncCall() {
          const result = await uploadImage();

          let dataSubmit = {
            ...data,
            price: ~~data.price.replaceAll(',', ''),
            remainQuantity: ~~data.remainQuantity.replaceAll(',', ''),
            image: result,
            views: 0,
            sold: 0,
            description: that.model.editorData
          }
          console.log(dataSubmit)
          Object.keys(dataSubmit).forEach(key => dataSubmit[key] === undefined ? delete dataSubmit[key] : {});
          that.dataService.POST('api/product/insert', dataSubmit).subscribe(
            res => {
              that.notificationService.alertSuccessMS("Thông báo", MessageConstants.CREATE_OK_MSG)
              that.utilityService.Navigate('main/product/index')
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
