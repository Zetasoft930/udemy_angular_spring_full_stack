import { Component,OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico:Tecnico ={

    id:'',
    nome: '',
    cpf: '',
    email:'',
    senha:'',
    perfis:[],
    dataCriacao:''

  };

  constructor(
    private service:TecnicoService,
    private toast:ToastrService
    ){}
  ngOnInit(): void {
   
  }

  email = new FormControl(null, [Validators.email,Validators.required]);
  senha = new FormControl(null, [Validators.minLength(8),Validators.required]);
  nome = new FormControl(null, [Validators.minLength(3),Validators.maxLength(150),Validators.required]);
  cpf = new FormControl(null, Validators.required);

  validateCampo()
  {
    return this.email.valid && this.senha.valid && this.nome.valid && this.cpf.valid;
  }

  create()
  {

    this.service.create(this.tecnico).subscribe( resposta =>{

      this.toast.success('Tecnico cadastrado com sucesso','Cadastro');

    },ex=>{
      
      this.toast.error(ex.error.message,'Tecnico');
     /* if(ex.error.errors)
      {
        ex.error.errors.forEach(element => {

          this.toast.error(element,'Tecnico');
          
        });
      }*/
      
    });
    

  }

  addPerfil(perfil:any):void
  {

    if(this.tecnico.perfis.includes(perfil))
    {
      let index =  this.tecnico.perfis.indexOf(perfil);
      this.tecnico.perfis.splice(index,1);
    }else{
      this.tecnico.perfis.push(perfil);
    }
    
  }
  

}
