export const CONSTANTS = {
  UNKNOWN_CATEGORY: 'UNKNOWN',
  DATE_FORMAT: 'DD/MM/YYYY',
  MONTH_DISPLAY_FORMAT: 'MMMM YYYY',
  MONTH_INDEX_FORMAT: 'M-YYYY',
  TRANSACTION_CATEGORIES: [
    { label: 'Unknown', value: 'UNKNOWN' },
    { label: 'Mortgage repayments', value: 'MORTAGE' },
    { label: 'Bills and utilities', value: 'BILLS' },
    { label: 'Savings', value: 'SAVINGS' },
    { label: 'Groceries', value: 'GROCERIES' },
    { label: 'Mobile phone', value: 'MOBILE' },
    { label: 'Cash withdrawal', value: 'CASH' },
    { label: 'Petrol/diesel', value: 'FUEL' },
    { label: 'Car/vehicles', value: 'VEHICLES' },
    { label: 'Insurances', value: 'INSURANCE' },
    { label: 'Hobbies and activities', value: 'HOBBIES' },
    { label: 'Fashion', value: 'FASHION' },
    { label: 'Travel', value: 'TRAVEL' },
    { label: 'Gambling', value: 'GAMBLING' },
    { label: 'Credit card payments', value : 'CREDIT_CARD' },
    { label: 'IOU payment', value: 'IOU' }
  ],
  BANKS: [
    { label: 'Nationwide', value: 'NATIONWIDE' }
  ]
};

export const BANK_CONFIG = {
  NATIONWIDE: {
    DATE_FORMAT: 'DD MMM YYYY',
    HEADER_ROW: 4,
    TRANSACTION_START_ROW: 5
  }
};
