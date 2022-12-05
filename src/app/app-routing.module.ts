import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';

//IMPORTA PAGES
import { TecnicoListComponent } from './pages/tecnico-list/tecnico-list.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { TecnicoCreateComponent } from './pages/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './pages/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './pages/tecnico-delete/tecnico-delete.component';
import { ClienteListComponent } from './pages/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './pages/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './pages/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './pages/cliente-delete/cliente-delete.component';
import { ChamadoListComponent } from './pages/chamado/chamado-list/chamado-list.component';

const routes: Routes = [

  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    component: NavComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'tecnico',
        component:TecnicoListComponent
        
      },
      {
        path:'tecnico/create',
        component:TecnicoCreateComponent
      },
      {
        path:'tecnico/update/:id',
        component:TecnicoUpdateComponent
      },
      {
        path:'tecnico/delete/:id',
        component:TecnicoDeleteComponent
      },
      {
        path:'cliente',
        component:ClienteListComponent
        
      },
      {
        path:'cliente/create',
        component:ClienteCreateComponent
      },
      {
        path:'cliente/update/:id',
        component:ClienteUpdateComponent
      },
      {
        path:'cliente/delete/:id',
        component:ClienteDeleteComponent
      },
      {
        path:'chamado',
        component:ChamadoListComponent
      }
     
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
