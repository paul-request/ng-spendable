import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Transaction } from './transaction';
import { TransactionService } from './transaction.service';

import { CONSTANTS } from './constants';

@Component({
  selector: '[transaction-item]',
  templateUrl: './transaction.component.html',
  styleUrls: [ './transaction.component.scss' ]
})
export class TransactionComponent {
  @Input() transaction: Transaction;

  categories: any[];

  constructor(
    private transactionService: TransactionService
  ) {
    this.categories = [...CONSTANTS.TRANSACTION_CATEGORIES].sort((a, b) => {
      if(a.value < b.value) return -1;
      if(a.value > b.value) return 1;
      return 0;
    });
  }

  changeCategory(transaction: Transaction): void {
    this.transactionService.update(transaction);
  }

  isNegative(amount: number) {
    return amount < 0;
  }
}
