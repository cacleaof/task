import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjComponent } from './proj/proj.component';
import { TaskComponent } from './task/task.component';


const routes: Routes = [
  { path: 'projetos', component: ProjComponent },
  { path: 'tarefas', component: TaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
