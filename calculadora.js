
let visor = document.getElementById('result');
let botoes = document.getElementsByClassName('button');
let operadores = document.getElementsByClassName('operador');
/* visor guarda o campo onde aparece o número ou conta que você está digitando (input com id "result").

botoes é uma lista com todos os botões que têm a classe "button" (todos os números e operadores).

operadores é uma lista só dos botões que têm a classe "operador" (os símbolos tipo +, -, *, /, %).

*/

for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener('click', function () {
        visor.value += this.textContent; // pega o EXATO botão que está sendo clicado e ouvido pelo 'escutador de eventos'
    })
}
function apaga() {
    visor.value = visor.value.slice(0, -1) // O método .slice(0, -1) pega a string do visor desde o início até o penúltimo caractere e exclui o último.
}

function apagatudo() {
    visor.value = ' ';
}
document.getElementById('equal').addEventListener('click', calcula);
function calcula() {
    let caracteresAtuais = []
    let conta = visor.value;
    let caracteres = conta.split(''); /*Por que usar aspas em split('')?
O método .split() sempre espera uma string como argumento que diz onde cortar.

Quando você passa '' (string vazia), significa:

"quebre a string em cada caractere individual" E se você usar split() sem aspas?
split() sem argumento é como se você dissesse:

"quebre a string no separador undefined"*/
    let numAtual = '';
    for (let i = 0; i < caracteres.length; i++) {

        let caractere = caracteres[i];
        if ('0123456789'.includes(caractere)) {
            numAtual += caractere;

        } else if (numAtual !== '') {// garantir que o último número da conta entre na lista, mesmo sem operador depois dele.
            caracteresAtuais.push(numero) //coloca o número na lista nova
            caracteresAtuais.push(caractere); //coloca o operador na lista nova também
            numAtual = '';
        }

    }
}