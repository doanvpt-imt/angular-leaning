import { Component, Input } from '@angular/core';
import { Total } from '../cart.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() total: Total = { gift: 0, sub: 0, payment: 0 };
}
