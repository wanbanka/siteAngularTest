import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    
    errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
    
    onSubmit(form: NgForm){
        const mail = form.value['mail'];
        const password = form.value['mdp'];
        const user = new User(mail, password);
        
        this.authService.createUser(user).then(
        
            () => {
                this.router.navigate(['/books']);
            },
            (error) => {
                this.errorMessage = error;
            }
        
        );
    }

}
