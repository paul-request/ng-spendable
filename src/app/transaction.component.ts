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

  categories = CONSTANTS.TRANSACTION_CATEGORIES;

  constructor(private transactionService: TransactionService) {}

  changeCategory(transaction: Transaction): void {
    this.transactionService.update(transaction);
  }

  isNegative(amount: number) {
    return amount < 0;
  }
}
