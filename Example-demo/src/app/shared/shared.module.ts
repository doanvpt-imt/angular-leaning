import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../user.service';
import { AboutComponent } from '../about/about.component';
import { BodyComponent } from '../cart/body/body.component';
import { CartComponent } from '../cart/cart.component';
import { FooterComponent } from '../cart/footer/footer.component';
import { GiftComponent } from '../cart/footer/gift/gift.component';
import { PaymentComponent } from '../cart/footer/payment/payment.component';
import { HeaderComponent } from '../cart/header/header.component';
import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { RegisterComponent } from '../register/register.component';
import { SignInRfComponent } from '../sign-in-rf/sign-in-rf.component';
import { SignInComponent } from '../sign-in/sign-in.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [UserService],
    };
  }
}

export const COMPONENT = [
  HomeComponent,
  AboutComponent,
  CartComponent,
  HeaderComponent,
  BodyComponent,
  FooterComponent,
  GiftComponent,
  PaymentComponent,
  NotFoundComponent,
  SignInComponent,
  SignInRfComponent,
  RegisterComponent,
];
