import { Action } from '@ngrx/store';
import { Book } from '../../models';

export namespace StoreActions {

  export const GET_BOOKS = 'GET_BOOKS';
  export const GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS';
  export const ORDER_BOOK = 'ORDER_BOOK';
  export const ORDER_BOOK_SUCCESS = 'ORDER_BOO_SUCCESS';
  export const ADD_TO_CART = 'ADD_TO_CART';
  export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
  export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
  export const REMOVE_FROM_CART_SUCCESS = 'REMOVE_FROM_CART_SUCCESS';

  export class GetBooks implements Action {
    readonly type = GET_BOOKS;
    constructor() { }
  }

  export class GetBooksSuccess implements Action {
    readonly type = GET_BOOKS_SUCCESS;
    constructor(public payload: Book[]) { }
  }

  export class OrderBook implements Action {
    readonly type = ORDER_BOOK;
    constructor() { }
  }

  export class OrderBookSuccess implements Action {
    readonly type = ORDER_BOOK_SUCCESS;
    constructor(public payload: Book[]) { }
  }

  export class AddToCart implements Action {
    readonly type = ADD_TO_CART;
    constructor(public id: string) { }
  }

  export class AddToCartSuccess implements Action {
    readonly type = ADD_TO_CART_SUCCESS;
    constructor(public payload: Book[]) { }
  }

  export class RemoveFromCart implements Action {
    readonly type = REMOVE_FROM_CART;
    constructor(public id: string) { }
  }

  export class RemoveFromCartSuccess implements Action {
    readonly type = REMOVE_FROM_CART_SUCCESS;
    constructor(public payload: Book[]) { }
  }

  export type Actions =
    GetBooks |
    GetBooksSuccess |
    AddToCart |
    AddToCartSuccess |
    RemoveFromCart |
    RemoveFromCartSuccess;

}