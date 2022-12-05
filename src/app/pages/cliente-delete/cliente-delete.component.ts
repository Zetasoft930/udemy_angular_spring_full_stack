import { Component,OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

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

 
  findById(){
    this.service.findById(this.cliente.id).subscribe(resposta =>{

      this.cliente = resposta;

    }, ()=>{
      this.router.navigate(['/Cliente'])
    })
  }
  delete()
  {

    this.service.delete(this.cliente).subscribe( resposta =>{

      this.toast.success('Cliente Eliminado com sucesso','Eliminado');
      this.router.navigate(["/Cliente"])

    },ex=>{
      
      if(ex.error)
      {
        this.toast.error(ex.error.message,'Cliente');
      }
      console.log(ex);
      
     /* if(ex.error.errors)
      {
        ex.error.errors.forEach(element => {

          this.toast.error(element,'Cliente');
          
        });
      }*/
      
    });
    

  }


}
