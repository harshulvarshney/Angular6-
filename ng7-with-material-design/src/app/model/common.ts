import { MatDialogConfig } from '@angular/material';
import * as _moment from 'moment';

export class CommonConstants {

  public static readonly GRP_CREATED: string = 'NEW_GROUP_CREATED';
  public static readonly BATCH_CREATED: string = 'NEW_BATCH_CREATED';
  public static readonly BATCH_TYPE_DAILY: string = 'Daily batch';
  public static readonly UTC: string = 'UTC';
  public static readonly DATE_YYYYMMDD = "YYYY-MM-DD";
  public static readonly PARENT_TYPE_BATCH_CONFIG = "BATCH_CONFIG";
  public static readonly PARENT_TYPE_DATA_PUSH = "DATA_PUSH";

  public static setFormat_YYYYMMDD(event: any): string {
    console.log('Selected Date: ' + event.value);
    if(!event.value) {
      return null;
    }
    const momentDate = new Date(event.value); // Replace event.value with your date value
    const formattedDate = _moment(momentDate).format(CommonConstants.DATE_YYYYMMDD);
    console.log('formattedDate' + formattedDate);
    return formattedDate;
  }

  public static getmatDialogConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.minHeight = '150px';
    dialogConfig.minWidth = '300px';

    return dialogConfig;
  }

  public static getWfStatusColor(status: string): string {
    switch (status) {
      case 'STARTED': {
        return "lightblue";
      }
      case "IN_PROGRESS": {
        return "#FFCC66";
      }
      case "COMPLETED": {
        return "green";
      }
      case "FAILED": {
        return "red";
      }
      default: {
        return "black";
      }
    }
  }

  /**
   * breaks sum of families in array of families
   * e.g: number 3 includes family 1 and 2
   * e.g: number 8 includes family 2 and 8
   */
  public static prepareFamilyList(familySum: number): number[] {
    var families: number[] = [];
    if(!familySum) {
      return families;
    }
    var exp:number = 0;
    var n:number = Math.pow(2, exp);
    var res = 1;
    while(n <= familySum) {
      res = familySum & n;
      if(res > 0) {
        families.push(res);
      }
      exp++;
      n = Math.pow(2, exp);
    }
    // console.log('Family array: ' + families);
    return families;
  }
}

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
//NOTE: 
//  The parse function is called when you edit the input value manually, to display a valid date.
//  The display function is used by calendar to show date in formated style
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: _moment.HTML5_FMT.DATE,
  },
  display: {
    dateInput: _moment.HTML5_FMT.DATE,
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};