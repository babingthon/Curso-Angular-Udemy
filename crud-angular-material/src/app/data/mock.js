function gerarUUID() {
  return crypto.randomUUID();
}

const nomes = [
  "Ana",
  "Bruno",
  "Carlos",
  "Daniela",
  "Eduardo",
  "Fernanda",
  "Gustavo",
  "Helena",
  "Igor",
  "Juliana",
  "Kleber",
  "Larissa",
  "Marcos",
  "Natália",
  "Otávio",
  "Patrícia",
  "Rafael",
  "Simone",
  "Tiago",
  "Vanessa",
];

const sobrenomes = [
  "Silva",
  "Santos",
  "Oliveira",
  "Souza",
  "Lima",
  "Pereira",
  "Ferreira",
  "Almeida",
  "Costa",
  "Rodrigues",
  "Martins",
  "Barbosa",
  "Rocha",
  "Ramos",
  "Carvalho",
  "Gomes",
  "Teixeira",
  "Araújo",
  "Moura",
  "Nascimento",
];

function gerarNomeReal() {
  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  return { nome, sobrenome, completo: `${nome} ${sobrenome}` };
}

function gerarCPF() {
  const n = () => Math.floor(Math.random() * 10); // 0 a 9
  // Gera um CPF "cru" sem máscara
  return `${n()}${n()}${n()}${n()}${n()}${n()}${n()}${n()}${n()}${n()}${n()}`;
}

const dominios = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com"];

function gerarEmail(nome, sobrenome, index) {
  const base = `${nome.toLowerCase()}.${sobrenome.toLowerCase()}`;
  const dominio = dominios[Math.floor(Math.random() * dominios.length)];
  return `${base}${index}@${dominio}`;
}

function gerarDataNascimento() {
  const dia = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
  const mes = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const ano = Math.floor(Math.random() * 30) + 1970;
  return `${dia}/${mes}/${ano}`;
}

const clientes = [];

for (let i = 0; i < 50; i++) {
  const { nome, sobrenome, completo } = gerarNomeReal();

  clientes.push({
    id: gerarUUID(),
    nome: completo,
    cpf: gerarCPF(),
    email: gerarEmail(nome, sobrenome, i),
    dataNascimento: gerarDataNascimento(),
  });
}

localStorage.setItem("clientes", JSON.stringify(clientes));
