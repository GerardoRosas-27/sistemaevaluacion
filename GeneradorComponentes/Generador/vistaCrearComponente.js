$(document).ready(function () {
    $('#CrearControlador').click(function () {
        sessionStorage.setItem('creControlador', 'OK');
    })
});

var cont = 1;

function CrearComponente() {
    if ($('#directorio').val().length == 0) {
        $('#directorio').val('componentes');
    }
    if ($('#subCarpeta').val().length == 0) {
        $('#subCarpeta').val('porDefecto');
    }
    var Controlador = sessionStorage.getItem('creControlador');
    var cantidad = parseInt(sessionStorage.getItem('cantidadComp'));
    if (Controlador == 'OK') {

        cargaraControladorMultiple(cantidad).then(function (result) {
            console.log('se cargo Controlador y vista ' + cantidad + ': ' + result);
            remplazarControlador(cantidad).then(function (result) {
                console.log('se remplazo controlador y la vista ' + cantidad + ': ' + result);

                var data0 = {
                    'url1': "GeneradorComponentes/GenerardorDirectoriosPrincipal.php",
                    'nombreCarpeta': $('#subCarpeta').val(),
                    'nombreRuta': $('#directorio').val(),
                    'contenidoControl': $("#Controlador").html(),
                    'contenidoVista': $("#VistaControlador").html()

                }
                enviarAJAX(data0);

            }, function (error) {
                console.log('resuelta error al remplazar Controlador y vista ' + cantidad + ': ' + error);
            });

        }, function (error) {
            console.log('resuelta error al cargar Controlador y vista ' + cantidad + ': ' + error);
        });

    } else {

        if (cont <= cantidad) {

            $('#conTem' + cont).html('');
            $('#vistaTem' + cont).html('');
            var Controlador = 'GeneradorComponentes/ArchivosBase/Controlador.js';
            var Vista = 'GeneradorComponentes/ArchivosBase/Vista.html';
            console.log(cont);
            CargarHTML().then(function (result) {
                var valor = $('#NombreCompo' + cont).val();
                console.log(result);
                console.log(cont);
                console.log(valor);
                remplazar(valor,result).then(function (result) {
                    console.log(result);
                    var data = {
                        'url1': "GeneradorComponentes/GeneradorDirectoriosArchivos.php",
                        'nombreRuta': $('#directorio').val(),
                        'nombreCarpeta': $('#subCarpeta').val(),
                        'contenidoFormularioHtml': $("#FormularioHtml").html(),
                        'contenidoFormularioJs': $("#FormularioJavascript").html(),
                        'contenidoTablaHtml': $("#TablaHtml").html(),
                        'contenidoTablaJs': result,
                        'nombreComp': valor
                    }
                    enviarAJAX(data);

                }, function (err) {
                    console.log('resuelta error al remplazar: ' + err); // Error: "It broke"
                });


            }, function (err) {
                console.log('resuelta error al cargar: ' + err); // Error: "It broke"
            });


        } else alert('No hay Componentes por crear');
    }
}

function CargarHTML() {
    return new Promise(function (resolve, reject) {

        if (resolve) {
            $('#FormularioHtml').load('GeneradorComponentes/ArchivosBase/Formulario.html', function (data, status, resul) {

                console.log(status);
                console.log(resul.status);
                if (resul.status == 200 && status == 'success') {
                    $('#FormularioJavascript').load('GeneradorComponentes/ArchivosBase/Formulario.js', function (data1, status1, resul1) {

                        console.log(status1);
                        console.log(resul1.status);
                        if (resul1.status == 200 && status1 == 'success') {
                            $('#TablaHtml').load('GeneradorComponentes/ArchivosBase/Tabla.html', function (data3, status3, resul3) {

                                console.log(status3);
                                console.log(resul3.status);
                                if (resul3.status == 200 && status3 == 'success') {
                                    $('#TablaJavascript').load('GeneradorComponentes/ArchivosBase/Tabla.js', function (data4, status4, resul4) {
                                        console.log(status4);
                                        console.log(resul4.status);
                                        if (resul4.status == 200 && status4 == 'success') {
                                            resolve(data4);

                                        } else {
                                            console.log('error al cargar TablaJavascript');
                                        }
                                    });

                                } else {
                                    console.log('error al cargar la Tablahtml');
                                }
                            });

                        } else {
                            console.log('error al cargar FormularioJavascript');
                        }
                    });


                } else {
                    console.log('error al cargar el formulariohtml');
                }
            });


        } else {
            reject(Error("error de promesa al cargar"));
        }
    });
}

function cargaraControladorMultiple(cantidad) {
    return new Promise(function (resolve, reject) {

        if (resolve) {

            $('#Controlador').load('GeneradorComponentes/ArchivosBase/Controlador' + cantidad + '.js', function (data, status, resul) {

                console.log('controlador: ' + status);
                console.log('controlador: ' + resul.status);
                if (resul.status == 200 && status == 'success') {


                    $('#VistaControlador').load('GeneradorComponentes/ArchivosBase/Vista' + cantidad + '.html', function (data1, status1, resul1) {

                        console.log(status1);
                        console.log(resul1.status);
                        if (resul1.status == 200 && status1 == 'success') {
                            resolve(data1);
                        } else {
                            console.log('error al cargar la vista Controlador');
                        }
                    });


                } else {
                    console.log('error al cargar el controlador');
                }
            });


        } else {
            reject(Error("no se resolvio la promesa cargar Controlador"));
        }
    });
}

function remplazar(remplazoComp, contTabla) {

    return new Promise(function (resolve, reject) {

        if (resolve) {
            var RemplazoCarpeta = $('#subCarpeta').val();

            var res = $('#FormularioHtml').html().replace(/_RemNomComp/g, remplazoComp);
            $("#FormularioHtml").html(res);

            var res = $('#FormularioJavascript').html().replace(/_RemNomComp/g, remplazoComp);
            $("#FormularioJavascript").html(res);

            var res = $('#FormularioJavascript').html().replace(/_RemNomSubCar/g, RemplazoCarpeta);
            $("#FormularioJavascript").html(res);

            var res = $('#TablaHtml').html().replace(/_RemNomComp/g, remplazoComp);
            $("#TablaHtml").html(res);

            var res = contTabla.replace(/_RemNomComp/g, remplazoComp);
            $("#TablaJavascript").html(res);
          


            resolve(res);

        } else {
            reject(Error("error remplazar simple"));
        }
    });

}

function remplazarControlador(cantidad) {

    return new Promise(function (resolve, reject) {

        if (resolve) {
            var res = $('#Controlador').html().replace(/_RemNomSubCar/g, $('#subCarpeta').val());
            $("#Controlador").html(res);
            var res = $('#Controlador').html().replace(/_RemNomDirect/g, $('#directorio').val());
            $("#Controlador").html(res);
            var res = $('#VistaControlador').html().replace(/_RemNomSubCar/g, $('#subCarpeta').val());
            $("#VistaControlador").html(res);

            for (var i = 1; i <= cantidad; i++) {

                switch (i) {
                    case 1:
                        var rempla = /_RemNomComp1/g
                        break;
                    case 2:
                        var rempla = /_RemNomComp2/g
                        break;
                    case 3:
                        var rempla = /_RemNomComp3/g
                        break;
                    case 4:
                        var rempla = /_RemNomComp4/g
                        break;
                    case 5:
                        var rempla = /_RemNomComp5/g
                        break;
                    default:
                        console.log('error Seleccion de remplaso Controlador');
                        break;
                }
                var res = $('#Controlador').html().replace(rempla, $('#NombreCompo' + i).val());
                $("#Controlador").html(res);
                var res = $('#VistaControlador').html().replace(rempla, $('#NombreCompo' + i).val());
                $("#VistaControlador").html(res);
            }
            resolve('Exito Remplaso controlador');
        } else {
            reject(Error("error remplazar controlador"));
        }
    });

}

function enviarAJAX(data) {

    var datos;
    $.ajax({
        type: "POST",
        url: data.url1,
        data: data,
        success: function (datos) {
            if (datos == "Exito") {
                cont++;
                CrearComponente();
            } else {
                if (datos == "ExitoControl") {
                    sessionStorage.setItem('creControlador', 'FIN');
                    CrearComponente();
                } else {
                    $("#ContErrores").html(datos);
                }

            }
        }
    });
}

function PruebaAdmin(){
    alert("pendiente incorporar El modulo a Vista Y controlador Ye existenetes");
    /*
    var contenido = '<li id="GeneradoPrueba" onClick="controlButtonAdmin(this)" class="estado nav-item "><a class="nav-link" href="#graficas"><i class="material-icons">location_ons</i><p>GeneradoPrueba</p></a></li>';
    
    $('#ContAdmin').load('componentes/admin/contenidoAdmin.html', function (data1, status1, resul1) {

                        console.log(status1);
                        console.log(resul1.status);
                        if (resul1.status == 200 && status1 == 'success') {
                             var res = $('#ContAdmin').html().replace(/<!--_Rem1_-->/g, contenido);
                            $("#ContAdmin").html(res);
                            console.log(res);
                        } else {
                            console.log('error al cargar la vista Admin');
                        }
                    });
    
    */
}
