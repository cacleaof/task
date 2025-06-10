import { Component } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Task } from '../model/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-n-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './n-task.component.html',
  styleUrls: ['./n-task.component.css']
})
export class NTaskComponent {
  task = {
    nome: '',
    descricao: '',
    seq: 0,
    adm: false,
    pai: 0
  };

  constructor(private taskService: TaskService) { }

  addTask(): void {
    const taskData: Partial<Task> = {
      ...this.task,
      adm: this.task.adm ? 1 : 0
    };
    this.taskService.addTask(taskData)
      .subscribe(response => {
        console.log('Task added successfully!', response);
        // Reset form
        this.task = {
          nome: '',
          descricao: '',
          seq: 0,
          adm: false,
          pai: 0
        };
      }, error => {
        console.error('Error adding task:', error);
      });
  }
}
