$(document).ready(function () {

    var accion = sessionStorage.getItem("compPreguntas");
    if (accion == null) {
        sessionStorage.setItem("compPreguntas", 'mostrarPregunta');
        cargarComponente();

    } else {
        cargarComponente();
    }
});

function cargarComponente() {
    var accion = sessionStorage.getItem("compPreguntas");
    switch (accion) {
        case 'mostrarPregunta':
            $('#contPreguntaImportar').html('');
            $('#contPregunta').load('componentes/preguntas/pregunta/TablaPregunta.html')
            $.getScript("componentes/preguntas/pregunta/TablaPregunta.js?n=1");
            break;
        case 'agregarPregunta':
            $('#contPreguntaImportar').html(''); $('#contPregunta').load('componentes/preguntas/pregunta/FormularioPregunta.html');
            $.getScript("componentes/preguntas/pregunta/FormularioPregunta.js?n=1");

            break;
        case 'mostrarSeccion':
            $('#contPreguntaImportar').html(''); $('#contPregunta').load('componentes/preguntas/seccion/TablaSeccion.html')
            $.getScript("componentes/preguntas/seccion/TablaSeccion.js?n=1");
            break;
        case 'agregarSeccion':
            $('#contPreguntaImportar').html(''); $('#contPregunta').load('componentes/preguntas/seccion/FormularioSeccion.html');
            $.getScript("componentes/preguntas/seccion/FormularioSeccion.js?n=1");

            break;
        case 'mostrarCasoPractico':
            $('#contPreguntaImportar').html(''); $('#contPregunta').load('componentes/preguntas/casopractico/TablaCasoPractico.html')
            $.getScript("componentes/preguntas/casopractico/TablaCasoPractico.js?n=1");
            break;
        case 'agregarCasoPractico':
            $('#contPreguntaImportar').html(''); $('#contPregunta').load('componentes/preguntas/casopractico/FormularioCasoPractico.html');
            $.getScript("componentes/preguntas/casopractico/FormularioCasoPractico.js?n=1");

            break;
        case 'ambosPregunta':
             $('#contPreguntaImportar').html('');
            $('#contOcultoPregunta').html('');
            $('#contPregunta').html('');
            $('#contPregunta').load('componentes/preguntas/pregunta/FormularioPregunta.html');
            $('#contOcultoPregunta').load('componentes/preguntas/pregunta/TablaPregunta.html', function (data3) {
                $('#contPregunta').append(data3);
            });

            $.getScript("componentes/preguntas/pregunta/FormularioPregunta.js?n=1");
            $.getScript("componentes/preguntas/pregunta/TablaPregunta.js?n=1");

            break;
        default:
            notificacionDefault();
            break;
    }
}

function accionButtons(element) {
    var accion = $(element).data('accion');
    sessionStorage.setItem("compPreguntas", accion);
    cargarComponente();
}
