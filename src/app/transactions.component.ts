import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TransactionService } from './transaction.service';
import { Transaction } from './transaction';

import { CONSTANTS } from './constants';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: [ './transactions.component.scss' ]
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  viewCategorised : boolean = true;
  viewList: boolean = true;

  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.transactionService.getAll().subscribe(
      transactions => this.transactions = transactions,
      error => console.log('ERROR', error));
  }

  onToggleCategorised(toggle: boolean): void {
    this.viewCategorised = toggle;
  }

  onToggleListView(toggle: boolean): void {
    this.viewList = toggle;
  }
}
