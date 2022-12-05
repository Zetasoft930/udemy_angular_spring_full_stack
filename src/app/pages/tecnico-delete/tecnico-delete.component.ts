import { Component,OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

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

 
  findById(){
    this.service.findById(this.tecnico.id).subscribe(resposta =>{

      this.tecnico = resposta;
      this.tecnico.perfis=[];

    }, ()=>{
      this.router.navigate(['/tecnico'])
    })
  }
  delete()
  {

    this.service.delete(this.tecnico).subscribe( resposta =>{

      this.toast.success('Tecnico Eliminado com sucesso','Eliminado');
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


}
