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
    
    
    fileUrl: string;
    photoUpload: File;

  constructor(private bookService: BooksService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
      this.initForm();
  }
    
    initForm(){
        this.formGroup = this.formBuilder.group({
            title: ['', [Validators.required, Validators.pattern('[a-zA-Z]{5,}')]],
            author: ['', [Validators.required, Validators.pattern('[a-zA-Z]{5,}')]],
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
    
    detectFiles(event){
        this.photoUpload = event.target.files[0];
        console.log(this.formGroup.invalid);
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
    
    insertData(){
        const options = this.formGroup.value;
        
        console.log(options);
        
        const newBook = new Book(
            options['title'],
            options['author']
        );
        
        newBook.photo = (options['photo'].length > 0 && this.fileUrl != "") ? this.fileUrl : '';
        
        newBook.synopsis = options['synopsis'].length > 0 ? options['synopsis'][0] : '';
        
        console.log(newBook);
        
        this.bookService.insertBook(newBook);
        this.router.navigate(['/books']);
    }
    
    createNewBook(){
        
        if(this.photoUpload && this.photoUpload != undefined){
            this.bookService.uploadPhoto(this.photoUpload).then((url: string) => {
                
                this.fileUrl = url;
                console.log(this.fileUrl);
                this.insertData();
        });
        } else {
            this.insertData();
        }
    }
    
}