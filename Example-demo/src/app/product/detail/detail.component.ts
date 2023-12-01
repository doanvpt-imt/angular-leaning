import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from '../../product';
import { ProductService } from '../../product.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  product: IProduct = {
    id: '',
    name: '',
    price: 0,
    imageUrl: '',
    categories: [],
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id') || ''),
        switchMap((id) => this.productService.findProductById(id))
      )
      .subscribe((product) => (this.product = product));
  }

  backToList() {
    this.router.navigate(['/product']);
  }
}
