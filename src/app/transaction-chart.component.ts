import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Donut } from './donut';
import { Transaction } from './transaction';
import { CategorisedPipe } from './categorised.pipe';
import { CONSTANTS } from './constants';
import * as D3 from 'd3/index';

@Component({
  selector: 'transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: [ './transaction-chart.component.scss' ],
  providers: [ CategorisedPipe ]
})
export class TransactionChartComponent implements OnInit {
  @Input() transactions: Transaction[];
  @Input() viewList: boolean;

  categories: any[];
  data: Donut[];

  constructor(
    private categorised: CategorisedPipe
  ) {
    this.categories = [...CONSTANTS.TRANSACTION_CATEGORIES];
  }

  ngOnInit(): void {
    this.data = this.generateData();
  }

  generateData(): Donut[] {
    const transactionsTotal = this.transactions
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    return this.categories.reduce((acc, { label, value }) => {
      const transactions = this.transactions.filter(transaction => transaction.category === value)
      const categoryTotal = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
      const percent = (categoryTotal / transactionsTotal) * 100;

      return [
        ...acc,
        {
          label,
          count: transactions.length,
          percent,
          total: categoryTotal
        }
      ];
    }, []);
  }

  ngOnChanges(): void {
    this.data = this.generateData();
  }
}
