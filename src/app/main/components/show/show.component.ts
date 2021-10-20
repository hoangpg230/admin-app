import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core'


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  constructor() { }
  @Input('branch') branch: any;
  @Input('headerTbl') headerTbl: any;
  @Input('propsData') propsData: any;
  @Input('data') data: any;
  @Input('pagination') pagination: any;
  @Output() onPageChange = new EventEmitter<any>();
  @Output() onOptionChange = new EventEmitter<any>();
  @Output() onSearchChange = new EventEmitter<any>();
  @Output('onDelete') onDelete: any = new EventEmitter<any>();

  handleSearch(e: any) {
    this.onSearchChange.emit(e.value);
  }

  handlePageChange(newPage: any) {
    this.onPageChange.emit(newPage);
  }

  handleOptionChange(option: any) {
    this.onOptionChange.emit(option);
  }

  handleDelete(Id: any) {
    this.onDelete.emit(Id)
  }
  ngOnChanges() {
  }

  ngOnInit(): void {
  }

}
