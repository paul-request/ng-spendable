import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { TransactionService } from './transaction.service';
import { Transaction } from './transaction';

import { CONSTANTS, BANK_CONFIG } from './constants';

import * as Papa from 'papaparse';
import { Uuid } from 'ng2-uuid';
import moment from 'moment/src/moment';

@Component({
  selector: 'import',
  templateUrl: './import.component.html',
  styleUrls: [ './import.component.scss' ]
})
export class ImportComponent {
  file: File;
  selectedBank: any;
  banks: any[];

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private uuid: Uuid
  ) {
    this.banks = [...CONSTANTS.BANKS];
  }

  onChangeFile(event: any) {
    this.file = event.srcElement.files[0];
  }

  onSubmit(): void {
    if (!this.file && !this.selectedBank) return;

    Papa.parse(this.file, {
      complete: (results) => {
        const bankConfig = BANK_CONFIG[this.selectedBank];
        const processCurrency = (credit, debit) => {
          if (!credit && !debit) return;

          const test = credit
            ? parseFloat(credit.substr(1))
            : 0 - parseFloat(debit.substr(1))

          return test;
        }

        // TODO: Create factory? to call with bank key, which will return the appropriate
        // function to tun in order to parse the results

        const data = results.data.reduce((acc, transaction, index) => {
          const beforeStart = () => index < bankConfig.TRANSACTION_START_ROW;
          const afterEnd = () => transaction.length < bankConfig.TRANSACTION_START_ROW;

          if (beforeStart() ||  afterEnd()) return [...acc];

          const t: Transaction = {
            id: this.uuid.v1(),
            category: CONSTANTS.UNKNOWN_CATEGORY,
            date: moment(transaction[0], bankConfig.DATE_FORMAT),
            type: transaction[1],
            description: transaction[2],
            amount: processCurrency(transaction[3], transaction[4])
          };

          return [...acc, t];
        }, []);

        console.log('TRANSACTIONS', data)

        this.transactionService.sendTransactions(data);
      }
    });
  }
}
