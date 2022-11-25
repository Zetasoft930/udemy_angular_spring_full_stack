import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';

//IMPORTA PAGES
import { TecnicoListComponent } from './pages/tecnico-list/tecnico-list.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth/auth.guard';
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
        path:'tecnico-list',
        component:TecnicoListComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
