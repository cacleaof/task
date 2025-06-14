import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesaService } from '../service/despesa.service';
import { FormsModule } from '@angular/forms';
import { Reg } from '../model/reg';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-reg',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule],
  templateUrl: './edit-reg.component.html',
  styleUrl: './edit-reg.component.css'
})
export class EditRegComponent implements OnInit {
  reg = {
    id: '',
    nome: '',
    descricao: '',
    valor: 0,
    CD: 'D',
    tipo: '',
    venc: new Date(),
    imagem: '',
  };

  constructor(
    private despesaService: DespesaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Tentar recuperar o registro do localStorage primeiro
    const registroSalvo = localStorage.getItem('registroParaEdicao');
    if (registroSalvo) {
      try {
        const regToEdit = JSON.parse(registroSalvo);
        console.log('Registro recuperado do localStorage:', regToEdit);

        this.reg = {
          id: regToEdit.id,
          nome: regToEdit.nome,
          descricao: regToEdit.descricao,
          valor: typeof regToEdit.valor === 'string' ? Number(regToEdit.valor) : regToEdit.valor,
          CD: regToEdit.CD,
          tipo: regToEdit.tipo,
          venc: regToEdit.venc instanceof Date ? regToEdit.venc : new Date(regToEdit.venc),
          imagem: regToEdit.imagem || ''
        };
        console.log('Dados carregados no formulário:', this.reg);

        // Limpar o localStorage após carregar os dados
        localStorage.removeItem('registroParaEdicao');
      } catch (error) {
        console.error('Erro ao processar registro do localStorage:', error);
        this.router.navigate(['/registros']);
      }
    } else {
      // Se não encontrar no localStorage, tentar carregar da API
      const id = this.route.snapshot.paramMap.get('id');
      console.log('ID do registro para edição:', id);

      if (id) {
        this.despesaService.getRegs().subscribe({
          next: (regs) => {
            console.log('Todos os registros:', regs);
            const regToEdit = regs.find(r => {
              console.log('Comparando:', r.id, 'com', id);
              return r.id === id;
            });
            console.log('Registro encontrado:', regToEdit);

            if (regToEdit) {
              this.reg = {
                id: regToEdit.id,
                nome: regToEdit.nome,
                descricao: regToEdit.descricao,
                valor: typeof regToEdit.valor === 'string' ? Number(regToEdit.valor) : regToEdit.valor,
                CD: regToEdit.CD,
                tipo: regToEdit.tipo,
                venc: regToEdit.venc instanceof Date ? regToEdit.venc : new Date(regToEdit.venc),
                imagem: regToEdit.imagem || ''
              };
              console.log('Dados carregados no formulário:', this.reg);
            } else {
              console.error('Registro não encontrado para o ID:', id);
              this.router.navigate(['/registros']);
            }
          },
          error: (error) => {
            console.error('Erro ao carregar registro:', error);
            this.router.navigate(['/registros']);
          }
        });
      } else {
        console.error('ID não fornecido na URL');
        this.router.navigate(['/registros']);
      }
    }
  }

  updReg(): void {
    console.log('Iniciando atualização do registro...');

    // Garantir que temos uma data válida e no formato correto
    const hoje = new Date();
    const dataVenc = this.reg.venc instanceof Date ? this.reg.venc : hoje;

    // Formatar a data manualmente para YYYY-MM-DD
    const ano = dataVenc.getFullYear();
    const mes = String(dataVenc.getMonth() + 1).padStart(2, '0');
    const dia = String(dataVenc.getDate()).padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia}`;

    const regData: Partial<Reg> = {
      id: String(this.reg.id),
      nome: String(this.reg.nome).trim(),
      descricao: String(this.reg.descricao).trim(),
      valor: this.reg.valor.toString(),
      CD: String(this.reg.CD),
      tipo: String(this.reg.tipo).trim(),
      venc: dataFormatada,
      imagem: String(this.reg.imagem).trim()
    };

    console.log('Dados para atualização:', JSON.stringify(regData, null, 2));

    if (!regData.id) {
      console.error('ID do registro não encontrado');
      return;
    }

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
