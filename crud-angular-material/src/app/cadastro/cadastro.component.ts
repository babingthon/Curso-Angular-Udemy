import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Municipio, Estado } from '../models/brasilapi.models';
import { BrasilApiService } from '../service/brasil-api.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    MatSelectModule,
    CommonModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  atualizando: boolean = false;
  cliente: Cliente = Cliente.newCliente();
  snackbar = inject(MatSnackBar);
  estados: Estado[] = [];
  cidades: Municipio[] = [];

  constructor(
    private service: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private brasilApiService: BrasilApiService
  ) {

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id'];
      if (id) {
        let clienteEncontrado = this.service.buscarClientePorId(id);
        if (clienteEncontrado) {
          this.atualizando = true;
          this.cliente = clienteEncontrado;
        }
        if (this.cliente.uf) {
          const event = { value: this.cliente.uf }
          this.carregarMunicipios(event as MatSelectChange);
        }
      }
    });

    this.carregarUFs();
  }

  carregarUFs() {
    this.brasilApiService.listarUFs().subscribe({
      next: listaEstados => {
        this.estados = listaEstados.sort((a, b) => a.nome.localeCompare(b.nome));
      },
      error: erro => console.log("ocorreu um erro: ", erro)
    })
  }

  carregarMunicipios(event: MatSelectChange) {
    const ufSelecionada = event.value;
    this.brasilApiService.listarMunicipios(ufSelecionada).subscribe({
      next: listaMunicipios => this.cidades = listaMunicipios,
      error: erro => console.log('ocorreu um erro: ', erro)
    })
  }


  salvarCliente() {
    if (!this.atualizando) {
      this.service.salvarCliente(this.cliente);
      this.mostrarMensagem("Cliente salvo com sucesso!");
      this.cliente = Cliente.newCliente();
    } else {
      this.service.atualizarCliente(this.cliente);
      this.mostrarMensagem("Cliente atualizado com sucesso!");
      this.router.navigate(['/consulta']);
    }

  }

  mostrarMensagem(mensagem: string) {
    this.snackbar.open(mensagem, 'OK', {
      duration: 3000
    });
  }
}
