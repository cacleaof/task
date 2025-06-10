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

  constructor(private despesaService: DespesaService){}

ngOnInit(): void{
this.despesaService.getRegs().subscribe(data =>{
  this.regs = data;
})
}
}
