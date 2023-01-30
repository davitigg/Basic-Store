import { UserModel } from "./user-model";

export interface ItemModel {
  id:number
  name: string;
  quantity: number;
  price: number;
}

export interface CartItemModel {
  id: number;
  user: UserModel
  item: ItemModel;
  quantity: number;
  sumPrice: number;
}

export interface CartUpdateModel {
  itemId: number;
  step: number;
}