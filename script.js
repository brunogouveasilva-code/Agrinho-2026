// script.js

let grafico;

function calcular(){

  const consumo = Number(document.getElementById("consumo").value);
  const conta = Number(document.getElementById("conta").value);
  const placas = Number(document.getElementById("placas").value);
  const potencia = Number(document.getElementById("potencia").value);
  const custoSistema = Number(document.getElementById("custoSistema").value);
  const tarifa = Number(document.getElementById("tarifa").value);

  if(
    consumo <= 0 ||
    conta <= 0 ||
    placas <= 0 ||
    potencia <= 0 ||
    custoSistema <= 0 ||
    tarifa <= 0
  ){
    alert("Preencha todos os campos corretamente.");
    return;
  }

  // Cálculos

  // média de 5h solares por dia
  const geracaoMensal =
    ((placas * potencia) * 5 * 30) / 1000;

  let autonomia = (geracaoMensal / consumo) * 100;

  if(autonomia > 100){
    autonomia = 100;
  }

  const economiaMensal =
    geracaoMensal * tarifa;

  const economiaReal =
    economiaMensal > conta
    ? conta
    : economiaMensal;

  const economiaAnual =
    economiaReal * 12;

  const payback =
    custoSistema / economiaAnual;

  // estimativa ambiental
  const co2 =
    geracaoMensal * 0.084;

  // resultados

  document.getElementById("resultado")
  .classList.remove("oculto");

  document.getElementById("geracaoMensal")
  .innerHTML =
    `${geracaoMensal.toFixed(0)} kWh`;

  document.getElementById("economiaMensal")
  .innerHTML =
    `R$ ${economiaReal.toFixed(2)}`;

  document.getElementById("economiaAnual")
  .innerHTML =
    `R$ ${economiaAnual.toFixed(2)}`;

  document.getElementById("payback")
  .innerHTML =
    `${payback.toFixed(1)} anos`;

  document.getElementById("co2")
  .innerHTML =
    `${co2.toFixed(1)} kg/mês`;

  document.getElementById("autonomia")
  .innerHTML =
    `${autonomia.toFixed(1)}%`;

  gerarGrafico(economiaReal);

}

function gerarGrafico(economiaMensal){

  const anos = [
    "1 Ano",
    "2 Anos",
    "3 Anos",
    "4 Anos",
    "5 Anos"
  ];

  const valores = [
    economiaMensal * 12,
    economiaMensal * 24,
    economiaMensal * 36,
    economiaMensal * 48,
    economiaMensal * 60
  ];

  const ctx =
    document.getElementById("graficoEconomia");

  if(grafico){
    grafico.destroy();
  }

  grafico = new Chart(ctx, {

    type:'line',

    data:{
      labels:anos,

      datasets:[{
        label:'Economia Acumulada (R$)',
        data:valores,
        borderWidth:4,
        borderColor:'#ff9800',
        backgroundColor:'rgba(255,152,0,0.2)',
        fill:true,
        tension:0.4
      }]
    },

    options:{
      responsive:true,

      plugins:{
        legend:{
          labels:{
            color:'#333',
            font:{
              size:14
            }
          }
        }
      },

      scales:{
        y:{
          ticks:{
            color:'#333'
          }
        },

        x:{
          ticks:{
            color:'#333'
          }
        }
      }
    }

  });

}