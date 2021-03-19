import { Invoice } from "./invoice";

export interface Customer {
  id: number;
  company: string;
  email: string;
  firstName: string;
  invoices: Invoice[];
  lastName: string;
  totalAmount: number;
}

export interface CustomerState {
  company: string;
  email: string;
  firstName: string;
  lastName: string;
}
