$(document).ready(function () {

    var accion = sessionStorage.getItem("comp_RemNomComp");
    if (accion == null) {
        sessionStorage.setItem("comp_RemNomComp", 'mostrar_RemNomComp');
        cargarComponente_RemNomComp();

    } else {
        cargarComponente_RemNomComp();
    }
});

function cargarComponente_RemNomComp() {
    var accion = sessionStorage.getItem("comp_RemNomComp");
    switch (accion) {
        case 'mostrar_RemNomComp':
            $('#cont_RemNomComp').load('componentes/_RemNomCarp/_RemNomComp/Tabla_RemNomComp.html')
            $.getScript("componentes/_RemNomCarps/_RemNomCarp/Tabla_RemNomComp.js?n=1");

            break;
        case 'mostrarPuesto':
            $('#cont_RemNomComp').load('componentes/empresas/puesto/TablaPuesto.html')
            $.getScript("componentes/empresas/puesto/TablaPuesto.js?n=1");
            break;
        case 'agregar_RemNomComp':
            $('#cont_RemNomComp').load('componentes/empresas/empresa/Formulario_RemNomComp.html');
            $.getScript("componentes/empresas/empresa/Formulario_RemNomComp.js?n=1");

            break;
        case 'agregarPuesto':
            $('#cont_RemNomComp').load('componentes/empresas/puesto/FormularioPuesto.html');
            $.getScript("componentes/empresas/puesto/FormularioPuesto.js?n=1");

            break;
        case 'ambos_RemNomComp':
            $('#contOculto_RemNomComp').html('');
            $('#cont_RemNomComp').html('');
            $('#cont_RemNomComp').load('componentes/empresas/empresa/FormularioEmpresa.html');
            $('#contOculto_RemNomComp').load('componentes/empresas/puesto/FormularioPuesto.html', function (data2) {
                $('#cont_RemNomComp').append(data2);
            });
            $('#contOculto_RemNomComp').load('componentes/empresas/empresa/TablaEmpresa.html', function (data3) {
                $('#cont_RemNomComp').append(data3);
            });
            $('#contOculto_RemNomComp').load('componentes/empresas/puesto/TablaPuesto.html', function (data4) {
                $('#cont_RemNomComp').append(data4);
            });
            $.getScript("componentes/empresas/empresa/Formulario_RemNomComp.js?n=1");
            $.getScript("componentes/empresas/puesto/FormularioPuesto.js?n=1");
            $.getScript("componentes/empresas/empresa/Tabla_RemNomComp.js?n=1");
            $.getScript("componentes/empresas/puesto/TablaPuesto.js?n=1");

            break;
        default:
            notificacionDefault();
            break;
    }
}

function accionButtons(element) {
    var accion = $(element).data('accion');
    switch (accion) {
        case 'mostrarEmpresa':
            sessionStorage.setItem("compEmpresa", accion);
            cargarComponente();
            break;
        case 'mostrarPuesto':
            sessionStorage.setItem("compEmpresa", accion);
            cargarComponente();
            break;
        case 'agregarEmpresa':
            sessionStorage.setItem("compEmpresa", accion);
            cargarComponente();
            break;
        case 'agregarPuesto':
            sessionStorage.setItem("compEmpresa", accion);
            cargarComponente();
            break;
        case 'ambosEmpresa':
            sessionStorage.setItem("compEmpresa", accion);
            cargarComponente();
            break;
        default:
            notificacionDefault();
            break;
    }
}


