import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilityService } from '../../../core/services/utility.service';
import { DataService } from '../../../core/services/data.service';
import { NotificationService } from '../../../core/services/notification.service';
import { MessageConstants } from '../../../core/common/message.constants';

declare const Validator: any
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService,
  ) { }
  permision: any = {};
  actions: any[] = []
  actionsByPer: any[] = []
  

  goBack() {
    this.utilityService.Navigate('/main/permision/index')
  }

  allAction() {
    const _this = this
    this.dataService.GET('api/PermisionAction/getAllAction').subscribe(
      function (response: any) {
        response.forEach((res: any) => {
          res.child = response.filter((re: any) => re.parentId == res.actionId)
        }
        )
        _this.actions = response.filter((res: any) => res.parentId == 0)
      }, error => this.notificationService.alertErrorMS("Thông báo", error)
    )
  }

  insertPerAc(permisionId: any, actionId: any) {
    let data = {
      permisionId: permisionId,
      actionId: actionId,
    }
    return new Promise((resolve, reject) => {
      this.dataService.POST('api/PermisionAction/InsertPermisionAction', data).subscribe(
        res => resolve(res)
      )
    })
  }
  ngOnInit(): void {
    const _this = this
    const perId: any = this.route.snapshot.paramMap.get('id');
    this.dataService.GET('api/Permision/getById?id=' + perId).subscribe(
      function (response: any) {
        _this.permision = response
      }
    )
    this.dataService.GET('api/PermisionAction/GetActionPer?id=' + perId).subscribe(
      function (response: any) {
        _this.actionsByPer = response.map((res: any) => res.actionCode)

      }
    )
    this.allAction()
    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#name'),
      ],
      onSubmit: (data: any) => {
        const _this = this
        data = {
          ...data,
          permisionId: perId
        }

        var promise = new Promise((resolve, reject) => {
          this.dataService.DELETE('api/PermisionAction/DeletePermisionAction', 'id', perId).subscribe(
            res => {
              resolve(res)
            },
            error => this.notificationService.alertErrorMS("Thông báo", error)
          )
        })

        promise.then((res) => {
          this.dataService.PUT('api/permision/update', data).subscribe(
            function (response: any) {

              if (data.actionId) {
                let requests: any = [];
                data.actionId.forEach((val: any) => {
                  requests.push(_this.insertPerAc(response.permisionId, val))

                })
                Promise.all(requests).then((res: any) => {
                  _this.notificationService.alertSuccessMS("Thông báo", "Bạn đã cập nhập thành công")
                  _this.utilityService.Navigate('main/permision/index')
                })
              }
              else {
                _this.notificationService.alertSuccessMS("Thông báo", "Bạn đã cập nhập thành công")
                _this.utilityService.Navigate('main/permision/index')
              }
            }
          )
        })


      }
    })
  }
}
