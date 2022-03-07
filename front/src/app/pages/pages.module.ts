import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from '../shared/header/header.component';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarrComponent } from '../shared/sidebarr/sidebarr.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';

import { ProgressComponent } from './progress/progress.component';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from '../componentes/incrementador/incrementador.component';
import { NgChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../componentes/grafico-dona/grafico-dona.component';
import { FormUsuarioComponent } from '../componentes/usuarios/form-usuario/form-usuario.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    FormUsuarioComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    GraficoDonaComponent,
    FormUsuarioComponent
  ],
  imports: [SharedModule, PAGES_ROUTES, FormsModule, NgChartsModule,CommonModule],
})
export class PagesModule {}
