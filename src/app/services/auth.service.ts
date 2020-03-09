import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
    
    createUser(user:User): Promise<any>{
        const mail = user.mail;
        const password = user.password;
        
        return new Promise(
        
        (resolve, reject) => {
        
        firebase.auth().createUserWithEmailAndPassword(mail, password).then(
        
        () => {
        resolve();
    },
        (error) => {
        reject(error);
    }
        
        );
    }
        
        );

    }
    
    signInUser(user:User): Promise<any>{
        
        const mail = user.mail;
        const password = user.password;
        
        return new Promise(
        
        (resolve, reject) => {
        
        firebase.auth().signInWithEmailAndPassword(mail, password).then(
        
        () => {
        resolve();
    },
        (error) => {
        reject(error);
    }
        
        );
        
    }
        
        );
        
    }
    
    signOutUser(){
        
        firebase.auth().signOut();
        
    }
}
