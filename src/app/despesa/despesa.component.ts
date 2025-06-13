import { Component } from '@angular/core';
import { DespesaService } from '../service/despesa.service';
import { Reg } from '../model/reg';

@Component({
  selector: 'app-despesa',
  standalone: false,
  templateUrl: './despesa.component.html',
  styleUrl: './despesa.component.css'
})
export class DespesaComponent {
regs: Reg[] =[];
  dataInicial: string = '';
  dataFinal: string = '';

  constructor(private despesaService: DespesaService){}

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

ngOnInit(): void{
this.despesaService.getRegs().subscribe(data =>{
  this.regs = data;
})
}

getTotal(): number {
  return this.regs.reduce((total, reg) => total + Number(reg.valor), 0);
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
