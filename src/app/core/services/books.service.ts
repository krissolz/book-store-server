import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { switchMap, catchError, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from './cookie.service';

import { Store } from '@ngrx/store';
import { RouterState } from '@angular/router';
import { selectCartBooks, selectBooks } from 'src/app/core/store/reducers';
import { Book, LineItems, ICustomerOrder } from '../models';

const POST_URL: string = environment.postURL;
const getBooksUrl: string = environment.getUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'dronsense-auth-token-80'
  })
};

@Injectable()
export class BooksService {

  private myObservable = new Subject<string>();
  private cBooks: Book[];
  private books: Book[];

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private cookie$: CookieService,
    private store$: Store<RouterState>,
  ) {
    this.route.queryParamMap.subscribe( queryParams => this.myObservable.next( queryParams.get('id') ) );
    this.store$.select( selectCartBooks ).subscribe( cBooks => this.cBooks = cBooks );
    this.store$.select( selectBooks ).subscribe( books => this.books = books );
  }

  orderBook(order: ICustomerOrder): Observable<any> {
    return this.http.post<ICustomerOrder>(POST_URL, order, httpOptions)
    .pipe(
      map( res => res ),
      catchError(err => err)
    );
  }

  addToCart(id: string){
    let book = this.books.filter(book => book.id === id);
    return book;
  }

  removeFromCart(id: string){
    const i = this.cBooks.findIndex(element => element.id === id);
    this.cBooks.splice(i, 1);
    return this.cBooks;
  }

  checkCart(id: string): boolean {
    return this.cBooks.some(book => id === book.id);
  }

  getUnicBooks(books: Book[]): Book[]{
    return [...new Set(books)];
  }

  getCopiesNumber(id: string): number{
    let arr = this.cBooks.filter(item => item.id === id);
    return arr.length;
  }

  getAllBooks(): Observable<any> {
    return this.http.get(getBooksUrl, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  countedBooks(ids: string[]): LineItems[] {
    let books = ids.reduce((allIds, id) => { 
      if (id in allIds) {
        allIds[id]++;
      }
      else {
        allIds[id] = 1;
      }
        return allIds;
      }, {});
  
    return Object.keys(books).map(key => { return { bookId: key, quantity: books[key] }; });
  }

  width$(): number{
    return Math.max( document.body.offsetWidth, document.documentElement.offsetWidth );
  }

}