import { Component, OnInit } from '@angular/core';
import { UtilityService } from './../../../../app/core/services/utility.service';
import { DataService } from './../../../../app/core/services/data.service';
import { NotificationService } from './../../../../app/core/services/notification.service';
import { MessageConstants } from '../../../core/common/message.constants';

@Component({
  selector: 'app-show-per',
  templateUrl: './show-per.component.html',
  styleUrls: ['./show-per.component.scss']
})
export class ShowPerComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService,
  ) { }
  localKey: string = "Permision"
  _listCategory: any
  headerTbl = [{
    Name: "#",
    Width: '20%',
  },
  {
    Name: "Name",
    Width: '60%',
  }]
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
    name: "quyền",
    route: 'permision'
  }
  propsData = [{
    key: 'name'
  }]

  paginate() {
    this.dataService.GET(`api/permision/paginate${this.utilityService.serialize(this.filter)}`)
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
    Object.assign(this.filter, { Name: search });
    this.pagination.PageNo = 1
    this.paginate()
  }
  handleDelete(Id: any) {
    var promise = new Promise((resolve, reject) => {
      this.dataService.DELETE('api/PermisionAction/DeletePermisionAction', 'id', Id).subscribe(
        res => {
          resolve(res)
        },
        error => this.notificationService.alertErrorMS("Thông báo", error)
      )
    })

    promise.then((res) => {
      this.dataService.DELETE('api/permision/delete', 'id', Id).subscribe(
        res => {
          this.notificationService.alertSuccessMS("Thông báo", MessageConstants.DELETE_OK_MSG)
          this.paginate()
        },
        error => this.notificationService.alertErrorMS("Thông báo", error)
      )
    })

  }

  ngOnInit(): void {
    this.paginate()
  }
}
