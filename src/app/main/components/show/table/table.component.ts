import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
 
  constructor() { }
  @Input('branch') branch: any;
  @Input('headerTbl') headerTbl: any;
  @Input('propsData') propsData: any;
  @Input('data') data: any;
  @Input('pagination') pagination: any;
  @Output('onDelete') onDelete: any = new EventEmitter<any>();


  Id: any
  key: string = ''
  eventDelete() {
    $('.close-modal').click()
    this.onDelete.emit(this.Id)
  }

  ngOnChanges() {
  }
  ngOnInit(): void {
    
    this.key = this.branch.route + 'Id'
    $('#deleteRecord').on('show.bs.modal',  (e: any) =>{
      var button = $(e.relatedTarget)
      this.Id = button.data('id')
    })
    
  }

}
