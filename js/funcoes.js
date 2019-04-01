//variaveis de inputs
var Quant1, Quant2, preco1, preco2,var_custovariavel, var_custofixo, var_preco_venda;

//variaveis de armazenamento
var var_a = 0;
var var_b = 0;
var var_c = 0;
var var_h1 = 0;
var var_h2 = 0;
var raiz1 = 0;
var raiz2 = 0;

//variaveis  de formulas
var formula_demanda = "";
var formula_receita ="";
var formula_receita_feita = "";
var formula_demanda_feita = "";
var formula_lucro = "";

//funções de calculo
function pontoMedioX(var_a, var_b){
	let ponto = (var_b*-1)/(2*var_a);
	return ponto;
}
function pontoMedioY(delta, var_a){

	let ponto = (delta*-1)/(4*var_a);
	return ponto;
}

function bhaskara(var_a, var_b, delta){
	let b = var_b*-1;
	let delt = Math.sqrt(delta);
	let a = 2*var_a;
	raiz1 = (b + delt)/a;
	raiz2 = (b - delt)/a;;
}
function delta(var_a, var_b, var_c){
	let delta = Math.pow(var_b, 2)-(4*var_a*var_c)
	
	return parseInt(delta);

}
function verificaDelta(var_delta){
	if (var_delta == 0){
		return 0;
	}else{
		return Math.sign(var_delta);
	}

}
function verificaA(var_a){

	return Math.sign(var_a);

}

function lucro(var_H1, var_H2, var_custovariavel,var_custofixo){

	let c1 = (var_custovariavel*-1)*var_H1;
	let c2 = (var_custovariavel*-1)*var_H2;

	var_a = var_H1; 
	var_b = var_H2 + c1;
	var_c = parseInt(c2) + var_custofixo*-1;

}

function yoyomixoxo(preco1, preco2, quantidade1, quantidade2){

	let c1 = quantidade2 - quantidade1;
	let c2 = preco2 - preco1;
	let c3 = c1*(preco1*-1);
	let c4 = c2*(quantidade1*-1);
	let c5 =  (c3*-1)+c4;
	let var1 = c2/c1;
	let var2 = c5/c1;

	var_h1 = var1;
	var_h2 = var2;

}
function demanda(var1, var2, preco){

	let multi = var1 * preco;
	let soma = multi + var2;
	
	return soma;
}
function receita(var1, var2, preco){

	let quadrado  = Math.pow(preco, 2);
	let multi = var1*quadrado;
	let multiDois = var2*preco;
	let soma = multi + multiDois;

	return soma;
}

//funções que geram o gráfico
function graficoDeltaPositivo(pontoUm, pontoMedio, PontoYMedio, pontoDois){

	let divGrafico = document.getElementById("grafico");

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
        ['x'                  ,'lucro'              ],
        [pontoUm.toString()   ,0                    ],
        [pontoMedio.toString(),parseInt(PontoYMedio)],
        [pontoDois.toString() ,0                    ]
        ]);

        var options = {
                title: 'Custos em função da Receita',
                curveType: 'function',
                legend: { position: 'bottom' },
                width: 900,
                height: 500
            };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

		chart.draw(data, options);
		divGrafico.classList.remove("amostra");
		divGrafico.classList.add("mostrar-raiz");
    }
}
function graficoDeltaZerado(raiz, var_c){
	let divGrafico = document.getElementById("grafico");

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
        ['x'                  ,'lucro'              ],
        [var_c.toString()     ,parseInt(var_c)      ],
        [raiz                 ,0                    ],
        [0                    ,parseInt(var_c)      ]
        ]);

        var options = {
                title: 'Custos em função da Receita',
                curveType: 'function',
                legend: { position: 'bottom' },
                width: 900,
                height: 500
            };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

		chart.draw(data, options);
		divGrafico.classList.remove("amostra");
		divGrafico.classList.add("mostrar-raiz");
    }
}

//ações do botão
document.getElementById("button_abraao").onclick = function(){

	Quant1 = document.getElementById("input_1").value;
	Quant2 = document.getElementById("input_2").value;
	preco1 = document.getElementById("input_1_1").value;
	preco2 = document.getElementById("input_1_2").value;

	yoyomixoxo(preco1, preco2, Quant1, Quant2);

	formula_demanda = var_h1 +"PV + "+var_h2;
	formula_receita = var_h1 +"PV² + "+var_h2+"PV";
	document.getElementById('form_demanda').innerHTML = formula_demanda;
	document.getElementById('form_receita').innerHTML = formula_receita;

	mostrarSession('#page2', '#page1', '#page3');

};

document.getElementById("button_henrique").onclick = function(){

	var_preco_venda =  document.getElementById("preco_venda").value;

	let result_demanda = demanda(var_h1, var_h2, var_preco_venda);
	let result_receita = receita(var_h1, var_h2, var_preco_venda);

	formula_demanda_feita = var_h1 +"PV + "+var_h2+" = "+result_demanda;
	formula_receita_feita = var_h1 +"PV² + "+var_h2+"PV"+" = "+result_receita;

	document.getElementById('form_demanda').innerHTML = formula_demanda_feita;
	document.getElementById('form_receita').innerHTML = formula_receita_feita;
	document.getElementById('abrir-1').classList.remove("d-none");
	document.getElementById('abrir-2').classList.remove("d-none");

};
document.getElementById("button_moriggi").onclick = function(){

	var_custofixo = document.getElementById('custos-fixos').value;
	var_custovariavel = document.getElementById('custos-variaveis').value;

	lucro(var_h1, var_h2, var_custovariavel, var_custofixo);

	let result_delta = delta(var_a, var_b, var_c);

	 if(verificaDelta(result_delta) == 1){
		 
		bhaskara(var_a, var_b, result_delta);

		document.getElementById('raizes').innerHTML = "raizes:pontos onde a reta corda no eixo x <br> 1º raiz: "+parseInt(raiz1)+"<br>"+"2º raiz:"+parseInt(raiz2);
		document.getElementById('mostrar-raizes').classList.remove('amostra');
		document.getElementById('mostrar-raizes').classList.add('mostrar-raiz');
		let pontoMedio_result_X = pontoMedioX(var_a, var_b);
		let pontoMedio_result_Y = pontoMedioY(result_delta, var_a);

		graficoDeltaPositivo(parseInt(raiz1), parseInt(pontoMedio_result_X) ,parseInt(pontoMedio_result_Y) ,parseInt(raiz2));

	 }else if(verificaDelta(result_delta) == 0){
		 
		bhaskara(var_a, var_b, result_delta);
		
		document.getElementById('raizes').innerHTML = "raizes:pontos onde a reta corda no eixo x <br> 1º raiz: "+parseInt(raiz1);
		document.getElementById('mostrar-raizes').classList.remove('amostra');
		document.getElementById('mostrar-raizes').classList.add('mostrar-raiz');

		graficoDeltaZerado(parseInt(raiz1), parseInt(var_c));

	 }else{

		document.getElementById('raizes').innerHTML = "Não foi possível calcular o gráfico, pois ele não corta o eixo x";

	 }
}