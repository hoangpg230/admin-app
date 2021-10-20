import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from '../../../core/services/utility.service';
import { MessageConstants } from '../../../core/common/message.constants';

declare var Validator: any;
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
  branch = {
    name: "danh mục",
    route: 'category'
  }

  inputs = [{
    label: "Tên danh mục:",
    id: "name",
    name: "name",
    type: "text",
    value: "",
    placeholder: "Nhập tên danh mục...",
    width: "col col-lg-9"
  }]

  select = {
    label: "Chọn danh mục cha",
    name: "parentId",
  }
  handleOptionChange(value: any) {
    console.log(value)
    Object.assign(this.select, { referenId: value })
  }

  backPage() {
    this.utilityService.Navigate('/main/category/index')
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
      ],
      onSubmit: (data: any) => {
        Object.assign(data, { slug: this.utilityService.makeSeoTitle(data.name) });
        if (data.parentId == '') {
          data.parentId = 0
        }

        this.dataService.POST('api/Category/insert', data).subscribe(
          res => {
            this.notificationService.alertSuccessMS("Thông báo", MessageConstants.CREATE_OK_MSG)
            setTimeout(() => this.utilityService.Navigate('/main/category/index'), 500)
          },
          error => this.notificationService.alertErrorMS("Thông báo", error)
        );
      }
    })
  }

}
