import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Task } from '../model/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
tasks: Task[] = [];

constructor (private taskService: TaskService, private router: Router){}

  deletar(task: Task) {
    if (task.id) {
      this.taskService.delTask(task.id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(r => r.id !== task.id);
        },
        error: (err) => {
          console.error('Erro ao deletar:', err);
        }
      });
    }
  }

ngOnInit(): void{ this.taskService.getTasks().subscribe(datat =>{
  this.tasks = datat;
  console.log('dados'+datat);
});
}
  editar(task: Task) {
    console.log('Registro selecionado para edição:', task);
    if (task.id) {
      console.log('Navegando para edição do registro ID:', task.id);
      // Armazenar o registro no localStorage antes de navegar
      localStorage.setItem('registroParaEdicao', JSON.stringify(task));
      this.router.navigate(['/edit', task.id]);
    } else {
      console.error('Registro não possui ID:', task);
    }
  }
}
