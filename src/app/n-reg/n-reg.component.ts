import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DespesaService } from '../service/despesa.service';
import { FormsModule } from '@angular/forms';
import { Reg } from '../model/reg';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-n-reg',
   standalone: true,
  imports: [FormsModule, CommonModule, MatDatepickerModule,
        MatInputModule,
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
  };


  constructor(private despesaService: DespesaService){}

 addReg(): void {
    const regData: Partial<Reg> = {
      ...this.reg,
    };
    this.despesaService.addReg(regData)
      .subscribe(response => {
        console.log('Task added successfully!', response);
        // Reset form
        this.reg = {
          nome: '',
          descricao: '',
          valor: 0,
          CD: 'D',
          tipo: '',
          venc: new Date,
        };
      }, error => {
        console.error('Error adding reg:', error);
      });
  }
}
