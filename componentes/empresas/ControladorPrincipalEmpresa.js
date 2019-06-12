$(document).ready(function () {

    var accion = sessionStorage.getItem("compEmpresa");
    if (accion == null) {
        sessionStorage.setItem("compEmpresa", 'mostrarEmpresa');
        cargarComponente();

    } else {
        cargarComponente();
    }
});

function cargarComponente() {
    var accion = sessionStorage.getItem("compEmpresa");
    switch (accion) {
        case 'mostrarEmpresa':
            $('#contEmpresa').load('componentes/empresas/empresa/TablaEmpresa.html')
            $.getScript("componentes/empresas/empresa/TablaEmpresa.js?n=1");

            break;
        case 'mostrarPuesto':
            $('#contEmpresa').load('componentes/empresas/puesto/TablaPuesto.html')
            $.getScript("componentes/empresas/puesto/TablaPuesto.js?n=1");

            break;
        case 'agregarEmpresa':
            $('#contEmpresa').load('componentes/empresas/empresa/FormularioEmpresa.html');
            $.getScript("componentes/empresas/empresa/FormularioEmpresa.js?n=1");

            break;
        case 'agregarPuesto':
            $('#contEmpresa').load('componentes/empresas/puesto/FormularioPuesto.html');
            $.getScript("componentes/empresas/puesto/FormularioPuesto.js?n=1");

            break;
        case 'ambosEmpresa':
            $('#contOcultoEmpresa').html('');
            $('#contEmpresa').html('');
            $('#contEmpresa').load('componentes/empresas/empresa/FormularioEmpresa.html');
            $('#contOcultoEmpresa').load('componentes/empresas/puesto/FormularioPuesto.html', function (data2) {
                $('#contEmpresa').append(data2);
            });
            $('#contOcultoEmpresa').load('componentes/empresas/empresa/TablaEmpresa.html', function (data3) {
                $('#contEmpresa').append(data3);
            });
            $('#contOcultoEmpresa').load('componentes/empresas/puesto/TablaPuesto.html', function (data4) {
                $('#contEmpresa').append(data4);
            });
            $.getScript("componentes/empresas/empresa/FormularioEmpresa.js?n=1");
            $.getScript("componentes/empresas/puesto/FormularioPuesto.js?n=1");
            $.getScript("componentes/empresas/empresa/TablaEmpresa.js?n=1");
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
