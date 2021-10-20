import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from '../../../core/services/utility.service';
import { MessageConstants } from '../../../core/common/message.constants';


declare var Validator: any;
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})

export class UpdateComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService
  ) { }
  tmp: any
  paramId: any
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
    name: "parentId"
  }
  handleOptionChange(value: any) {
    console.log(value)
    Object.assign(this.select, { referenId: value })
  }
  backPage() {
    this.utilityService.Navigate('main/category/index')
  }
  ngDoCheck() {
    this.paramId = this.route.snapshot.paramMap.get('id')
  }
  getAllCate() {
    this.dataService.GET('api/category/getAll').subscribe(
      res => {
        Object.assign(this.select, { data: res })
      }
    )
  }
  getByIdCate() {
    this.dataService.GET('api/category/getById?Id=' + this.paramId).subscribe(
      res => {
        this.tmp = res
        this.inputs[0].value = this.tmp.name
        Object.assign(this.select, { referenId: this.tmp.parentId })
      }, error => this.notificationService.alertErrorMS("Thông báo", error)
    )
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.getByIdCate()
    }, 0)
    this.getAllCate()
    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#name'),
      ],
      onSubmit: (data: any) => {
        Object.assign(data, { slug: this.utilityService.makeSeoTitle(data.name) }, { CategoryId: this.paramId });
        if (data.parentId == '') {
          data.parentId = 0
        }
      
        this.dataService.PUT('api/category/update', data).subscribe(
          res => { this.notificationService.alertSuccessMS("Thông báo", MessageConstants.UPDATE_OK_MSG); this.getAllCate(); this.getByIdCate() },
          error => this.notificationService.alertErrorMS("Thông báo", error)
        )
      }
    })

  }

}
