import { NgModule } from '@angular/core';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarrComponent } from './sidebarr/sidebarr.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarrComponent,
    BreadcrumbsComponent,
    NopagefoundComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarrComponent,
    BreadcrumbsComponent,
    NopagefoundComponent,
  ],
})
export class SharedModule {}
