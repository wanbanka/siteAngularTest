import { Component, OnInit, OnDestroy } from '@angular/core';
import {BooksService} from '../services/books.service';
import {Subscription} from 'rxjs';
import {Book} from '../models/book.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  constructor(private bookService: BooksService, private router: Router) { }
    
    public booksSubscription: Subscription;
    public books: Book[] = [];

  ngOnInit() {
      this.booksSubscription = this.bookService.booksSubject.subscribe(
      
          (books) => {
              console.table(books);
              this.books = books;
          }
          
      );
      
      this.bookService.emitBookSubject();
  }
    
    removeBook(book: Book){
        this.bookService.deleteBook(book);
    }
    
    nextPage(i: number){
        this.router.navigate(['/books/view', i]);
    }
    
    ngOnDestroy(){
        this.booksSubscription.unsubscribe();
    }

}
