export interface ItemModel {
  id:number
  name: string;
  quantity: number;
  price: number;
}

export interface CartItemModel {
  id: number;
  itemId: number;
  name: string;
  quantity: number;
  price: number;
  sumPrice: number;
}

export interface CartUpdateModel {
  itemId: number;
  step: number;
}