import { Component, EventEmitter, Input, Output , OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';

import { TransactionService } from './transaction.service';
import { Transaction } from './transaction';
import { CONSTANTS } from './constants';

import moment from 'moment/src/moment';

@Component({
  selector: 'transactions-nav',
  templateUrl: './transactions-nav.component.html',
  styleUrls: [ './transactions-nav.component.scss' ]
})
export class TransactionsNavComponent implements OnInit {
  @Input() transactions: Transaction[];
  @Input() viewList: boolean;

  @Output() onToggleListView = new EventEmitter<boolean>();

  periodData: string[];
  selectedPeriod: any;

  constructor(
    private transactionService: TransactionService
  ) {
    this.selectedPeriod = null;
  }

  ngOnInit(): void {
    this.periodData = this.generateMonthData();
  }

  includesMonth(arr, month) {
    return !!arr.filter(m => m.label === month).length;
  }

  generateMonthData(): any[] {
    return this.transactions.reduce((acc, transaction) => {
      const label = transaction.date.format(CONSTANTS.MONTH_DISPLAY_FORMAT);
      const value = moment(transaction.date);

      if (this.includesMonth(acc, label)) return [ ...acc ];

      return [
        ...acc,
        { label, value }
      ]
    }, []);
  }

  toggleListView(event: Event): void {
    event.preventDefault();

    this.onToggleListView.emit(!this.viewList);
  }

  onChangePeriod(): void {
    if (!!this.selectedPeriod) {
      this.transactionService.filterByMonth(this.selectedPeriod);
    } else {
      this.transactionService.reset();
    }
  }
}
