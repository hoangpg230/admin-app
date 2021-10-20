import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../core/services/utility.service';
import { DataService } from '../../../core/services/data.service';
import { NotificationService } from '../../../core/services/notification.service';
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
    private utilityService: UtilityService,
  ) { }

  actions: any[] = []

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
        this.dataService.POST('api/permision/insert', data).subscribe(
          function (response: any) {
            
            if (data.actionId) {
              let requests: any = [];
              data.actionId.forEach((val: any) => {
                requests.push(_this.insertPerAc(response.permisionId, val))
                
              })
              Promise.all(requests).then((res:any)=>{
                _this.notificationService.alertSuccessMS("Thông báo", "Bạn đã thêm thành công")
                _this.utilityService.Navigate('main/permision/index')
              }) 
            }
            else {
              _this.notificationService.alertSuccessMS("Thông báo", "Bạn đã thêm thành công")
              _this.utilityService.Navigate('main/permision/index')
            }
          }
        )
      }
    })
  }

}
