import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  constructor() { }
  @Input('pagination') pagination: any;
  @Output('onOptionChange') onOptionChange: any = new EventEmitter<any>();
  options = [5, 10, 15, 50];

  onChange(e: any) {
    this.onOptionChange.emit(e.value);
  }
  ngOnChanges() {
    
  }

  ngOnInit(): void {
  }

}
