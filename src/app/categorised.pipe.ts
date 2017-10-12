import { Pipe, PipeTransform } from '@angular/core';

import { Transaction } from './transaction';

@Pipe({ name: 'categorised' })
export class CategorisedPipe implements PipeTransform {
  transform(transactions: Transaction[], categorise: Boolean = true) {
    return transactions.filter(transaction => !!transaction.category === categorise);
  }
}
