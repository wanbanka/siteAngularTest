import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {Book} from '../../models/book.model';
import {BooksService} from '../../services/books.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
    
    formGroup: FormGroup;
    
    photo: boolean = false;
    synopsis: boolean = false;

  constructor(private bookService: BooksService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
      this.initForm();
  }
    
    initForm(){
        this.formGroup = this.formBuilder.group({
            title: ['', [Validators.required, Validators.pattern('.{5,}')]],
            author: ['', [Validators.required, Validators.pattern('.{5,}')]],
            photo: this.formBuilder.array([]),
            synopsis: this.formBuilder.array([])
        });
    }
    
    getPhoto(){
        return this.formGroup.get('photo') as FormArray;
    }
    
    addPhoto(){
        this.getPhoto().push(this.formBuilder.control(null, [Validators.required]));
        this.photo = true;
    }
    
    removePhoto(){
        this.getPhoto().removeAt(0);
        this.photo = false;
    }
    
    changePhoto(){
        this.photo ? this.removePhoto() : this.addPhoto();
    }
    
    changeListener($event){
        this.recupFile($event.target);
    }
    
    recupFile(inputValue: any){
        const file: File = inputValue.files[0];
       const reader = new FileReader();
        const photoValue = this.getPhoto();
        let photo64 = null;
        
         reader.onloadend = function(){
             photo64 = reader.result;
             photoValue.patchValue([photo64]);
         };
        
        reader.readAsDataURL(file);
        
        console.log(photo64);
    }
    
    getSynopsis(){
        return this.formGroup.get('synopsis') as FormArray;
    }
    
    addSynopsis(){
        this.getSynopsis().push(this.formBuilder.control('', [Validators.required, Validators.pattern('.{10,}')]));
        this.synopsis = true;
    }
    
    removeSynopsis(){
        this.getSynopsis().removeAt(0);
        this.synopsis = false;
    }
    
    changeSynopsis(){
        this.synopsis ? this.removeSynopsis() : this.addSynopsis();
    }
    
    createNewBook(){
        const options = this.formGroup.value;
        const newBook = new Book(
            options['title'],
            options['author'],
            options['photo'] ? options['photo'] : '',
            options['synopsis'] ? options['synopsis'] : ''
        );
        
        this.bookService.insertBook(newBook);
        this.router.navigate(['/books']);
    }
    
}