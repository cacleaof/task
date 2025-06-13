import { Component, OnInit } from '@angular/core';
import { DespesaService } from '../service/despesa.service';
import { Reg } from '../model/reg';
import { Router } from '@angular/router';

@Component({
  selector: 'app-despesa',
  standalone: false,
  templateUrl: './despesa.component.html',
  styleUrl: './despesa.component.css'
})
export class DespesaComponent implements OnInit {
  regs: Reg[] = [];
  dataInicial: string = '';
  dataFinal: string = '';

  constructor(
    private despesaService: DespesaService,
    private router: Router
  ) {}

  deletar(reg: Reg) {
    if (reg.id) {
      this.despesaService.delReg(reg.id).subscribe({
        next: () => {
          this.regs = this.regs.filter(r => r.id !== reg.id);
        },
        error: (err) => {
          console.error('Erro ao deletar:', err);
        }
      });
    }
  }

  ngOnInit(): void {
    this.carregarRegistros();
  }

  carregarRegistros() {
    this.despesaService.getRegs().subscribe({
      next: (data) => {
        console.log('Registros carregados:', data);
        this.regs = data;
      },
      error: (error) => {
        console.error('Erro ao carregar registros:', error);
      }
    });
  }

  getTotal(): number {
    return this.regs.reduce((total, reg) => total + Number(reg.valor), 0);
  }

  editar(reg: Reg) {
    console.log('Registro selecionado para edição:', reg);
    if (reg.id) {
      console.log('Navegando para edição do registro ID:', reg.id);
      // Armazenar o registro no localStorage antes de navegar
      localStorage.setItem('registroParaEdicao', JSON.stringify(reg));
      this.router.navigate(['/edit', reg.id]);
    } else {
      console.error('Registro não possui ID:', reg);
    }
  }

  filtrarPorData() {
    if (this.dataInicial && this.dataFinal) {
      this.regs = this.regs.filter(reg => {
        const venc = new Date(reg.venc);
        return venc >= new Date(this.dataInicial) && venc <= new Date(this.dataFinal);
      });
    }
  }
}
