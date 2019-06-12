var refEmpresa = fireBd.ref('empresas');
var refPuestos = fireBd.ref('puestos');
var refSeccion = fireBd.ref('seccion');
var refCasoPractico = fireBd.ref('casoPractico');
var refPreguntas = fireBd.ref('preguntas');
var refEvaluacionAdmin = fireBd.ref('evaluacionAdmin');
//var refUsuarios = fireBd.ref('usuarios');
//carga por default
$(document).ready(function () {

    var accion = sessionStorage.getItem("administrador");
    if (accion == null) {
        $('#escritorio').addClass("active");
        sessionStorage.setItem("administrador", 'escritorio');
        controlAccionesAdmin();
    } else {
        $('.estado').removeClass("active");
        $('#' + accion).addClass("active");
        controlAccionesAdmin();
    }
});
//carga por la accion
function controlAccionesAdmin() {
    var accion = sessionStorage.getItem("administrador")
    switch (accion) {
        case 'escritorio':
            //sessionStorage.setItem("instru", 2);
            $('#contenedorPrincipal').load('componentes/escritorio/escritorio.html');
            $.getScript("componentes/escritorio/escritorio.js?n=1");
            break;
        case 'empresa':
            $('#contenedorPrincipal').load('componentes/empresas/VistaPrincipalEmpresa.html');
            $.getScript("componentes/empresas/ControladorPrincipalEmpresa.js?n=1");
            break;
        case 'preguntas':
            $('#contenedorPrincipal').load('componentes/preguntas/VistaPrincipalPreguntas.html');
            $.getScript("componentes/preguntas/ControladorPrincipalPreguntas.js?n=1");

            break;
        case 'evaluaciones':
            $('#contenedorPrincipal').load('componentes/evaluaciones/VistaEvaluaciones.html');
            $.getScript("componentes/evaluaciones/ControladorEvaluaciones.js?n=1");

            break;
        case 'Generador':
            $('#contenedorPrincipal').load('GeneradorComponentes/ControladorVista.html');
            $.getScript("GeneradorComponentes/ControladorVista.js?n=1");

            break;
            case 'ModuloPrueba':
            $('#contenedorPrincipal').load('componentes/ModuloPrueba/VistaModuloPrueba.html');
            $.getScript("componentes/ModuloPrueba/ControladorModuloPrueba.js?n=1");

            break;
        default:
            notificacionDefault();
            break;
    }
}
//deteccion de evento para cargar la vista solicitada
function controlButtonAdmin(element) {
    $('.estado').removeClass("active");
    $(element).addClass("active");
    var accion = $(element).attr('id');
    sessionStorage.setItem("administrador", accion);
    controlAccionesAdmin();
}

function activarNotificaciones(element) {
    //alert("entro");
    sessionStorage.setItem('notificacionesAdmin', 'OK');
}
/// cerrar secion


$(document).ready(function(){
    var timeout;
    $(document).on('mousemove', function (event) {
        if (timeout !== undefined) {
            window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(function () {
            //Creas una funcion nueva para jquery 
            $(event.target).trigger('mousemoveend');
        }, 150000); //determinas el tiempo en milisegundo aqui 5 segundos
    });
    
    $(document).on('mousemoveend', function () { //agregas la nueva funcion creada, puede ser una 
        cerrarSesionAdmin();
    notificacionMensajeColor('Tu sesión se a cerrado por seguridad', 'success');
    });
})


/*
$(window).resize(function () {
     var ancho = $(window).width();
    if (ancho >= 992) {
        $('.subMenus').removeClass("icon_barra");
    }else{
         $('.subMenus').addClass("icon_barra");
    }
})
*/
