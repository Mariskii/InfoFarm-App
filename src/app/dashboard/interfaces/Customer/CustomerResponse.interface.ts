import { CustomerReduced } from "./Customer.interface";

export interface CustomerReducedResponse {
  content: CustomerReduced[],
  totalPages: number,
  number: number
}
