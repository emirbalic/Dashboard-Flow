import { ICustomer } from "./ICustomer";
import { IProduct } from "./IProduct";

export interface IOrder {
  orderDate: string;
  customer: ICustomer;
  product: IProduct;
  requiredDate: string;
  shippedName: string;
  shippedAddress: string;
  shippedCity: string;
  shippedPostalCode: string;
  shippedCountry: string;
  // add this two when work on post
  customerId: string;
  productId: string;
}
