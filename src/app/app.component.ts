import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
    constructor(){
        
        const config = {
    apiKey: "AIzaSyBM6Ia7JC5KNx3KgCxfFgrO_4hmeUiEjao",
    authDomain: "applitest-92522.firebaseapp.com",
    databaseURL: "https://applitest-92522.firebaseio.com",
    projectId: "applitest-92522",
    storageBucket: "applitest-92522.appspot.com",
    messagingSenderId: "1030510180448",
    appId: "1:1030510180448:web:947134678c78ce0be1ab05"
  };
        firebase.initializeApp(config);
        
    }
    
}
