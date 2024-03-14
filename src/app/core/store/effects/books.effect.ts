import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { StoreActions } from '../actions/books.action';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { BooksService } from '../../services/books.service';

@Injectable()
export class StoreEffects {

  constructor(
    private actions$: Actions,
    private booksService: BooksService
    ) { }


  @Effect() fetch$: Observable<Action> = this.actions$.pipe(
    ofType(StoreActions.GET_BOOKS),
    switchMap((action: StoreActions.GetBooks) => this.booksService.getAllBooks()),
    map(data => {
      return new StoreActions.GetBooksSuccess(data);
    })
  );

  @Effect() add$: Observable<Action> = this.actions$.pipe(
    ofType(StoreActions.ADD_TO_CART),
    switchMap( (action: StoreActions.AddToCart) => this.booksService.addToCart(action.id) ),
    map( (data: any) => new StoreActions.AddToCartSuccess(data) )
  );

  @Effect() remove$: Observable<Action> = this.actions$.pipe(
    ofType(StoreActions.REMOVE_FROM_CART),
    map( (action: StoreActions.RemoveFromCart) => this.booksService.removeFromCart(action.id) ),
    map( (data: any) => new StoreActions.RemoveFromCartSuccess(data) )
  );

}