import { Component,OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

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
    private toast:ToastrService,
    private route: ActivatedRoute,
    private router:Router,
    ){}
  ngOnInit(): void {

   this.tecnico.id = this.route.snapshot.paramMap.get('id');
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
    this.service.findById(this.tecnico.id).subscribe(resposta =>{

      this.tecnico = resposta;
      this.tecnico.perfis=[];

    }, ()=>{
      this.router.navigate(['/tecnico'])
    })
  }
  update()
  {

    this.service.update(this.tecnico).subscribe( resposta =>{

      this.toast.success('Tecnico Actualizado com sucesso','Actualizar');
      this.router.navigate(["/tecnico"])

    },ex=>{
      
      if(ex.error)
      {
        this.toast.error(ex.error.message,'Tecnico');
      }
      console.log(ex);
      
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
