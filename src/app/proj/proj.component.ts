import { Component } from '@angular/core';
import Proj_json from '../../json-server/projetos.json'

interface Proj {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-proj',
  standalone: false,
  templateUrl: './proj.component.html',
  styleUrl: './proj.component.css'
})
export class ProjComponent {
projetos: Proj[] = Proj_json;
}
