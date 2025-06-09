import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Task } from '../model/task';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
tasks: Task[] = [];

constructor (private taskService: TaskService){}

ngOnInit(): void{ this.taskService.getTasks().subscribe(datat =>{
  this.tasks = datat;
  console.log('dados'+datat);
});
}
}
