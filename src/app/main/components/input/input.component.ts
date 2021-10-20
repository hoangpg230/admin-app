import { Component, OnInit, Input } from '@angular/core';


declare const numeral: any, $: any
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  getElementById: any = document.getElementById.bind(document);
  $: any = document.querySelector.bind(document);
  $$: any = document.querySelectorAll.bind(document);
  constructor() { }

  @Input("props") props: any;
  @Input("keyImage") keyImage: any;

  changVal(e: any) {
    
    if (this.keyImage) {
      if (e.target.type === "file") {
        var input = this.getElementById(this.keyImage);
        var fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = (e: any) => {
          var img = this.getElementById("blah");
          img.src = e.target.result;
        }
      }
      if (e.target.classList.contains("number")) {
        e.target.type = "text";
        e.target.value = numeral(e.target.value).format('0,0')
      }
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const listNumber = this.$$('input[type="number"]')
      listNumber.forEach((value: any) => {
        value.type = "text";
        value.value = numeral(value.value).format('0,0')
      })
    }, 500)

  }
  ngOnInit(): void {

  }

}
