import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: IProduct[] = [
    {
      id: '855d9c00',
      name: 'Iphone 6s',
      price: 15.99,
      imageUrl: 'assets/images/iphone-6s.png',
      categories: ['female', 'dress'],
    },
    {
      id: '855d9c01',
      name: 'Iphone 12',
      price: 19.99,
      imageUrl: 'assets/images/iphone-12.jpg',
      categories: ['female', 'dress'],
    },
    {
      id: '855d9c02',
      name: 'Iphone 15',
      price: 20.49,
      imageUrl: 'assets/images/iphone-15.jpg',
      categories: ['female', 'dress'],
    },
  ];
  constructor() {}
  getProductList(): Observable<IProduct[]> {
    return of(this.products).pipe(delay(50));
  }

  findProductById(id: string): Observable<IProduct> {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return of(product).pipe(delay(50));
    } else {
      return throwError(new Error('404 Not Found'));
    }
  }
}
