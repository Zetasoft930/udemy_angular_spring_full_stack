import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Credencial } from '../models/credencial';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private htpp:HttpClient,private router:Router) { }
  authenticate(creds:Credencial){

  
    var url = `${API_CONFIG.baseUrl}/login`;
 
    return this.htpp.post(url,creds,{
      observe:'response',
      responseType:'text'
    });

  }
  successFullLogin(authToken:string){

    localStorage.setItem('token',authToken);
    this.router.navigate(['home']);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
  isAuthenticated(){
    
    let token = localStorage.getItem('token');
    if(token != null)
    {
      return !this.jwtService.isTokenExpired(token);
    }

    return false;
  }
}
