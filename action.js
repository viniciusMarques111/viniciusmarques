let pinCorreto;
let tentativasRestantes = 3;

function exibirTextoNaTela(tag, texto) {
  let campo = document.getElementById(tag);
  campo.innerHTML = texto;
}

function exibirMensagemInicial() {
  exibirTextoNaTela('message', 'Digite um número de pelo menos quatro dígitos');
  exibirTentativasRestantes();
}

exibirMensagemInicial();

function verificarPin() {
  let pin = parseInt(document.getElementById('userPin').value);

  if (!pinCorreto) {
    pinCorreto = gerarPinAleatorio();
  }

  if (pin === pinCorreto) {
    exibirTextoNaTela('message', 'Parabéns! Você acertou o PIN!');
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    let dica = pin < pinCorreto ? 'maior' : 'menor';
    let diferenca = Math.abs(pin - pinCorreto);
    let descricaoDiferenca = diferenca > 10 ? 'muito ' : '';
    exibirTextoNaTela('message', `O próximo valor deve ser ${descricaoDiferenca}${dica} que o informado.`);
    tentativasRestantes--;
    exibirTentativasRestantes();
    limparCampo();
  }

  if (tentativasRestantes === 0) {
    exibirTextoNaTela('message', 'Você excedeu o limite de tentativas. Tente novamente mais tarde.');
    document.getElementById('userPin').disabled = true;
    document.getElementById('reiniciar').removeAttribute('disabled');
  }
}

function gerarPinAleatorio() {
  return Math.floor(Math.random() * 9000) + 1000; // Entre 1000 e 9999
}

function limparCampo() {
  document.getElementById('userPin').value = '';
}

function reiniciarJogo() {
  pinCorreto = gerarPinAleatorio();
  limparCampo();
  tentativasRestantes = 3;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', 'true');
  document.getElementById('userPin').disabled = false;
}

function exibirTentativasRestantes() {
  exibirTextoNaTela('tentativas', `Tentativas restantes: ${tentativasRestantes}`);
}

