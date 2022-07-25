import {Wallet} from "./wallet";
import {ChildrenCategory} from "./children-category";

export interface Transaction{
  id?: string;
  wallet?: Wallet;
  childCategory?: ChildrenCategory;
  moneyAmount?: number;
  createdDate?: string
  note?: string
}
