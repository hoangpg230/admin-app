import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilityService } from '../../../core/services/utility.service';
import { DataService } from '../../../core/services/data.service';
import { NotificationService } from '../../../core/services/notification.service';
import { MessageConstants } from '../../../core/common/message.constants';

declare var Validator: any;
@Component({
  selector: 'app-permision',
  templateUrl: './permision.component.html',
  styleUrls: ['./permision.component.scss']
})
export class PermisionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService,
  ) { }

  goBack() {
    this.utilityService.Navigate('main/user/index')
  }

  userId: any

  user: any = {}

  permision: any

  perByUser: any = []

  insertUserPer(UserId: any, PermisionId: any) {
    let data = {
      UserId: UserId,
      PermisionId: PermisionId
    }
    this.dataService.POST('api/UserPermision/insert', data).subscribe(res => res)
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')
    this.dataService.GET('api/user/getById?id=' + this.userId).subscribe(
      (response) => {
        this.user = response
      }
    )

    this.dataService.GET('api/permision/getAll').subscribe(
      (response) => {
        this.permision = response
      }
    )

    this.dataService.GET('api/user/getPerByUser?id=' + this.userId).subscribe(
      (response: any) => {
        this.perByUser = response.map((res: any) => res.name)
      }
    )

    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [],
      onSubmit: (data: any) => {
        const _this = this
        var promise = new Promise(resolve => {
          this.dataService.DELETE('api/UserPermision/delete', 'id', this.userId).subscribe(
            (res) => {
              resolve(res)
            }
          )
        })
        promise.then(() => {
          if (data.permisionId) {
            let requests: any = [];
            data.permisionId.forEach((val: any) => {
              requests.push(_this.insertUserPer(this.userId, val))

            })
            Promise.all(requests).then((res: any) => {
              _this.notificationService.alertSuccessMS("Thông báo", "Bạn đã thêm thành công")
              _this.utilityService.Navigate('main/user/index')
            })
          }
          else {
            _this.notificationService.alertSuccessMS("Thông báo", "Bạn đã thêm thành công")
            _this.utilityService.Navigate('main/user/index')
          }
        })


      }
    })
  }

}
