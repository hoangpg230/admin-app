import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

declare const $: any
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() data: any;
  @Input() branch: any;
  @Output() onOptionChange: any = new EventEmitter<any>()

  key: string = '';
  constructor() { }
  onChange(e: any) {
    this.onOptionChange.emit(e.value);
  }

  ngDoCheck() {
    this.data.data.forEach((val: any) => {
      val.children = [];
      this.data.data.forEach((val1: any) => {
        if (val.categoryId == val1.parentId)
          val.children.push(val1);
      })
    })
    var categories = this.data.data.filter((e: any) => { return e.parentId == 0 });

    let html = '<option selected  value="">Mở menu lựa chọn</option>'
    let buildMenu = (items: any, sprate: string = '') => {
      items.forEach((e: any) => {
        var temp = `<option value="${e.categoryId}">${sprate} ${e.name}</option>`;
        if (e.categoryId == this.data.referenId) {
          temp = `<option value="${e.categoryId}" selected>${sprate} ${e.name}</option>`;
        }
        html += temp
        if (e.children && e.children.length > 0) {
          buildMenu(e.children, sprate + ' --');
        }
      })
      return html
    }
    $('#' + this.data.name).html(buildMenu(categories, ''))
  }

  ngOnInit(): void {
    this.data.data = []
    this.data.referenId = 0
    this.key = this.branch.route + "Id"
  }

}
