$(document).ready(function () {

    var accion = sessionStorage.getItem("compEvaluaciones");
    if (accion == null) {
        sessionStorage.setItem("compEvaluaciones", 'mostrarEvaluacion');
        cargarComponenteEvaluaciones();

    } else {
        cargarComponenteEvaluaciones();
    }
});

function cargarComponenteEvaluaciones() {
    var accion = sessionStorage.getItem("compEvaluaciones");
    switch (accion) {
        case 'mostrarEvaluacion':
            $('#contEvaluaciones').load('componentes/evaluaciones/evaluacion/TablaEvaluacion.html')
            $.getScript("componentes/evaluaciones/evaluacion/TablaEvaluacion.js?n=1");

            break;
        case 'agregarEvaluacion':
            $('#contEvaluaciones').load('componentes/evaluaciones/evaluacion/FormularioEvaluacion.html');
            $.getScript("componentes/evaluaciones/evaluacion/FormularioEvaluacion.js?n=1");

            break;
        case 'ambosEvaluaciones':
            $('#contOcultoEvaluaciones').html('');
            $('#contEvaluaciones').html('');
            $('#contEvaluaciones').load('componentes/evaluaciones/evaluacion/FormularioEvaluacion.html');
            $('#contOcultoEvaluaciones').load('componentes/evaluaciones/evaluacion/TablaEvaluacion.html', function (data2) {
                $('#contEvaluaciones').append(data2);
            });
            $.getScript("componentes/evaluaciones/evaluacion/FormularioEvaluacion.js?n=1");
            $.getScript("componentes/evaluaciones/evaluacion/TablaEvaluacion.js?n=1");
            break;
        default:
            notificacionDefault();
            break;
    }
}

function accionButtonsEvaluaciones(element) {
    var accion = $(element).data('accion');
    sessionStorage.setItem("compEvaluaciones", accion);
    cargarComponenteEvaluaciones();
}
