// Definindo as quantidades de notas e moedas disponíveis no caixa
const disponivel = {
    100: 5,
    50: 10,
    20: 20,
    10: 30,
    5: 50,
    2: 100,
    1: 200,
    0.5: 100,
    0.25: 200,
    0.1: 300,
    0.05: 500
};

// Função para calcular o troco
function calcularTroco() {
    let valorCompra = parseFloat(document.getElementById("valorCompra").value);
    let valorPago = parseFloat(document.getElementById("valorPago").value);
    let troco = valorPago - valorCompra;
    let trocoFinal = {};

    document.getElementById('troco_card').style.display = '';
    const trocoDiv = document.getElementById('troco');
    trocoDiv.innerHTML = ''; // Limpar o conteúdo existente

    if (troco < 0) {
        const notaMoedaDiv = document.createElement('div');
        notaMoedaDiv.classList.add('alert', 'alert-danger');
        notaMoedaDiv.textContent = 'O valor pago é insuficiente.';
        trocoDiv.appendChild(notaMoedaDiv);
        return;
    } else if(troco == 0){
        const notaMoedaDiv = document.createElement('div');
        notaMoedaDiv.classList.add('alert', 'alert-danger');
        notaMoedaDiv.textContent = 'Não há troco a ser devolvido.';
        trocoDiv.appendChild(notaMoedaDiv);
        return;
    }

    Object.keys(disponivel).sort((a, b) => b - a).forEach((valorNotaMoeda) => {
        const quantidadeNotaMoeda = Math.floor(troco / valorNotaMoeda);

        if (quantidadeNotaMoeda > 0 && disponivel[valorNotaMoeda] > 0) {
            const quantidadeDisponivel = Math.min(quantidadeNotaMoeda, disponivel[valorNotaMoeda]);
            trocoFinal[valorNotaMoeda] = quantidadeDisponivel;
            troco -= valorNotaMoeda * quantidadeDisponivel;
            disponivel[valorNotaMoeda] -= quantidadeDisponivel;
        }
    });

    Object.keys(trocoFinal).forEach((notaMoeda) => {
        const quantidade = trocoFinal[notaMoeda];
        const notaMoedaDiv = document.createElement('span');
        notaMoedaDiv.textContent = `Nota/Moeda: ${notaMoeda} - Quantidade: ${quantidade}`;
        trocoDiv.appendChild(notaMoedaDiv);
    });
}