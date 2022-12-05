import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Chamado } from '../models/chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {


  constructor(private htpp:HttpClient) { }

  getStatus(status:any)
  {
    switch(status)
    {
      case 1:
        return 'ABERTO';
        case 2:
      return 'EM ANDAMENTO';
        case 3:
      return 'FECHADO';
    }
    return 'STATUS INVALIDO';
  }

  getPrioridade(prioridade:any)
  {
    switch(prioridade)
    {
      case 1:
        return 'BAIXA';
        case 2:
      return 'MEDIA';
        case 3:
      return 'ALTA';
    }
    return 'PRIORIDADE INVALIDO';
  }

  findAll():Observable<Chamado[]>{

    return this.htpp.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamado`);

  }
  create(Chamado:Chamado):Observable<Chamado>
  {
    return this.htpp.post<Chamado>(`${API_CONFIG.baseUrl}/chamado`,Chamado);
  }
  update(Chamado:Chamado):Observable<Chamado>
  {
    return this.htpp.put<Chamado>(`${API_CONFIG.baseUrl}/chamado/${Chamado.id}`,Chamado);
  }
  delete(Chamado:Chamado):Observable<Chamado>
  {
    return this.htpp.delete<Chamado>(`${API_CONFIG.baseUrl}/chamado/${Chamado.id}`);
  }
  findById(id:any):Observable<Chamado>
  {
    return this.htpp.get<Chamado>(`${API_CONFIG.baseUrl}/chamado/${id}`);
  }
}
