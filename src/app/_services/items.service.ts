import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CartItemModel,
  CartUpdateModel,
  ItemModel,
  ItemResponse,
} from '../_interfaces/item-model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAll(): Observable<ItemResponse> {
    return this.http.get<ItemResponse>('https://localhost:5001/api/items/', {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  updateCart(itemId: number, step: number): Observable<ItemResponse> {
    var cartUpdateModel: CartUpdateModel = {
      itemId: itemId,
      step: step,
    };

    return this.http.post<ItemResponse>(
      'https://localhost:5001/api/items/cart',
      cartUpdateModel,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  deleteCartItem(id: number): Observable<ItemResponse> {
    return this.http.delete<ItemResponse>(
      `https://localhost:5001/api/items/cart/delete/${id}`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }
}
