import { Pipe, PipeTransform } from '@angular/core';

import { Transaction } from './transaction';
import { CONSTANTS } from './constants';

@Pipe({ name: 'categorised' })
export class CategorisedPipe implements PipeTransform {
  transform(transactions: Transaction[], categorise: Boolean = true) {
    return transactions.filter(transaction => {
      const isknown = transaction.category !== CONSTANTS.UNKNOWN_CATEGORY;

      return isknown === categorise;
    });
  }
}
