import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean{
        
        return new Promise((resolve, reject) => {
        
        firebase.auth().onAuthStateChanged(
        
        (user) => {
            
            if(user){
                resolve(true);
            }  else {
                this.router.navigate(['/auth/signin']);
                resolve(false);
            }
            
        }
        
        );
        
    }
        
        );
    }
}
