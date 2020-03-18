import { Component, OnInit, OnDestroy } from '@angular/core';
import {BooksService} from '../../services/books.service';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../models/book.model';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit, OnDestroy {

    book: Book;
    
  constructor(private bookService: BooksService, private route: ActivatedRoute) { }

  ngOnInit() {
      let id = this.route.snapshot.params['id'];
      
      this.bookService.getOneBook(+id).then((book: Book) => {
          this.book = book;
          console.log(book);
      });
  }
    
    ngOnDestroy(){
        this.book = null;
    }

}
