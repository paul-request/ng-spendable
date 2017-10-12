import { Component, EventEmitter, Input, Output , OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';

import { Transaction } from './transaction';

import { CategorisedPipe } from './categorised.pipe';

@Component({
  selector: 'transactions-nav',
  templateUrl: './transactions-nav.component.html',
  styleUrls: [ './transactions-nav.component.scss' ],
  providers: [ CategorisedPipe ]
})
export class TransactionsNavComponent implements OnInit {
  @Input() transactions: Transaction[];
  @Input() viewCategorised: boolean;
  @Input() viewList: boolean;

  @Output() onToggleCategorised = new EventEmitter<boolean>();
  @Output() onToggleListView = new EventEmitter<boolean>();

  count = {
    categorised: <number>0,
    uncategorised: <number>0
  };

  constructor(
    private categorised: CategorisedPipe
  ) {}

  ngOnInit(): void {
    this.count.categorised = this.categorised.transform(this.transactions).length;
    this.count.uncategorised = this.transactions.length - this.count.categorised;
  }

  toggleCategorised(event: Event): void {
    event.preventDefault();

    this.onToggleCategorised.emit(!this.viewCategorised);
  }

  toggleListView(event: Event): void {
    event.preventDefault();

    this.onToggleListView.emit(!this.viewList);
  }

  ngOnChanges({ transactions }) {
    if (!!transactions) {
      this.count.categorised = this.categorised.transform(transactions.currentValue).length;
      this.count.uncategorised = transactions.currentValue.length - this.count.categorised;
    }
  }
}
