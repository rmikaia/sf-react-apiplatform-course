import { Customer } from "./customer";

export interface Invoice {
  amount: string;
  chrono: number;
  customer: Customer;
  id: number;
  sentAt: Date;
  status: string;
}

export interface InvoiceState {
  amount: string;
  status: string;
  customer: string;
}
