
let visor = document.getElementById('result');
let botoes = document.querySelectorAll('.button');
let operadores = document.getElementsByClassName('operador');
/* visor guarda o campo onde aparece o número ou conta que você está digitando (input com id "result").

botoes é uma lista com todos os botões que têm a classe "button" (todos os números e operadores).

operadores é uma lista só dos botões que têm a classe "operador" (os símbolos tipo +, -, *, /, %).

*/
botoes.forEach(botao => {
    botao.addEventListener('click', function () {
        let valor = this.textContent; // pega o EXATO botão que está sendo clicado e ouvido pelo 'escutador de eventos'
        if (valor === 'x') valor = '*';
        else if (valor === '÷') valor = '/';
        visor.value += valor;
        console.log(valor)
    })
});

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
        if ('0123456789.'.includes(caractere)) {
            numAtual += caractere;

        } else if (numAtual !== '') {// garantir que o último número da conta entre na lista, mesmo sem operador depois dele.
            let numero = parseFloat(numAtual);
            caracteresAtuais.push(numero) //coloca o número na lista nova
            caracteresAtuais.push(caractere); //coloca o operador na lista nova também
            numAtual = '';
        }
    }
    if (numAtual !== '') { //garante NOVAMENTE que o número entre na lista, para fazer a conta corretamente
        let numero = parseFloat(numAtual);
        caracteresAtuais.push(numero);
    } /* // dentro do for
else if (numAtual !== '') {
    // empurra número e operador
}

// fora do for (importante!)
if (numAtual !== '') {
    // empurra o último número, se existir
} */
    let i = 0;
    do {
        if (caracteresAtuais[i] == '/' || caracteresAtuais[i] == '*' || caracteresAtuais[i] == '%') {
            let num1 = caracteresAtuais[i - 1]; //número antes do operador
            let num2 = caracteresAtuais[i + 1]; //número depois do operador

            if (caracteresAtuais[i] == '/') {
                let resultadoDiv = num1 / num2;
                caracteresAtuais.splice(i - 1, 3, resultadoDiv) // parte do primeiro número da expressão e depois remove a operação e mostra o resultado
                i--;
                // Se fazemos uma operação e usamos splice para substituir 3 elementos por 1,
                // a lista diminui e os elementos se movem para frente.
                // Por isso usamos i-- para "voltar" o índice e não pular nenhum elemento novo
                // que entrou nessa posição após o splice.

            } else if (caracteresAtuais[i] == '*') {
                let resultadoMult = num1 * num2;
                caracteresAtuais.splice(i - 1, 3, resultadoMult)
                i--;
            } else if (caracteresAtuais[i] == '%') {
                let num1 = caracteresAtuais[i - 1];
                let num2 = caracteresAtuais[i + 1];
                let resultadoRest = num1 % num2.toFixed(5);
                caracteresAtuais.splice(i - 1, 3, resultadoRest)
                i--;

            }

        } else {
            // Caso contrário (quando não há operação a fazer nessa posição),
            // usamos i++ para avançar para o próximo elemento,
            // para não ficar preso no mesmo índice e causar loop infinito.
            i++;
        }
    } while (i < caracteresAtuais.length);
    //mesma coisa
    let j = 0;
    do {
        if (caracteresAtuais[j] == '+' || (caracteresAtuais[j] == '-')) {
            let num1 = caracteresAtuais[j - 1];
            let num2 = caracteresAtuais[j + 1];

            if (caracteresAtuais[j] == '-') {
                let resultadoSub = num1 - num2;
                caracteresAtuais.splice(j - 1, 3, resultadoSub)
                j--;
            } else if (caracteresAtuais[j] == '+') {
                let resultadoSum = num1 + num2;
                caracteresAtuais.splice(j - 1, 3, resultadoSum)
                j--;
            }
        } else {
            j++;
        }
    } while (j < caracteresAtuais.length);


    visor.value = caracteresAtuais[0]; //aparece o resultado no visor

}