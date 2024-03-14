import { ActionReducerMap, createSelector } from '@ngrx/store';
import { RootState } from '../state/root.state';
import { booksReducer } from './books.reducer';
import { BooksState } from 'src/app/core/models';

export const combineReducers: ActionReducerMap<RootState> = {
  store: booksReducer
}

export const selectState = (state: any) => state.store;
export const selectBooks = createSelector(selectState, (state: BooksState) => state.booksList);
export const selectCartBooks = createSelector(selectState, (state: BooksState) => state.cart.books);
export const selectCartTotal = createSelector(selectState, (state: BooksState) => state.cart.order.total);
export const selectCartIds = createSelector(selectState, (state: BooksState) => state.cart.order.ids);

/*
  store:

  {
    booksList: [
          {
              id: 'string',
              title: 'string',
              author: 'string',
              isbn: 'string',
              price: 0 
          },
      ],
      cart: {
          books: [],
          order: { 
              ids: [], 
              total: 0 
          }
      }
  }

*/

// export const selectCartBooks = createSelector(selectBook, (state: BooksState) => state.cart.books);
// export const selectCartTotal = createSelector(selectBook, (state: BooksState) => state.cart.order.total);
// export const selectCartIds = createSelector(selectBook, (state: BooksState) => state.cart.order.ids);
// export const selectCart = createSelector(selectBook, (state: BooksState) => state.cart);