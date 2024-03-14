import { initialState } from '../state/books.state';
import { BooksState } from '../../models';
import { StoreActions } from '../actions/books.action';

export function booksReducer(state = initialState, action): BooksState {

  switch (action.type) {

    case StoreActions.GET_BOOKS_SUCCESS:
        
        return Object.assign({}, state, {
          booksList: [...action.payload]
        });

    case StoreActions.ADD_TO_CART_SUCCESS:

      const book = action.payload;

      const books = [...state.cart.books, book];
      const ids = [...state.cart.order.ids, book.id];
      const total = state.cart.order.total + book.price;

      return Object.assign({}, state, {
        cart: {
          ...state.cart,
          books,
          order: {
            ...state.cart.order,
            ids,
            total
          }
        }
      });

    case StoreActions.REMOVE_FROM_CART_SUCCESS:
          
          const 
            rBooks = action.payload,
            rIds = [...state.cart.order.ids, rBooks.id],
            rTotal = rBooks.reduce( 
                  (price: number, currentValue: { price: number; }) => price + currentValue.price
                  , 0 );
        
          return {
            ...state,
            cart: {
              ...state.cart,
              books: rBooks,
              order: {
                ...state.cart.order,
                ids: rIds,
                total: rTotal
              }
            }
          };

    default: 
      return state;
      
  }
}