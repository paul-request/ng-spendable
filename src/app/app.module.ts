import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { UuidModule } from 'ng2-uuid';

import { TransactionService } from './transaction.service';

import { TransactionComponent } from './transaction.component';
import { TransactionsNavComponent } from './transactions-nav.component';
import { TransactionListComponent } from './transaction-list.component';
import { TransactionChartComponent } from './transaction-chart.component';
import { ImportComponent } from './import.component';
import { TransactionsComponent } from './transactions.component';
import { MainComponent } from './main.component';
import { AppComponent } from './app.component';

import { CategorisedPipe } from './categorised.pipe';
import { DisplayDatePipe } from './display-date.pipe';

import { CONSTANTS, BANK_CONFIG } from './constants';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ImportComponent,
    TransactionComponent,
    TransactionsComponent,
    TransactionsNavComponent,
    TransactionListComponent,
    TransactionChartComponent,
    CategorisedPipe,
    DisplayDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    UuidModule
  ],
  providers: [
    TransactionService,
    { provide: CONSTANTS, useValue: CONSTANTS },
    { provide: BANK_CONFIG, useValue: BANK_CONFIG }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
