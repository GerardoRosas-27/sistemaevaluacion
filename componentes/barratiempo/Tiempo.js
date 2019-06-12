// Variables para controlar el inicio y termino de la cuenta
var inicio = false;
var termino = false;
 
// Variables editables, para personalizar la barra de porcentaje
var tam_barra = 280;	// Tamaño de la barra en pixeles


var seg_barra = parseInt(localStorage.getItem("tiempo"))  	// Segundos de trabajo hasta 100%
 
// Se toma la diferencia con respecto el tiempo actual
var date = new Date();
var milisec_barra = seg_barra * 1000;
var milisec_final = date.getTime() + milisec_barra;
 
// Funcion que inicia el proceso
function iniciar_proceso()
{
	// Solo si no a iniciado el proceso se inicia
	if (inicio == false)
	{
		inicio = true;
  		aumenta_barra();
	}
}
 
// Funcion que aumenta el porcentaje de la barra
function aumenta_barra()
{
	// Solo si no a terminado sigue aumentando
	if (termino == false)
	{
		// Se toma el tiempo actual
		var ahora = new Date();
	    milisec_ahora = ahora.getTime();
 
		// Se toma el tiempo restante para llegar a 100%
	    var milisec_restante = Math.ceil((milisec_final - milisec_ahora) / 100);
	    if (milisec_restante < 0)
		{
			milisec_restante = 0;
		}
 
		// Se divide el tiempo restante en horas, minutos y segundos
		var horas = Math.floor(milisec_restante / 36000);
		var minutos = Math.floor(milisec_restante % 36000 / 600);
		var segundos = Math.floor(milisec_restante % 36000 % 600) / 10;
		if ((segundos % 1) == 0)
		{
			segundos = segundos + ".0";
		}
		var salida;
		if (horas > 0)
		{
			var salida = horas + " horas, " + minutos + " minutos y " + segundos + " segundos.";
		}
		else
		{
			if (minutos > 0)
			{
				var salida = minutos + " minuto(s) y " + segundos + " segundos.";
			}
			else
			{
			 	var salida = segundos + " segundos.";
			}
		}
 
		// Se genera el porcentaje a partir del tiempo restante para el 100%
		milisec_restante = Math.floor(milisec_restante) / 10;
	    var porcentaje = Math.floor(((milisec_barra - milisec_restante * 1000) / milisec_barra) * 100);
	    if (porcentaje < 0)
		{
			porcentaje = 1;
		}
 
		// Se verifica si se llego al tiempo final
		if (milisec_final >= milisec_ahora)
		{
			// Si aun no termina solo se muestra el porcentaje
			document.getElementById("div_boton").innerHTML = salida;
			document.getElementById("div_barra").innerHTML = porcentaje + "%";
	    }
		else
		{
			// Si termina se puede continuar mostrando o enviando alguna informacion
			termino = true;
            $('#bottonPregunta').click();
			/*document.forma.submit();*/ // Mandar que termino el trabajo para permitir continuar
			document.getElementById("div_barra").innerHTML = "100% listo";
			
		}
      	document.getElementById("div_completado").style.width = (porcentaje / 100) * tam_barra + "px";
		setTimeout("aumenta_barra();", 100);
	}
}

window.setTimeout("iniciar_proceso()", 400);