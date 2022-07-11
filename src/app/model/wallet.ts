import {MoneyType} from "./money-type";
import {User} from "./user";

export interface Wallet {
  id?: number;
  name?: string;
  icon?: string;
  moneyAmount?: string;
  moneyType?: MoneyType;
  appUser?: User;
}
