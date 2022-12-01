import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private htpp:HttpClient) { }

  findAll():Observable<Tecnico[]>{

    return this.htpp.get<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnico`);

  }
  create(tecnico:Tecnico):Observable<Tecnico>
  {
    return this.htpp.post<Tecnico>(`${API_CONFIG.baseUrl}/tecnico`,tecnico);
  }
}
