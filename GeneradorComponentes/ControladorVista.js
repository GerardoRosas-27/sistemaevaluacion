$(document).ready(function () {

    var accion = sessionStorage.getItem("generador");
    if (accion == null) {
        sessionStorage.setItem('generador', 1);
        controlAccionesGenerador();
    } else {
        controlAccionesGenerador();
    }
});
//carga por la accion
function controlAccionesGenerador() {
    var accion = parseInt(sessionStorage.getItem("generador"));
    switch (accion) {
        case 1:
            sessionStorage.setItem('cantidadComp',accion);
            $('#ContenedorControlador').load('GeneradorComponentes/Generador/VistaCrearComponente1.html');
          $.getScript("GeneradorComponentes/Generador/VistaCrearComponente.js?n=1");
             break;
        case 2:
            sessionStorage.setItem('cantidadComp',accion); $('#ContenedorControlador').load('GeneradorComponentes/Generador/VistaCrearComponente2.html');
            $.getScript("GeneradorComponentes/Generador/VistaCrearComponente.js?n=1");
           
            break;
        case 3:
            sessionStorage.setItem('cantidadComp',accion); $('#ContenedorControlador').load('GeneradorComponentes/Generador/VistaCrearComponente3.html');
            $.getScript("GeneradorComponentes/Generador/VistaCrearComponente.js?n=1");
            break;
        case 4:
            sessionStorage.setItem('cantidadComp',accion); $('#ContenedorControlador').load('GeneradorComponentes/Generador/VistaCrearComponente4.html');
            $.getScript("GeneradorComponentes/Generador/VistaCrearComponente.js?n=1");
            break;
        case 5:
            sessionStorage.setItem('cantidadComp',accion); $('#ContenedorControlador').load('GeneradorComponentes/Generador/VistaCrearComponente5.html');
            $.getScript("GeneradorComponentes/Generador/VistaCrearComponente.js?n=1");
            break;
        default:
            
            alert("La accion no es valida");
            break;
    }
}

function controlButtonGenerador(element) {

    var accion = parseInt($(element).data('numero'));
    if (accion > 0 && accion < 6) {
        sessionStorage.setItem('generador', accion);
        controlAccionesGenerador();
    } else {
        alert("la accion no es valida");
    }
}
