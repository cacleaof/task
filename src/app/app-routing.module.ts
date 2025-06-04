import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjComponent } from './proj/proj.component';


const routes: Routes = [
  { path: 'projetos', component: ProjComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
