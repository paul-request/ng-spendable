import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Transaction } from './transaction';

import { CategorisedPipe } from './categorised.pipe';

@Component({
  selector: 'transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: [ './transaction-chart.component.scss' ],
  providers: [ CategorisedPipe ]
})
export class TransactionChartComponent {
  @Input() transactions: Transaction[];
  @Input() viewList: boolean;

  constructor(
    private categorised: CategorisedPipe
  ) { }
}
