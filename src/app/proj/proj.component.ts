import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProjService } from '../service/proj.service';
import { Proj } from '../model/proj';

@Component({
  selector: 'app-proj',
  standalone: false,
  templateUrl: './proj.component.html',
  styleUrl: './proj.component.css'
})
export class ProjComponent implements OnInit {

  projetos: Proj[] = [];

  constructor(private projService: ProjService ) {
  }

  ngOnInit(): void {
    this.projService.getProjetos().subscribe(data => {
      this.projetos = data;
    });
  }

}
