import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/tecnico';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements AfterViewInit, OnInit {

   ELEMENT_DATA: Tecnico[] = [

    {
      id: 1,
      nome: 'Celso de Sousa',
      email: 'celso@gmail.com',
      cpf: '4522AD2',
      senha: '1233',
      perfis: ['0'],
      dataCriacao: '2022-11-24 12:34:78'
    }
  ];

  displayedColumns: string[] = ['id', 'nome', 'email', 'cpf', 'accao'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  constructor() { }
  ngOnInit(): void {

  }



  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}


