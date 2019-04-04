import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  odometer: number;
  miles: any;
  start: any;

  daysPassed: any;
  allowedMiles: any;
  result: any;

  constructor() { }

  ngOnInit() {
    this.loadLocalStorage();
    this.calculate();
  }

  calculate() {
    // Calculate days passed and allowed miles
    this.daysPassed = moment().diff(this.start, 'days');
    this.allowedMiles = this.daysPassed * (this.miles / 365);
    this.result = Math.floor(this.allowedMiles + this.odometer);
    // Store values to localstore
    if (this.odometer) {
      localStorage.setItem('LT_ODOMETER', String(this.odometer));
    }
    if (this.miles) {
      localStorage.setItem('LT_YEARLY_MILES', String(this.miles));
    }
    if (this.start) {
      localStorage.setItem('LT_START', this.start);
    }
    if (this.daysPassed) {
      localStorage.setItem('LT_DAYS', this.daysPassed);
    }
    if (this.result) {
      localStorage.setItem('LT_ALLOWED_MILES', this.result);
    }
  }

  loadLocalStorage() {
    // Load stored data if it exists
    const localOdometer = localStorage.getItem('LT_ODOMETER');
    const localMiles = localStorage.getItem('LT_YEARLY_MILES');
    const localStart = localStorage.getItem('LT_START');
    const localDays = localStorage.getItem('LT_DAYS');
    const localResult = localStorage.getItem('LT_ALLOWED_MILES');
    if (localOdometer) {
      this.odometer = Number(localOdometer);
    }
    if (localMiles) {
      this.miles = localMiles;
    }
    if (localStart) {
      this.start = localStart;
    }
    if (localDays) {
      this.daysPassed = localDays;
    }
    if (localResult) {
      this.result = localResult;
    }
  }

}
