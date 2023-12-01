import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Products } from '../cart.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  @Input() products: Products[] = [];
  @Output() onRemoveProduct = new EventEmitter();
  @Output() onChangeProductQuantity = new EventEmitter();

  onClickRemoveProduct(id: number): void {
    this.onRemoveProduct.emit(id);
  }

  inputQuantity(element: any, index: number) {
    this.onChangeProductQuantity.emit({ index, value: Number(element.value) });
  }
}
