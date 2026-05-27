// script.js

function calcularEconomia(){

  const consumo = Number(document.getElementById("consumo").value);
  const conta = Number(document.getElementById("conta").value);
  const placas = Number(document.getElementById("placas").value);

  if(consumo <= 0 || conta <= 0 || placas <= 0){
    alert("Preencha todos os campos corretamente!");
    return;
  }

  // estimativa média:
  // cada placa gera cerca de 50 kWh/mês

  const geracao = placas * 50;

  let economiaPercentual = (geracao / consumo) * 100;

  if(economiaPercentual > 95){
    economiaPercentual = 95;
  }

  const economiaReais = (conta * economiaPercentual) / 100;

  const novaConta = conta - economiaReais;

  document.getElementById("resultado").innerHTML = `
    <h3>Resultado da Simulação</h3>

    <p><strong>Energia gerada:</strong> ${geracao.toFixed(0)} kWh/mês</p>

    <p><strong>Economia estimada:</strong> ${economiaPercentual.toFixed(1)}%</p>

    <p><strong>Economia mensal:</strong> R$ ${economiaReais.toFixed(2)}</p>

    <p><strong>Nova conta estimada:</strong> R$ ${novaConta.toFixed(2)}</p>
  `;
}