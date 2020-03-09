import { Component, OnInit, OnDestroy } from '@angular/core';
import {BooksService} from '../services/books.service';
import {Subscription} from 'rxjs';
import {Book} from '../models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  constructor(private bookService: BooksService) { }
    
    public booksSubscription: Subscription;
    public books: Book[] = [];

  ngOnInit() {
      this.booksSubscription = this.bookService.booksSubject.subscribe(
      
          (books) => {
              this.books = books;
          }
          
      );
      
      this.bookService.emitBookSubject();
  }
    
    ngOnDestroy(){
        this.booksSubscription.unsubscribe();
    }

}
