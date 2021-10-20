import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {

  constructor() { }
  @Input() pagination: any;
  @Output('onPageChange') onPageChange = new EventEmitter<any>();

  pages: number = 0
  arrayPage: any[] = []

  handlePageChange(e: any, newPage: any) {
    e.preventDefault();
    this.onPageChange.emit(newPage);
    this.renderPage(this.pages)
  }


  renderPage(pages: any) {
    let dotsInitial = '...'
    let dotsLeft = '... '
    let dotsRight = ' ...'
    this.arrayPage = []
    for (let i = 1; i <= this.pages; i++) {
      this.arrayPage.push(i)
    }

    if (pages < 6) {
      this.arrayPage = [...this.arrayPage]
    }

    else if (this.pagination.PageNo >= 1 && this.pagination.PageNo <= 3) {
      this.arrayPage = [1, 2, 3, 4, dotsInitial, pages]
    }

    else if (this.pagination.PageNo === 4) {
      const sliced = this.arrayPage.slice(0, 4)
      this.arrayPage = [...sliced, dotsInitial, pages]
    }

    else if (this.pagination.PageNo > 4 && this.pagination.PageNo < pages - 2) {
      const sliced1 = this.arrayPage.slice(this.pagination.PageNo - 2, this.pagination.PageNo)
      console.log(this.arrayPage)
      console.log(sliced1)
      const sliced2 = this.arrayPage.slice(this.pagination.PageNo, this.pagination.PageNo + 1)
      this.arrayPage = [1, dotsLeft, ...sliced1, ...sliced2, dotsRight, pages]

    }
    else if (this.pagination.PageNo > pages - 3) {
      const sliced = this.arrayPage.slice(pages - 4)
      this.arrayPage = [1, dotsLeft, ...sliced]
    }
  }

  ngOnChanges() {
  }
  ngDoCheck() {
    this.pages = Math.ceil(this.pagination.TotalRecords / this.pagination.PageSize)
    this.renderPage(this.pages)
  }


  ngOnInit(): void {

  }

}
