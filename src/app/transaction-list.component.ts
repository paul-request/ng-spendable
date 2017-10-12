import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { TransactionService } from './transaction.service';
import { Transaction } from './transaction';

import { CONSTANTS } from './constants';

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: [ './transaction-list.component.scss' ]
})
export class TransactionListComponent {
  @Input() transactions: Transaction[];
  @Input() viewCategorised: boolean;
  @Input() viewList: boolean;

  trackById(index, transaction) {
    return transaction.id;
  }
}
