import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../_services/items.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items$: any;
  cartItems$: any;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.itemsService.getAll().subscribe((response) => {
      this.items$ = response.items;
      this.cartItems$ = response.cart;
    });
  }

  updateCart(itemId: number, step: number) {
    this.itemsService.updateCart(itemId, step).subscribe({
      next: (response) => {
        this.items$ = response.items;
        this.cartItems$ = response.cart;
      },
    });
  }

  deleteCartItem(id: number) {
    this.itemsService.deleteCartItem(id).subscribe({
      next: (response) => {
        this.items$ = response.items;
        this.cartItems$ = response.cart;
      },
    });
  }
}
