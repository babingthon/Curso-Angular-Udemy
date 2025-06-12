import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button'; // Importing core module for Angular Material
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    CommonModule,
    MatPaginator,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss',
})

export class ConsultaComponent implements OnInit {

  nomeBusca: string = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ["id", "nome", "cpf", "dataNascimento", "email", "acoes"];
  dataSource = new MatTableDataSource<Cliente>([]);
  snackbar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ClienteService,
    private router: Router) {
    // Constructor logic if needed

  }

  ngOnInit() {
    const dados = JSON.parse(localStorage.getItem('clientes') || '[]');
    this.dataSource.data = dados;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  pesquisarCliente() {
    const resultado = this.service.pesquisarClientes(this.nomeBusca);

    this.dataSource.data = resultado;

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { id: id } });
  }

  preparaDeletar(Cliente: Cliente) {
    Cliente.deletando = true;
  }

  deletarCliente(cliente: Cliente) {
    this.service.deletarCliente(cliente);
    this.dataSource.data = this.service.pesquisarClientes('');
    this.paginator.firstPage();
    this.mostrarMensagem("Cliente deletado com sucesso!");
  }

  mostrarMensagem(mensagem: string) {
    this.snackbar.open(mensagem, 'OK', {
      duration: 3000
    });
  }
}
