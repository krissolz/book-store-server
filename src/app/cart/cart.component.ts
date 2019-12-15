import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterState } from '@angular/router';
import { StoreActions } from 'src/app/core/store/actions/books.action';
import { selectCartBooks, selectBooks, selectCartTotal } from 'src/app/core/store/reducers';
import { Book } from 'src/app/core/models';
import { BooksService } from 'src/app/core/services/books.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  books: Book[];
  cart: Book[];
  total: number;
  order: boolean;

  @ViewChildren('form') public form: ElementRef;

  constructor(
    private store$: Store<RouterState>,
    private book$: BooksService
  ) {
    this.total = null;
    this.order = false;
  }

  checkBook(id: string): boolean {
    return this.book$.checkCart(id);
  }

  getUnic(cart: Book[]): Book[]{
    return this.book$.getUnicBooks(cart);
  }

  getNumber(id: string) : number {
    return this.book$.getCopiesNumber(id);
  }

  removeFromCart(id: string): void {
    this.store$.dispatch(new StoreActions.RemoveFromCart(id));
  }

  openForm(){
    this.order = true;
  }

  cancelForm(){
    this.order = false;
    this.form.nativeElement.reset();
  }

  sendFormData(){
    
  }

  checkFormData(){
    console.log( this.form.nativeElement )
  }

  ngOnInit() {
    this.store$.dispatch(new StoreActions.GetBooks());
    this.store$.select( selectBooks ).subscribe( books => this.books = books );
    this.store$.select( selectCartBooks ).subscribe( cBooks => { this.cart = cBooks; console.log( this.cart ) } );
    this.store$.select( selectCartTotal ).subscribe( total => this.total = total );
  }

}
