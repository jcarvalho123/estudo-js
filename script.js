// Função para carregar gastos do localStorage
function carregarGastos() {
    const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
    gastos.forEach(gasto => adicionarGasto(gasto.valor, gasto.categoria, gasto.data));
    atualizarTotal();
}

// Função para salvar gastos no localStorage
function salvarGastos() {
    const linhas = document.querySelectorAll('#corpoTabela tr');
    const gastos = []; 
    
    linhas.forEach(linha => {
        const valor = parseFloat(linha.children[0].textContent.replace('R$ ', ''));
        const categoria = linha.children[1].textContent;
        const data = linha.children[2].textContent;

        gastos.push({ valor, categoria, data });
    });

    localStorage.setItem('gastos', JSON.stringify(gastos));
}

// Adicionar um novo gasto
function adicionarGasto(valor, categoria, data) {
    const corpoTabela = document.getElementById('corpoTabela');
    const novaLinha = document.createElement('tr');

    novaLinha.innerHTML = `
        <td>R$ ${valor.toFixed(2)}</td>
        <td>${categoria}</td>
        <td>${new Date(data).toLocaleDateString()}</td>
        <td><button onclick="removerGasto(this)">Remover</button></td>
    `;

    corpoTabela.appendChild(novaLinha);
    salvarGastos(); // Salva os gastos no localStorage após adicionar
    atualizarTotal();
}

// Remover um gasto
function removerGasto(botao) {
    const linha = botao.closest('tr');
    linha.remove();
    salvarGastos(); // Salva os gastos no localStorage após remover
    atualizarTotal();
}

// Atualizar o total de gastos
function atualizarTotal() {
    const linhas = document.querySelectorAll('#corpoTabela tr');
    let total = 0;

    linhas.forEach(linha => {
        const valor = parseFloat(linha.children[0].textContent.replace('R$ ', ''));
        total += valor;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

// Event Listener para o formulário
document.getElementById('gastoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const valor = parseFloat(document.getElementById('valor').value);
    const categoria = document.getElementById('categoria').value;
    const data = document.getElementById('data').value;

    if (valor && categoria && data) {
        adicionarGasto(valor, categoria, data);
        document.getElementById('gastoForm').reset();
    }
});

// Carregar gastos ao iniciar a página
window.onload = carregarGastos;