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
    this.getItems();
    this.getCartItems();
  }

  getItems() {
    this.itemsService.getItems().subscribe((response) => {
      this.items$ = response;
    });
  }

  getCartItems() {
    this.itemsService.getCartItems().subscribe((response) => {
      this.cartItems$ = response;
    });
  }

  updateCart(itemId: number, step: number) {
    this.itemsService.updateCart(itemId, step).subscribe({
      next: () => {
        this.getItems();
        this.getCartItems();
      },
    });
  }

  deleteCartItem(id: number) {
    this.itemsService.deleteCartItem(id).subscribe({
      next: () => {
        this.getItems();
        this.getCartItems();
      },
    });
  }
}
