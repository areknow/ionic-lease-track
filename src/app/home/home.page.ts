import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  mileageOptions = [
    { value: 10000, label: '10,000'},
    { value: 12000, label: '12,000'},
    { value: 15000, label: '15,000'},
  ];

  lengthOptions = [
    { value: 24, label: '24 months' },
    { value: 36, label: '36 months' },
    { value: 39, label: '39 months' },
    { value: 48, label: '48 months' }
  ];

  constructor(public appService: AppService) { }


}
