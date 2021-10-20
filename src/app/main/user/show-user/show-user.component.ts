import { Component, Injector, OnInit } from '@angular/core';
import { UtilityService } from './../../../../app/core/services/utility.service';
import { DataService } from './../../../../app/core/services/data.service';
import { NotificationService } from './../../../../app/core/services/notification.service';
import { MessageConstants } from '../../../core/common/message.constants';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {

  constructor(

    private dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService,
  ) { }
  public urls: string[] = [];
  localKey: string = "User"
  _listUser: any
  headerTbl = [{
    Name: "#",
    Width: '5%',
  },
  {
    Name: "Tên Người Dùng",
    Width: '15%',
  },
  {
    Name: "Email",
    Width: '20%',
  },
  {
    Name: "Địa Chỉ",
    Width: '10%',
  },
  {
    Name: "Số Điện Thoại",
    Width: '15%',
  },
  {
    Name: "Quyền",
    Width: '15%',
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
    name: "user",
    route: 'user'
  }
  propsData = [
    {
      key: 'name'
    }, {

      key: 'email'
    },
    {
      key: 'address'
    },
    {
      key: 'phoneNumber'
    },
    {
      key: 'subdata'
    }]

  paginate() {
    this.dataService.GET(`api/user/paginate${this.utilityService.serialize(this.filter)}`)
      .subscribe(
        (res: any) => {
         res._listUser.forEach((value: any) => {
            value.subdata = value.subdata.map((val: any) => {
              return val.name
            }).join(', ')
          })
          this.utilityService.setData(this.localKey, res)
          let obj = this.utilityService.getData(this.localKey)
          this._listUser = obj.data
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
    this.dataService.DELETE('api/user/delete', 'id', Id).subscribe(
      res => {
        this.notificationService.alertSuccessMS("Thông báo", MessageConstants.DELETE_OK_MSG)
        this.paginate()
      },
      error => this.notificationService.alertErrorMS("Thông báo", error)

    )
  }

  ngOnInit(): void {
    this.paginate()
  }



}
