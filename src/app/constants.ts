export const CONSTANTS = {
  UNKNOWN_CATEGORY: 'UNKNOWN',
  DATE_FORMAT: 'DD/MM/YYYY',
  TRANSACTION_CATEGORIES: [
    { label: 'Unknown', value: 'UNKNOWN' },
    { label: 'Mortgage', value: 'MORTAGE' },
    { label: 'Bills', value: 'BILLS' },
    { label: 'Savings', value: 'SAVINGS' },
    { label: 'Car', value: 'CAR' },
    { label: 'Insurance', value: 'INSURANCE' },
    { label: 'Hobbies', value: 'HOBBIES' },
    { label: 'Fashion', value: 'FASHION' },
    { label: 'Travel', value: 'TRAVEL' }
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
