import { Pessoa } from "./aux/pessoa";

export interface Chamado{

    id?:any,
    dataAbertura?:string;
    dataFechamento?:string;
    prioridade?:string;
    status?:string;
    titulo?:string;
    descricao?:string;
    tecnico?:Pessoa;
    cliente?:Pessoa;

}