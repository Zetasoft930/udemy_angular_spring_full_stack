
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements AfterViewInit, OnInit  {

  constructor(private service:ChamadoService){}


  ELEMENT_DATA: Chamado[] = [];
  FILTER_DATA: Chamado[] = [];

  displayedColumns: string[] = ['id', 'titulo', 'cliente','tecnico',
  'dataAbertura','status','prioridade', 'accao'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.findAll();
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getStatus(status:any)
  {
    return this.service.getStatus(status);
  }
  getPrioridade(prioridade:any)
  {
    return this.service.getPrioridade(prioridade);
  }
  findByStatus(status:any)
  {
     let list: Chamado[] = [];
     this.ELEMENT_DATA.forEach(element =>{
     
      if(element.status == status)
      {
        list.push(element);
      }
     
      this.FILTER_DATA = list;

      this.dataSource = new MatTableDataSource<Chamado>(this.FILTER_DATA);
      this.dataSource.paginator = this.paginator;
     })
  }
  findAll(){

    this.service.findAll().subscribe(resposta =>{ 

       this.ELEMENT_DATA = resposta;
       this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

    })
 }


}
