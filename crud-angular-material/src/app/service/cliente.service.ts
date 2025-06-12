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

    if (!nomeBusca) {
      return clientes.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    return clientes.filter(cliente => cliente.nome?.toLowerCase().indexOf(nomeBusca.toLowerCase()) !== -1);
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

  buscarClientePorId(id: string): Cliente | undefined {
    const clientes = this.obterStorage();
    return clientes.find(cliente => cliente.id === id);
  }

  atualizarCliente(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.forEach(c => {
      if (c.id === cliente.id) {
        Object.assign(c, cliente);
      }
    })

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  deletarCliente(cliente: Cliente) {
    const storage = this.obterStorage();
    const index = storage.findIndex(c => c.id === cliente.id);

    if (index !== -1) {
      storage.splice(index, 1);
      localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
    }
  }
}
