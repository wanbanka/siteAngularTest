import { Injectable } from '@angular/core';
import {Book} from '../models/book.model';
import {Observable, Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() {
  
      this.getListBooks();
  
  }
    
    private books: Book[] = [];
    public booksSubject: Subject<any[]> = new Subject<any[]>();

emitBookSubject(){
    this.booksSubject.next(this.books.slice());
}

saveBooks(){
    firebase.database().ref('/books').set(this.books);
}

getListBooks(){
    firebase.database().ref('/books').on('value', (data: DataSnapshot) => {
       this.books = data.val() ? data.val() : [];
        this.emitBookSubject();
    });
}

getOneBook(id: number){
    
    return new Promise((resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
            (data: DataSnapshot) => {
                resolve(data.val());
            },
            (error) => {
                reject(error);
            }
        );
    });
}

insertBook(book: Book){
    this.books.push(book);
    this.saveBooks();
    this.emitBookSubject();
}

deleteBook(book: Book){
    const bookIndex = this.books.findIndex((bookE1) => {
        if(bookE1 === book){
            return true;
        }
    }
    
    );
    
    this.books.splice(bookIndex, 1);
    this.saveBooks();
    this.emitBookSubject();
}
    
}
