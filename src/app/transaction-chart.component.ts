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
  total: number;

  constructor(
    private categorised: CategorisedPipe
  ) {
    this.categories = [...CONSTANTS.TRANSACTION_CATEGORIES];
  }

  sum(acc, transaction) {
    if (parseInt(transaction.amount, 10) >= 0) return acc;

    return acc + Math.abs(transaction.amount);
  }

  ngOnInit(): void {
    this.data = this.generateData();
    this.total = this.transactions.reduce(this.sum, 0);
  }

  generateData(): Donut[] {
    return this.categories.reduce((acc, { label, value }) => {
      const transactions = this.transactions.filter(transaction => transaction.category === value)
      const categoryTotal = transactions.reduce(this.sum, 0);
      const percent = (categoryTotal / this.total) * 100;
      const displayPercent = percent % 1 !== 0 ? percent.toFixed(2) : percent;

      return [
        ...acc,
        {
          label,
          count: transactions.length,
          percent: displayPercent,
          total: categoryTotal
        }
      ];
    }, []);
  }

  ngOnChanges(): void {
    this.data = this.generateData();
  }
}
