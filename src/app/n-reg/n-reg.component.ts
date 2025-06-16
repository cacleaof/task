import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DespesaService } from '../service/despesa.service';
import { FormsModule } from '@angular/forms';
import { Reg } from '../model/reg';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-n-reg',
   standalone: true,
  imports: [FormsModule, CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule,
        MatNativeDateModule],
  templateUrl: './n-reg.component.html',
  styleUrl: './n-reg.component.css'
})
export class NRegComponent {
  reg = {
    nome: '',
    descricao: '',
    valor: 0,
    CD: 'D',
    tipo: '',
    venc: new Date,
    imagem: '',
  };


  constructor(private despesaService: DespesaService){}

 addReg(): void {
    // Garantir que temos uma data válida e no formato correto
    const hoje = new Date();
    const dataVenc = this.reg.venc instanceof Date ? this.reg.venc : hoje;

    // Formatar a data manualmente para YYYY-MM-DD
    const ano = dataVenc.getFullYear();
    const mes = String(dataVenc.getMonth() + 1).padStart(2, '0');
    const dia = String(dataVenc.getDate()).padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia}`;

    const regData: Partial<Reg> = {
      nome: this.reg.nome.trim() || '',
      descricao: this.reg.descricao.trim() || '',
      valor: this.reg.valor.toString(),
      CD: this.reg.CD || 'D',
      tipo: this.reg.tipo.trim() || '',
      venc: dataFormatada, // Formato YYYY-MM-DD sem timezone
      imagem: this.reg.imagem.trim() || '',
    };

    // Log detalhado para debug
    console.log('Data original:', this.reg.venc);
    console.log('Data formatada:', dataFormatada);
    console.log('Dados completos para envio:', JSON.stringify(regData, null, 2));

    this.despesaService.addReg(regData)
      .subscribe({
        next: (response) => {
          console.log('Registro adicionado com sucesso!', response);
          // Reset form
          this.reg = {
            nome: '',
            descricao: '',
            valor: 0,
            CD: 'D',
            tipo: '',
            venc: new Date(),
            imagem: '',
          };
        },
        error: (error) => {
          console.error('Erro detalhado:', error);
          if (error.error) {
            console.error('Mensagem do servidor:', error.error);
          }
          // Log adicional para debug
          if (error.error && typeof error.error === 'object') {
            console.error('Erro detalhado do servidor:', JSON.stringify(error.error, null, 2));
          }
        }
      });
  }
}
