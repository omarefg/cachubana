export interface User {
  name: String
}

export interface Product {
  name: String,
  price: Number,
  quantity: Number,
  total: Number,
  _id: String
}

export interface Order {
  products: Array<Product>,
  region_code: String,
  routeId: String,
  slot: String,
  user: User,
  _id: String
}

export interface Payload {
  orders: Order
}

export interface Action {
  type: String,
  payload: Payload
}
