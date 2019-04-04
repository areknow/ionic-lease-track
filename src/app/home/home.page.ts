import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  result: any;

  constructor() { }

  ngOnInit() {
    const localResult = localStorage.getItem('LT_ALLOWED_MILES');
    if (localResult) {
      this.result = localResult;
    }
  }

}
