import { Injectable } from '@angular/core';
import { Moment } from 'moment';

import * as _moment from 'moment';

const moment = _moment;
const TOTAL_MONTHS = 12;

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  getFormatDate(currentDate: Date){
    moment.locale('es-ES');
    let niceFormat = moment(currentDate).format('L');

    return niceFormat;
  }

  private addMonthsToDate(currentDate: Date) {
    var nextDate = moment(currentDate).add(TOTAL_MONTHS,'months');
    var nextDateFormated = moment(new Date(nextDate.toDate())).format('L');

    return nextDateFormated.toString();
  }

  getFinalDate(currentDate: Date) {
    let arrayDMY: string[] = this.addMonthsToDate(currentDate).split('/');
    let splitDMY: number[] = arrayDMY.map(dmy => Number(dmy));

    return splitDMY;
  }

  private getMonthsNumber(currentDate: Moment) {
    let months = Number(currentDate.format("MM"));
    let years = Number(currentDate.format("YYYY"));

    return months + (years * TOTAL_MONTHS);
  }

  getTotalMonths(initDate: Date, endDate: Date) {
    let start = this.getMonthsNumber(moment(new Date(initDate)));
    let final = this.getMonthsNumber(moment(new Date(endDate)));
    let totalMonths = final - start;

    return totalMonths;
  }

  getTotalYears(months: number) {
    let totalYears = months/TOTAL_MONTHS;

    return totalYears;
  }
}
