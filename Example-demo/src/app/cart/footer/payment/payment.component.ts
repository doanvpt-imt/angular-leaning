import { Component, Input } from '@angular/core';
import { Total } from '../../cart.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  @Input() total: Total = { gift: 0, sub: 0, payment: 0 };
}
