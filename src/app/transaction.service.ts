import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Transaction } from './transaction';

@Injectable()
export class TransactionService {
  private store = {
    transactions: [],
    viewCategorised: <Boolean>true
  };
  private _transactions = new Subject<Transaction[]>();

  sendTransactions(transactions: Transaction[]) {
    this.store.transactions = transactions;

    this._transactions.next([...this.store.transactions]);
  }

  getAll(): Observable<Transaction[]> {
    return this._transactions.asObservable();
  }

  update(transaction: Transaction) {
    const updatedTransactions = this.store.transactions.reduce((acc, t) => {
      if (t.id === transaction.id) return [...acc, transaction];

      return [...acc, t];
    }, []);

    this._transactions.next(updatedTransactions);
  }
}
