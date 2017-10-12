import { Pipe, PipeTransform } from '@angular/core';

import moment from 'moment/src/moment';

import { CONSTANTS } from './constants';

@Pipe({ name: 'displayDate' })
export class DisplayDatePipe implements PipeTransform {
  transform(momentDate: any) {
    return moment(momentDate).format(CONSTANTS.DATE_FORMAT);
  }
}
