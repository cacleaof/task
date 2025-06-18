import { Component, OnInit } from '@angular/core';
import { DespesaService } from '../service/despesa.service';
//import { Reg } from '../model/reg';
import { Router } from '@angular/router';

export interface Reg {
 id: string;
 nome: string;
 descricao: string;
 valor: string | number;
 CD: string;
 tipo: string;
 venc: string | Date;
 imagem: string;
 pago: boolean;
 codbar: string;
 pix: string;
}

@Component({
  selector: 'app-conta',
  standalone: false,
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.css'
})
export class ContaComponent implements OnInit {
  regs: Reg[] = [];

    get regsNaoPagos(): Reg[] {
    return this.regs.filter(r => !r.pago);   // mesmo que r.pago === false
  }
  get pagos(): Reg[] {
    return this.regs.filter(reg => reg.pago === true);
    }

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
    reg = {
    nome: '',
    descricao: '',
    valor: 0,
    CD: 'D',
    tipo: '',
    venc: new Date,
    imagem: '',
    pix: '',
    codbar: '',
    pago: true
  };

  pagRegistro(reg: Reg): void {

     const regData: Partial<Reg> = {
      id: reg.id,
      pago: !this.reg.pago || true
    };
 this.despesaService.updReg(regData)
      .subscribe({
        next: (response) => {
          console.log('Registro atualizado com sucesso!', response);
          alert('Registro atualizado com sucesso!');
          // Navegar de volta para a lista após a atualização
          this.router.navigate(['/registros']);
        },
        error: (error) => {
          console.error('Erro ao atualizar registro:', error);
          if (error.error) {
            console.error('Mensagem do servidor:', error.error);
            alert('Erro ao atualizar registro: ' + (error.error.message || 'Erro desconhecido'));
          }
        }
      });
    }
}
