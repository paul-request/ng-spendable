// TODO: Moment typings not working for some reason
// They come packaged in moment, but how to use them? Do I need to imprt moment here?
// Or work out some tsconfig to do it?
export class Transaction {
  id: string;
  category: string;
  date: any;
  type: string;
  description: string;
  amount: number;
}
