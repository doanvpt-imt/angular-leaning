import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from '../../product';
import { ProductService } from '../../product.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  productList: IProduct[] = [];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    public userService: UserService
  ) {}

  ngOnInit() {
    // console.log(this.activatedRoute);

    this.productService
      .getProductList()
      .subscribe((ps) => (this.productList = ps));

    // this.activatedRoute.queryParamMap.subscribe((query) => {
    //   const orderBy = query.get('orderBy');
    //   console.log(orderBy);
    // });
  }
}
