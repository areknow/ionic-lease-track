import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  odometer = 0;
  miles: any;
  start: any;

  daysPassed: any;
  allowedMiles: any;
  result: any;

  constructor() {
    // Load stored data if it exists
    this.loadLocal();
    // Calculate mileage
    this.calculate();
  }

  /**
   * Compute mileage
   */
  calculate(): void {
    // Calculate days passed and allowed miles
    this.daysPassed = moment().diff(this.start, 'days');
    this.allowedMiles = this.daysPassed * (this.miles / 365);
    this.result = Math.floor(this.allowedMiles + this.odometer);
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
    if (this.daysPassed) {
      localStorage.setItem('LT_DAYS', this.daysPassed);
    }
  }

  /**
   * Retrieve values from localStorage
   */
  loadLocal() {
    const localOdometer = localStorage.getItem('LT_ODOMETER');
    const localMiles = localStorage.getItem('LT_YEARLY_MILES');
    const localStart = localStorage.getItem('LT_START');
    const localDays = localStorage.getItem('LT_DAYS');
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
  }
}
