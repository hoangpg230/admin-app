import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  public loadScripts(src: string) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src;
    this.elementRef.nativeElement.appendChild(script);
  }
  

  ngAfterViewInit() {
    var promise = new Promise(resolve => {
      resolve(this.loadScripts('./../../assets/vendor/chart.js/Chart.min.js'))
    })
    promise.then(res=> {
      return new Promise((resolve)=>{
        setTimeout(()=>{
          resolve(this.loadScripts('./../../assets/js/demo/chart-area-demo.js'))
        }, 200)
      })
    })
    .then(res=>{
      this.loadScripts('./../../assets/js/demo/chart-pie-demo.js')
    })
  }

  ngOnInit(): void {
  }

}
