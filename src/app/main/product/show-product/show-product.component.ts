import { Component, OnInit } from '@angular/core';
import { UtilityService } from './../../../../app/core/services/utility.service';
import { DataService } from './../../../../app/core/services/data.service';
import { NotificationService } from './../../../../app/core/services/notification.service';
import { MessageConstants } from '../../../core/common/message.constants';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService,
  ) { }
  localKey: string = "Product"
  _listProduct: any
  headerTbl = [{
    Name: "#",
    Width: '10%',
  },
  {
    Name: "Tên Sản Phẩm",
    Width: '20%',
  },
  {
    Name: "Giá Sản Phẩm",
    Width: '20%',
  },
  {
    Name: "Hình Ảnh",
    Width: '15%',
  },
  {
    Name: "Danh Mục",
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
    name: "sản phẩm",
    route: 'product'
  }
  
  propsData = [{
    key: 'name'
  }, {
    key: 'price', 
    pipe: 'number'
  },
  {
    key: 'image'
  },
  {
    key: 'subData'
  },]

  paginate() {
    this.dataService.GET(`api/product/paginate${this.utilityService.serialize(this.filter)}`)
      .subscribe(
        res => {
          this.utilityService.setData(this.localKey, res)
          let obj = this.utilityService.getData(this.localKey)
          this._listProduct = obj.data
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
    this.dataService.DELETE('api/product/delete', 'id', Id).subscribe(
      res => {
        if (res) {
          this.notificationService.alertSuccessMS("Thông báo", MessageConstants.DELETE_OK_MSG)
          this.paginate()
        }
        else {
          this.notificationService.alertErrorMS("Thông báo", "Đã có lỗi xảy ra vui lòng thử lại.")
          this.paginate()
        }

      },
      error => this.notificationService.alertErrorMS("Thông báo", error)

    )
  }

  ngOnInit(): void {
    this.paginate()
  }

}
