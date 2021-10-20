import { Component, OnInit } from '@angular/core';
import { UtilityService } from './../../../../app/core/services/utility.service';
import { DataService } from './../../../../app/core/services/data.service';
import { NotificationService } from './../../../../app/core/services/notification.service';
import { MessageConstants } from '../../../core/common/message.constants';

@Component({
  selector: 'app-show-cate',
  templateUrl: './show-cate.component.html',
  styleUrls: ['./show-cate.component.scss']
})
export class ShowCateComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService,
  ) { }
  localKey: string = "Category"
  _listCategory: any
  headerTbl = [{
    Name: "#",
    Width: '10%',
  },
  {
    Name: "Name",
    Width: '35%',
  },
  {
    Name: "Parent",
    Width: '35%',
  },]
  pagination = {
    PageNo: 1,
    PageSize: 5,
    TotalRecords: 1
  }
  filter = {
    PageNo: 1,
    PageSize: 5,
  }
  branch = {
    name: "danh mục",
    route: 'category'
  }
  propsData = [{
    key: 'name'
  },
  {
    key: 'subData'
  },]

  paginate() {
    this.dataService.GET(`api/category/paginate${this.utilityService.serialize(this.filter)}`)
      .subscribe(
        res => {
          this.utilityService.setData(this.localKey, res)
          let obj = this.utilityService.getData(this.localKey)
          this._listCategory = obj.data
          this.pagination.TotalRecords = obj.TotalRecords
        },
        error => {
          this.notificationService.alertErrorMS("Thông báo", error)
        })
  }
  handlePageChange(newPage: any) {
    this.filter.PageNo = newPage
    this.pagination.PageNo = newPage
    this.paginate()
  }
  handleOptionChange(option: any) {
    this.filter.PageSize = option
    this.pagination.PageSize = Number(option)
    this.paginate()
  }

  handleSearchChange(search: any) {
    this.filter.PageNo = 1
    Object.assign(this.filter, {Name: search});
    this.pagination.PageNo = 1
    this.paginate()
  }
  handleDelete(Id: any) {
    this.dataService.DELETE('api/category/delete','id' , Id).subscribe(
      res=>{
        this.notificationService.alertSuccessMS("Thông báo", MessageConstants.DELETE_OK_MSG)
        this.paginate()
      },
      error=>this.notificationService.alertErrorMS("Thông báo", error)

    )
  }

  ngOnInit(): void {
    this.paginate()
  }

}
