import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Transaction } from './transaction';
import moment from 'moment/src/moment';

import { CONSTANTS } from './constants';

@Injectable()
export class TransactionService {
  private store = {
    transactions: [],
    viewCategorised: <Boolean>true,
    filtered: [],
    isFiltered: false
  };
  private _transactions = new Subject<Transaction[]>();

  sendTransactions(transactions: Transaction[]) {
    this.store.transactions = transactions;
    this.store.isFiltered = false;

    this._transactions.next([...this.store.transactions]);
  }

  getAll(): Observable<Transaction[]> {
    return this._transactions.asObservable();
  }

  update(transaction: Transaction) {
    const transactions = this.store.isFiltered
      ? this.store.filtered : this.store.transactions;

    const updatedTransactions = [...transactions].reduce((acc, t) => {
      if (t.id === transaction.id) return [...acc, transaction];

      return [...acc, t];
    }, []);

    this._transactions.next(updatedTransactions);
  }

  reset(): void {
    this.store.isFiltered = false;
    this.store.filtered = [];
    this._transactions.next([...this.store.transactions]);
  }

  filterByMonth(month: any) {
    this.store.isFiltered = true;

    this.store.filtered = this.store.transactions.filter(transaction => {
      const filterMonth = moment(month).format(CONSTANTS.MONTH_DISPLAY_FORMAT);
      const transactionMonth = moment(transaction.date).format(CONSTANTS.MONTH_DISPLAY_FORMAT);

      return filterMonth === transactionMonth;
    });

    this._transactions.next([...this.store.filtered]);
  }
}
