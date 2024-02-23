/*
Projeto criado no curso de lógica de programação da Alura.
*/
document.getElementById('chutar').removeAttribute('disabled');

let listaNumerosGerados = [];
let limiteNumerosGerar = 5;

function geraNumero(){
   let numeroGerado = parseInt(Math.random() * limiteNumerosGerar + 1);
   let qtdElementosLista = listaNumerosGerados.length;
   if (qtdElementosLista == limiteNumerosGerar){
    listaNumerosGerados = [];
   }
   if (listaNumerosGerados.includes(numeroGerado)){
        return geraNumero();
   } else {
        listaNumerosGerados.push(numeroGerado);
        return numeroGerado;
   }
}

let numeroSecreto = geraNumero();
let tentativas = 1;

function exibirTexto(tag, texto){
    let titulo = document.querySelector(tag);
    titulo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilial Portuguese Female', {rate:1.2})
}

function MensagemInicial(){
    exibirTexto('h1', 'Jogo do Número Secreto.');
    exibirTexto('p', `Escolha um número entre 1 e ${limiteNumerosGerar}`);
}

MensagemInicial()

function limparcampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        exibirTexto('h1','Acertou!');
        let palavraTentativa = numeroSecreto > 1 ? 'tentativas' : 'tentativa';
        let mensagemAcerto = `Você descobriu o número secreto que era ${numeroSecreto} em ${tentativas} ${palavraTentativa}!`
        exibirTexto('p',mensagemAcerto);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled',true);
    } else {
        if (chute > numeroSecreto){
            exibirTexto('h1','Errou!');
            exibirTexto('p',`O número secreto é menor que ${chute}!`);
        } else {
            exibirTexto('h1','Errou!');
            exibirTexto('p',`O número secreto é maior que ${chute}!`);
        }
        tentativas++;
        limparcampo();
    }
}

function reiniciarJogo(){
    numeroSecreto = geraNumero();
    limparcampo();
    tentativas = 1;
    MensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
  
}
