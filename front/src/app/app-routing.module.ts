import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-in/sign-up.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { FormUsuarioComponent } from './componentes/usuarios/form-usuario/form-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Graficas1Component },
      { path: 'user', component: UsuariosComponent },
      { path: 'usuarios/formUsuario', component: FormUsuarioComponent },
      { path: 'usuarios/formUsuario/:id', component: FormUsuarioComponent },
      /*       { path: '', redirectTo: '/usuarios/formUsuario', pathMatch: 'full' }, */
      { path: '', redirectTo: '/user', pathMatch: 'full' },

    ],
  },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: '**', component: NopagefoundComponent },
];
//search useHash
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
