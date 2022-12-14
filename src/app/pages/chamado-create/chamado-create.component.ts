import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pessoa } from 'src/app/models/aux/pessoa';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit{
  
  chamado:Chamado ={

    id:'',
    dataAbertura:'',
    dataFechamento:'',
    prioridade:'',
    status:'',
    titulo:'',
    observacao:'',
    tecnico:{id:'',nome:''},
    cliente:{id:'',nome:''}

  };

  clientes:Cliente[] = [];
  tecnicos:Tecnico[] = [];
  tecnicoID:any;
  clienteID:any;

  constructor(
    private clienteService:ClienteService,
    private tecnicoService:TecnicoService,
    private service:ChamadoService,
    private toast:ToastrService,
    private router:Router){}

  ngOnInit(): void {

    this.loadCliente();
    this.loadTecnico();
    
  }

  titulo = new FormControl(null,[Validators.required,Validators.maxLength(255)]);
  cliente = new FormControl(null,Validators.required);
  tecnico = new FormControl(null,Validators.required);
  status = new FormControl(null,Validators.required);
  prioridade = new FormControl(null,Validators.required);
  descricao = new FormControl(null,[Validators.required,Validators.maxLength(255)]);

  validate():boolean{
    
    return this.titulo.valid &&
           this.cliente.valid &&
           this.tecnico.valid &&
           this.status.valid &&
           this.descricao.valid;
  }

  getPessoa(id:any,nome:string)
  {
    let pessoa:Pessoa={
      id:id,
      nome:nome
    }
    return pessoa;
  }

  loadCliente()
  {

    this.clienteService.findAll().subscribe(resposta =>{
        this.clientes = resposta;
    });

  }
  loadTecnico()
  {

    this.tecnicoService.findAll().subscribe(resposta =>{
        this.tecnicos = resposta;
    });

  }

  create(){

    this.chamado.tecnico = this.getPessoa(this.tecnicoID,'dev');
    this.chamado.cliente = this.getPessoa(this.clienteID,'dev');

    this.service.create(this.chamado).subscribe(()=>{

      this.toast.success('Tecnico cadastrado com sucesso','Cadastro');
      this.router.navigate(['chamado']);

    },ex =>{
      this.toast.error(ex.error.message,'Tecnico');
    })

  }

}
