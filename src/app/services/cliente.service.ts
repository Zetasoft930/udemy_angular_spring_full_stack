
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private htpp:HttpClient) { }

  findAll():Observable<Cliente[]>{

    return this.htpp.get<Cliente[]>(`${API_CONFIG.baseUrl}/cliente`);

  }
  create(Cliente:Cliente):Observable<Cliente>
  {
    return this.htpp.post<Cliente>(`${API_CONFIG.baseUrl}/cliente`,Cliente);
  }
  update(Cliente:Cliente):Observable<Cliente>
  {
    return this.htpp.put<Cliente>(`${API_CONFIG.baseUrl}/cliente/${Cliente.id}`,Cliente);
  }
  delete(Cliente:Cliente):Observable<Cliente>
  {
    return this.htpp.delete<Cliente>(`${API_CONFIG.baseUrl}/cliente/${Cliente.id}`);
  }
  findById(id:any):Observable<Cliente>
  {
    return this.htpp.get<Cliente>(`${API_CONFIG.baseUrl}/cliente/${id}`);
  }
}
