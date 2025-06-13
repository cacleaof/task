import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjComponent } from './proj/proj.component';
import { TaskComponent } from './task/task.component';
import { ProjFormComponent } from './proj-form/proj-form.component';
import { DespesaComponent } from './despesa/despesa.component';
import { NTaskComponent } from './n-task/n-task.component';
import { NRegComponent } from './n-reg/n-reg.component';
import { EditRegComponent } from './edit-reg/edit-reg.component';


const routes: Routes = [
  { path: 'projetos', component: ProjComponent },
  { path: 'registros', component: DespesaComponent },
  { path: 'tarefas', component: TaskComponent},
  { path: 'nproj', component: ProjFormComponent},
  { path: 'ntask', component: NTaskComponent},
  { path: 'nreg', component: NRegComponent},
  { path: 'edit/:id', component: EditRegComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
