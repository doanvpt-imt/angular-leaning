export interface Products {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

export interface Total {
  gift: number;
  sub: number;
  payment: number;
}
