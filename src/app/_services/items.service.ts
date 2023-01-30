import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CartItemModel,
  CartUpdateModel,
  ItemModel
} from '../_interfaces/item-model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getItems(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>('https://localhost:5001/api/items/', {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  getCartItems(): Observable<CartItemModel[]> {
    return this.http.get<CartItemModel[]>(
      'https://localhost:5001/api/items/cart',
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  updateCart(itemId: number, step: number) {
    var cartUpdateModel: CartUpdateModel = {
      itemId: itemId,
      step: step,
    };

    return this.http.post(
      'https://localhost:5001/api/items/cart',
      cartUpdateModel,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text' as 'json',
      }
    );
  }

  deleteCartItem(id: number) {
    return this.http.delete(
      'https://localhost:5001/api/items/cart/delete/' + id,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text' as 'json',
      }
    );
  }
}
