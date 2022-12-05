import { Component,OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente:Cliente ={

    id:'',
    nome: '',
    cpf: '',
    email:'',
    senha:'',
    dataCriacao:''

  };

  constructor(
    private service:ClienteService,
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

    this.service.create(this.cliente).subscribe( resposta =>{

      this.toast.success('Cliente cadastrado com sucesso','Cadastro');

    },ex=>{
      
      this.toast.error(ex.error.message,'Cliente');
     /* if(ex.error.errors)
      {
        ex.error.errors.forEach(element => {

          this.toast.error(element,'Cliente');
          
        });
      }*/
      
    });
    

  }


}
