import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Donut } from './donut';
import { Transaction } from './transaction';
import { CategorisedPipe } from './categorised.pipe';
import { CONSTANTS } from './constants';

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
    return acc + Number(transaction.amount);
  }

  ngOnInit(): void {
    this.data = this.generateData();
  }

  generateData(): Donut[] {
    this.total = this.transactions.reduce(this.sum, 0);

    return this.categories.reduce((acc, { label, value }) => {
      const transactions = this.transactions.filter(transaction => transaction.category === value);
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
    // Only uopdate if the user is actually looking at this view
    if (!this.viewList) {
      this.data = this.generateData();
    }
  }
}
