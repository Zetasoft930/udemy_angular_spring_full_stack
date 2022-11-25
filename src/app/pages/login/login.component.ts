

import { Component, OnInit } from '@angular/core';
import { Credencial } from 'src/app/models/credencial';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  creds:Credencial = {email:'',senha:''}
  
 constructor(private toast:ToastrService,private service:AuthService){}

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  ngOnInit(): void { }

  validarCampos():boolean{
    return this.email.valid && this.senha.valid;
  }

  logar(){

    this.service.authenticate(this.creds).subscribe({
      complete: () =>{
        
      }
    })
   this.service.authenticate(this.creds).subscribe(resposta =>{
     var token = ''+resposta.headers.get('Authorization')?.substring(7);
     this.service.successFullLogin(token);
      this.toast.info('Seja bem vindo ao Help desk','Login');
      
    },()=>{
      this.toast.error('Usuario e/ou senha invalida','Login');
    });
   
  }

}

