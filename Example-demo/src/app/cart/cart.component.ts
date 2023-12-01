import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Products, Total } from './cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products: Products[] = [
    {
      id: 1,
      name: 'Iphone 6s',
      description: 'Rose Gold | 64GB | A9 chip | 4.7-inch',
      thumbnail: 'iphone-6s.png',
      price: 1000,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Iphone 12 Pro',
      description: 'Blue | 512TB | A12 | 6.1-inch',
      thumbnail: 'iphone-12.jpg',
      price: 2000,
      quantity: 2,
    },

    {
      id: 3,
      name: 'Iphone 15 Pro',
      description: 'Gray | 1TB | A17Pro | 6.1-inch',
      thumbnail: 'iphone-15.jpg',
      price: 2500,
      quantity: 1,
    },
  ];

  total: Total = {
    gift: 5,
    sub: 0,
    payment: 0,
  };

  async onSubTotal() {
    if (this.products.length) {
      this.total.sub = this.products.reduce(
        (sum, product) => sum + product.quantity * product.price,
        0
      );
      this.onPaymentTotal();
    }
  }

  onPaymentTotal(): void {
    this.total.payment = this.total.sub * ((100 - this.total.gift) / 100);
  }

  ngOnInit(): void {
    this.onSubTotal();
  }

  onRemoveProduct(id: number): void {
    this.products = this.products.filter((item) => item?.id !== id);
    this.onSubTotal();
  }

  onChangeProductQuantity(event: { index: number; value: number }): void {
    this.products[event.index].quantity = event.value;
    this.onSubTotal();
  }
}
