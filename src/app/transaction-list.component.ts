import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TransactionService } from './transaction.service';
import { Transaction } from './transaction';

import { CategorisedPipe } from './categorised.pipe';

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: [ './transaction-list.component.scss' ],
  providers: [ CategorisedPipe ]
})
export class TransactionListComponent implements OnInit {
  @Input() transactions: Transaction[];
  @Input() viewCategorised: boolean;
  @Input() viewList: boolean;

  @Output() onToggleCategorised = new EventEmitter<boolean>();

  count: any;

  constructor(
    private categorised: CategorisedPipe
  ) {
    this.count = {
      categorised: 0,
      uncategorised: 0
    };
  }

  ngOnInit(): void {
    this.count.categorised = this.categorised.transform(this.transactions).length;
    this.count.uncategorised = this.transactions.length - this.count.categorised;
  }

  trackById(index, transaction) {
    return transaction.id;
  }

  toggleCategorised(event: Event): void {
    event.preventDefault();

    this.onToggleCategorised.emit(!this.viewCategorised);
  }

  ngOnChanges({ transactions }) {
    if (!!transactions) {
      this.count.categorised = this.categorised.transform(transactions.currentValue).length;
      this.count.uncategorised = transactions.currentValue.length - this.count.categorised;
    }
  }
}
