import { Component, EventEmitter, Output } from '@angular/core';
import { ProjService } from '../service/proj.service';
import { Proj } from '../model/proj';

interface NewProj {
  id: number;
  nome: string;
  descricao: string;
  seq: number;
  adm: number;
  pai: number;
}

@Component({
  selector: 'app-proj-form',
  standalone: false,
  templateUrl: './proj-form.component.html',
  styleUrl: './proj-form.component.css'
})
export class ProjFormComponent {
  novoProjetoNome: string = '';
  novoProjetoDesc: string = '';

  @Output() projetoAdicionado = new EventEmitter<void>();

  constructor(private projService: ProjService) {}

  onSubmit(): void {
    if (this.novoProjetoNome.trim()) {
      this.projService.addProjeto({ nome: this.novoProjetoNome.trim(), descricao: this.novoProjetoDesc.trim() })
        .subscribe({
          next: (novoProj) => {
            console.log('Projeto adicionado:', novoProj);
            this.novoProjetoNome = '';
            this.projetoAdicionado.emit();
          },
          error: (err) => console.error('Erro ao adicionar projeto:', err)
        });
    } else {
      console.warn('O nome do projeto não pode estar vazio.');
    }
  }

}
