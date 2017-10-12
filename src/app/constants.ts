export const CONSTANTS = {
  DATE_FORMAT: 'DD/MM/YYYY',
  TRANSACTION_CATEGORIES: [
    { name: 'Unknown', value: '' },
    { name: 'Mortgage', value: 'MORTAGE' },
    { name: 'Bills', value: 'BILLS' },
    { name: 'Savings', value: 'SAVINGS' }
  ],
  BANKS: [
    { name: 'Nationwide', value: 'NATIONWIDE' }
  ]
};

export const BANK_CONFIG = {
  NATIONWIDE: {
    DATE_FORMAT: 'DD MMM YYYY',
    HEADER_ROW: 4,
    TRANSACTION_START_ROW: 5
  }
};
