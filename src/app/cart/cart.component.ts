import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterState } from '@angular/router';
import { StoreActions } from 'src/app/core/store/actions/books.action';
import { selectCartBooks, selectBooks, selectCartTotal, selectCartIds } from 'src/app/core/store/reducers';
import { Book, FormFields, ICustomerOrder } from 'src/app/core/models';
import { BooksService } from 'src/app/core/services/books.service';
import { pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @ViewChild('orderForm') orderForm: ElementRef;

  books: Book[];
  cart: Book[];
  total: number;
  order: boolean;
  ids: string[];
  customerOrder: ICustomerOrder;
  formFields: FormFields;
  validForm: number;

  constructor(
    private store$: Store<RouterState>,
    private book$: BooksService,
    private router: Router,
  ) {
    this.total = null;
    this.order = false;
    this.ids = [];
    this.customerOrder = null;

    this.formFields = {
      fullName: '',
      address: '',
      city: '',
      zip: '',
      state: '',
      country: '',
      paymentType: 0,
      cardName: '',
      cardNumber: 0,
      cardExpiry: '',
      cardCVV: 0
    };

    this.validForm = 1;
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
    this.orderForm.nativeElement.reset();
  }

  sendFormData(){
    this.checkFormData();
    if( this.validForm ) {
      this.customerOrder = Object.assign({
        lineItems: this.book$.countedBooks( this.ids )
      }, this.formFields, {});

      // make post request here
      console.log('Customer Order: \n', this.customerOrder);

      this.book$.orderBook(this.customerOrder).subscribe(
        res => {
          console.log('SendFormData result: ', res); 
          this.router.navigate(['/success']);
        },
        err => {
          console.log('SendFormData error: ', err, Object.keys(err));
          this.router.navigate(['/404', { error: 1 }]);
        }
      );
      
    }
  }

  checkFormData(){
    let ngForm = this.orderForm.nativeElement, 
        required = Object.keys(this.formFields).filter( key => ngForm[key].required );
    
    this.validForm = 1;

    required.map( name => {
      if( !ngForm[name].value || ngForm[name].minlength > ngForm[name].value.length ) {
        this.validForm &= 0;
        ngForm[name];
      }
    } );
  }

  ngOnInit() {
    this.store$.dispatch(new StoreActions.GetBooks());
    this.store$.select( selectBooks ).subscribe( books => this.books = books );
    this.store$.select( selectCartBooks ).subscribe( cBooks => { this.cart = cBooks; console.log( this.cart ) } );
    this.store$.select( selectCartTotal ).subscribe( total => this.total = total );
    this.store$.select( selectCartIds ).subscribe( ids => this.ids = ids );
  }

}
