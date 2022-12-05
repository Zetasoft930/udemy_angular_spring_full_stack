import { Component,OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

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
    private toast:ToastrService,
    private route: ActivatedRoute,
    private router:Router,
    ){}
  ngOnInit(): void {

   this.cliente.id = this.route.snapshot.paramMap.get('id');
   this.findById();
   
  }

  email = new FormControl(null, [Validators.email,Validators.required]);
  senha = new FormControl(null, Validators.required);
  nome = new FormControl(null, [Validators.minLength(3),Validators.maxLength(150),Validators.required]);
  cpf = new FormControl(null, Validators.required);

  validateCampo()
  {
    return this.email.valid && this.senha.valid && this.nome.valid && this.cpf.valid;
  }

  findById(){
    this.service.findById(this.cliente.id).subscribe(resposta =>{

      this.cliente = resposta;

    }, ()=>{
      this.router.navigate(['/cliente'])
    })
  }
  update()
  {

    this.service.update(this.cliente).subscribe( resposta =>{

      this.toast.success('cliente Actualizado com sucesso','Actualizar');
      this.router.navigate(["/cliente"])

    },ex=>{
      
      if(ex.error)
      {
        this.toast.error(ex.error.message,'cliente');
      }
      console.log(ex);
      
     /* if(ex.error.errors)
      {
        ex.error.errors.forEach(element => {

          this.toast.error(element,'cliente');
          
        });
      }*/
      
    });
    

  }

}
