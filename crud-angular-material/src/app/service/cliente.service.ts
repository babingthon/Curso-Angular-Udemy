import { Injectable } from '@angular/core';
import { Cliente } from '../cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = 'clientes';

  constructor() { }

  salvarCliente(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  pesquisarClientes(nomeBusca: string): Cliente[] {
    const clientes = this.obterStorage();
    return clientes;
  }

  private obterStorage(): Cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if (repositorioClientes) {
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }
}
