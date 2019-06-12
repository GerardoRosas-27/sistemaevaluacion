$(document).ready(function () {

    var accion = sessionStorage.getItem("comp_RemNomSubCar");
    if (accion == null) {
        sessionStorage.setItem("comp_RemNomSubCar", 'mostrar_RemNomComp1');
        cargarComponente_RemNomSubCar();

    } else {
        cargarComponente_RemNomSubCar();
    }
});

function cargarComponente_RemNomSubCar() {
    var accion = sessionStorage.getItem("comp_RemNomSubCar");
    switch (accion) {
        case 'mostrar_RemNomComp1':
            $('#cont_RemNomSubCar').load('_RemNomDirect/_RemNomSubCar/_RemNomComp1/Tabla_RemNomComp1.html')
            $.getScript("_RemNomDirect/_RemNomSubCar/_RemNomComp1/Tabla_RemNomComp1.js?n=1");

            break;
        case 'agregar_RemNomComp1':
            $('#cont_RemNomSubCar').load('_RemNomDirect/_RemNomSubCar/_RemNomComp1/Formulario_RemNomComp1.html');
            $.getScript("_RemNomDirect/_RemNomSubCar/_RemNomComp1/Formulario_RemNomComp1.js?n=1");

            break;
        case 'mostrar_RemNomComp2':
            $('#cont_RemNomSubCar').load('_RemNomDirect/_RemNomSubCar/_RemNomComp2/Tabla_RemNomComp2.html');
            $.getScript("_RemNomDirect/_RemNomSubCar/_RemNomComp2/Tabla_RemNomComp2.js?n=1");

            break;
        case 'agregar_RemNomComp2':
            $('#cont_RemNomSubCar').load('_RemNomDirect/_RemNomSubCar/_RemNomComp2/Formulario_RemNomComp2.html');
            $.getScript("_RemNomDirect/_RemNomSubCar/_RemNomComp2/Formulario_RemNomComp2.js?n=1");

            break;
            case 'mostrar_RemNomComp3':
            $('#cont_RemNomSubCar').load('_RemNomDirect/_RemNomSubCar/_RemNomComp3/Tabla_RemNomComp3.html');
            $.getScript("_RemNomDirect/_RemNomSubCar/_RemNomComp3/Tabla_RemNomComp3.js?n=1");

            break;
        case 'agregar_RemNomComp3':
            $('#cont_RemNomSubCar').load('_RemNomDirect/_RemNomSubCar/_RemNomComp3/Formulario_RemNomComp3.html');
            $.getScript("_RemNomDirect/_RemNomSubCar/_RemNomComp3/Formulario_RemNomComp3.js?n=1");

            break;
        case 'ambos_RemNomSubCar':
            $('#contOculto_RemNomSubCar').html('');
            $('#cont_RemNomSubCar').html('');
            $('#cont_RemNomSubCar').load('_RemNomDirect/_RemNomSubCar/_RemNomComp1/Formulario_RemNomComp1.html');
            $('#contOculto_RemNomSubCar').load('_RemNomDirect/_RemNomSubCar/_RemNomComp1/Tabla_RemNomComp1.html', function (data2) {
                $('#cont_RemNomSubCar').append(data2);
            });
            $('#contOculto_RemNomSubCar').load('_RemNomDirect/_RemNomSubCar/_RemNomComp2/Formulario_RemNomComp2.html', function (data3) {
                $('#cont_RemNomSubCar').append(data3);
            });
            $('#contOculto_RemNomSubCar').load('_RemNomDirect/_RemNomSubCar/_RemNomComp2/Tabla_RemNomComp2.html', function (data4) {
                $('#cont_RemNomSubCar').append(data4);
            });
            
             $('#contOculto_RemNomSubCar').load('_RemNomDirect/_RemNomSubCar/_RemNomComp3/Formulario_RemNomComp3.html', function (data5) {
                $('#cont_RemNomSubCar').append(data5);
            });
            $('#contOculto_RemNomSubCar').load('_RemNomDirect/_RemNomSubCar/_RemNomComp3/Tabla_RemNomComp3.html', function (data6) {
                $('#cont_RemNomSubCar').append(data6);
            });
            $.getScript("_RemNomDirect/_RemNomSubCar/_RemNomComp1/Formulario_RemNomComp1.js?n=1");
            $.getScript("_RemNomDirect/_RemNomSubCar/_RemNomComp1/Tabla_RemNomComp1.js?n=1");
            $.getScript("_RemNomDirect/_RemNomSubCar/_RemNomComp2/Formulario_RemNomComp2.js?n=1");
            $.getScript("_RemNomDirect/_RemNomSubCar/_RemNomComp2/Tabla_RemNomComp2.js?n=1");
             $.getScript("_RemNomDirect/_RemNomSubCar/_RemNomComp3/Formulario_RemNomComp3.js?n=1");
            $.getScript("_RemNomDirect/_RemNomSubCar/_RemNomComp3/Tabla_RemNomComp3.js?n=1");
            break;
        default:
            notificacionDefault();
            break;
    }
}

function accionButtons_RemNomSubCar(element) {
    var accion = $(element).data('accion');
    sessionStorage.setItem("comp_RemNomSubCar", accion);
    cargarComponente_RemNomSubCar();
}
