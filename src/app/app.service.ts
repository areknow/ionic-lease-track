import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  today = moment().format('YYYY-MM-DD');

  odometer = 0;
  miles = 10000;
  start: string;
  length = 24;

  daysPassed = 0;
  allowedMiles = 0;
  result = 0;

  remainingTime: string;

  constructor() {
    this.start = this.today;
    // Load stored data if it exists
    this.loadLocal();
    // Calculate mileage
    this.calculate();
  }

  /**
   * Compute mileage
   */
  calculate(): void {
    // Check if start value exists
    if (!this.start) {
      this.start = this.today;
    }
    // Calculate days passed and allowed miles
    this.daysPassed = moment().diff(this.start, 'days');
    this.allowedMiles = this.daysPassed * (this.miles / 365);
    this.result = Math.floor(this.allowedMiles + this.odometer);
    // Result should never be negative
    if (this.result < 0) {
      this.result = 0;
    }
    // Calculate remaining time
    const end = moment(this.start).add(this.length, 'M');
    this.remainingTime = moment(end).fromNow(true);
    // Store values to localstore
    this.saveLocal();
  }

  /**
   * Store values to localStorage
   */
  saveLocal(): void {
    if (this.odometer) {
      localStorage.setItem('LT_ODOMETER', String(this.odometer));
    }
    if (this.miles) {
      localStorage.setItem('LT_YEARLY_MILES', String(this.miles));
    }
    if (this.start) {
      localStorage.setItem('LT_START', this.start);
    }
    if (this.length) {
      localStorage.setItem('LT_LENGTH', String(this.length));
    }
    if (this.daysPassed) {
      localStorage.setItem('LT_DAYS', String(this.daysPassed));
    }
  }

  /**
   * Retrieve values from localStorage
   */
  loadLocal() {
    const localOdometer = localStorage.getItem('LT_ODOMETER');
    const localMiles = localStorage.getItem('LT_YEARLY_MILES');
    const localStart = localStorage.getItem('LT_START');
    const localLength = localStorage.getItem('LT_LENGTH');
    const localDays = localStorage.getItem('LT_DAYS');
    if (localOdometer) {
      this.odometer = Number(localOdometer);
    }
    if (localMiles) {
      this.miles = Number(localMiles);
    }
    if (localStart) {
      this.start = localStart;
    }
    if (localLength) {
      this.length = Number(localLength);
    }
    if (localDays) {
      this.daysPassed = Number(localDays);
    }
  }

}
