import { ICustomer } from "./ICustomer";
import { IProduct } from "./IProduct";

export interface IOrder {
  orderDate: string;
  customer: ICustomer;
  product: IProduct;
  requiredDate: string;
  shippedDate: string;
  shippedVia: string;
  shippedName: string;
  shippedAddress: string;
  shippedCity: string;
  shippedRegion: string;
  shippedPostalCode: string;
  shippedCountry: string;
}
