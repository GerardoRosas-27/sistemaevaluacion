$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
$(document).ready(function () {
    localStorage.removeItem('cantSeccion');
    localStorage.setItem('cantSeccion',1);
    localStorage.removeItem('preguntaActual');
    var size = sessionStorage.getItem('formularioEvaluacion');
    if (size != null) {
        if (size == 'min') {
            $('#formularioEvaluacion').removeData('size');
            $('#formularioEvaluacion').attr('data-size', 'min');
            $('#formularioEvaluacion').removeClass('col-12');
            $('#formularioEvaluacion').addClass('col-md-6');
            $('#btnSize').html('<i class="material-icons">crop_din</i>');
        }
    }
    $('#selectCasoPractico').change(function () {
        
        if ($('#selectCasoPractico').val() == 0) {
            $('#CasoPractico').removeClass('mostrarCaso')
            $('#CasoPractico').addClass('ocultarCaso')
        } else {
            $('#CasoPractico').removeClass('ocultarCaso')
            $('#CasoPractico').addClass('mostrarCaso')
        }
    })

    $('#btnGuardarEvaluacion').click(function () {
        if ($('#selectEmpresa').val() != 0) {
            if ($('#selectPuesto').val() != 0) {
                if ($('#selectSeccion').val() != 0) {
                    if ($('#selectPregunta').val() != 0) {
                        if ($('#textEvaluacionCantPuesto').val().length > 0) {
                            if ($('#textEvaluacionCantSeccion').val().length > 0) {
                                if ($('#selectCasoPractico').val() == 0) {

                                    var data = {
                                        empresa: $('#selectEmpresa').val(),
                                        puesto: $('#selectPuesto').val(),
                                        puestoCant: $('#textEvaluacionCantPuesto').val(),
                                        seccion: $('#selectSeccion').val(),
                                        seccionCant: $('#textEvaluacionCantSeccion').val(),
                                        caso: $('#selectCasoPractico').val(),
                                        pregunta: $('#selectPregunta').val()
                                    }
                                    crearEvaluaccion(data)

                                } else {
                                    if ($('#textEvaluacionCantCaso').val().length > 0) {

                                        var data = {
                                            empresa: $('#selectEmpresa').val(),
                                            puesto: $('#selectPuesto').val(),
                                            puestoCant: $('#textEvaluacionCantPuesto').val(),
                                            seccion: $('#selectSeccion').val(),
                                            seccionCant: $('#textEvaluacionCantSeccion').val(),
                                            caso: $('#selectCasoPractico').val(),
                                            casoCant: $('#textEvaluacionCantCaso').val(),
                                            pregunta: $('#selectPregunta').val()
                                        }
                                        crearEvaluaccion(data)

                                    } else {
                                        notificacionMensaje('Introdusca la cantidad de preguntas del caso práctico');
                                    }
                                }
                            } else {
                                notificacionMensaje('Introdusca la cantidad de preguntas de la seccion');
                            }
                        } else {
                            notificacionMensaje('Introdusca la cantidad de secciones del puesto');
                        }

                    } else {
                        notificacionMensaje('No se ha seleccionado una pregunta');
                    }
                } else {
                    notificacionMensaje('No se ha seleccionado una sección');
                }
            } else {
                notificacionMensaje('No se ha seleccionado un puesto');
            }
        } else {
            notificacionMensaje('No se ha seleccionado una empresa');
        }
    });

    $('#btnCrearEmpresa').click(function () {
        $('#contImportarEvaluaciones').load('componentes/empresas/empresa/FormularioEmpresa.html');
        $.getScript("componentes/empresas/empresa/FormularioEmpresa.js?n=1");

    });
    $('#btnCrearPuesto').click(function () {
        $('#contImportarEvaluaciones').load('componentes/empresas/puesto/FormularioPuesto.html');
        $.getScript("componentes/empresas/puesto/FormularioPuesto.js?n=1");

    });
    $('#btnCrearSeccion').click(function () {
        $('#contImportarEvaluaciones').load('componentes/preguntas/seccion/FormularioSeccion.html');
        $.getScript("componentes/preguntas/seccion/FormularioSeccion.js?n=1");

    });

    $('#btnCrearCaso').click(function () {
        $('#contImportarEvaluaciones').load('componentes/preguntas/casopractico/FormularioCasoPractico.html');
        $.getScript("componentes/preguntas/casopractico/FormularioCasoPractico.js?n=1");

    });
    $('#btnCrearPregunta').click(function () {
        $('#contImportarEvaluaciones').load('componentes/preguntas/pregunta/FormularioPregunta.html');
        $.getScript("componentes/preguntas/pregunta/FormularioPregunta.js?n=1");

    });
    cargarSelectEmpresa();
    cargarSelectPuesto();
    cargarSelectSeccion();
    cargarSelectCasoPractico();
    cargarSelectPregunta();
});

    function crearEvaluaccion(data) {
        console.log(data);
        var refempresa = refEvaluacionAdmin.child(data.empresa);
        refempresa.child('NombreEmpresa').set({
            nombre: $('select[id="selectEmpresa"] option:selected').text()
        })
        var refpuesto = refempresa.child(data.puesto)
        refpuesto.child('NombrePuesto').set({
            nombre: $('select[id="selectPuesto"] option:selected').text()
        })
        refpuesto.child('CantSecciones').set({
            cant: data.puestoCant
        })
        var refseccion = refpuesto.child(data.seccion);
        refseccion.child('CantPreguntasSeccion').set({
            cant: data.seccionCant
        })
        consultaSeccion(data.seccion).then(function (result) {
            console.log(result);
            var datos = refseccion.child('datos');
            datos.set(result);
            var refCaso = refseccion.child('caso');
            if ($('#selectCasoPractico').val() == 0) {
                
                refseccion.child('EstadoCaso').set({
                    caso: 'NO'
                })
                refCaso.child('casos').remove();
                var refpreguntas = refCaso.child('preguntas');
                consultaPregunta(data.pregunta).then(function (result) {
                    console.log(result);
                    var refpregunta = refpreguntas.child(data.pregunta);
                    refpregunta.set(result, function (error) {
                        if (error) {
                            notificacionMensaje('Error los datos no se pudieron guardar');
                        } else {
                            
                            faltaSecciones(data);
                        }
                    });
                }, function (err) {
                    console.log('resuelta consulta pregunta sin caso: ' + err); //  Error: "It broke"
                });
            } else {
                refseccion.child('EstadoCaso').set({
                    caso: 'SI'
                })
                refCaso.child('preguntas').remove();
                var refCasos = refCaso.child('casos')
                var refcasopractico = refCasos.child(data.caso);
                refcasopractico.child('CantPreguntasCaso').set({
                    cant: data.casoCant
                })
                consultaCasoPractico(data.caso).then(function (result) {
                    console.log(result);
                    var datosCaso = refcasopractico.child('datos');
                    datosCaso.set(result);
                    var refpreguntas = refcasopractico.child('preguntas');
                    var refpregunta = refpreguntas.child(data.pregunta);
                    consultaPregunta(data.pregunta).then(function (result) {
                        console.log(result);
                        refpregunta.set(result, function (error) {
                            if (error) {
                                notificacionMensaje('Error los datos no se pudieron guardar');
                            } else {
                                notificacionMensajeColor('Los datos se guardaron correctamente', 'success')
                            }
                        });
                    }, function (err) {
                        console.log('resuelta consulta pregunta: ' + err); //  Error: "It broke"
                    });
                }, function (err) {
                    console.log('resuelta consulta caso practico: ' + err); //  Error: "It broke"
                });
            }
        }, function (err) {
            console.log('resuelta consulta seccion: ' + err);
        });
    }
    function faltaSecciones(data){
       
 
        var preguntaSeccion = localStorage.getItem('preguntaActual')
        if (preguntaSeccion == null){
            localStorage.setItem('preguntaActual',1);
        }else{
            localStorage.setItem('preguntaActual',parseInt(preguntaSeccion)+1);
        }
        var preguntaActual = localStorage.getItem('preguntaActual')
        
        var cantSeccion = localStorage.getItem('cantSeccion')
        
        var valor = 0;
        
        if(parseInt(cantSeccion) <= parseInt(data.puestoCant)){
            if(parseInt(preguntaActual) < parseInt(data.seccionCant)){
                 notificacionMensajeColor('La pregunta: '+ data.pregunta +' se guardo correctamente', 'success')
                cargarSelectPregunta()
            }else{
                if(parseInt(cantSeccion) == parseInt(data.puestoCant)){
                   notificacionMensajeColor('La pregunta: '+ data.pregunta +' se guardo correctamente Cambia de puesto', 'success')
            localStorage.removeItem('preguntaActual');
            localStorage.removeItem('cantSeccion');
            localStorage.setItem('cantSeccion',1);
                    cargarSelectPuesto()
                   }else{
                    notificacionMensajeColor('La pregunta: '+ data.pregunta +' se guardo correctamente cambia de Seccion', 'success')
                localStorage.removeItem('preguntaActual');
                localStorage.setItem('cantSeccion',parseInt(cantSeccion)+1);
                       
                      cargarSelectSeccion()
                   }
            }   
        }
       
        //localStorage.setItem('cantSecciPuesto',data.puestoCant)
//localStorage.setItem('cantPregSeccion',data.seccionCant)
    }

function consultaSeccion(id) {
    var id = id.toString();
    return new Promise(function (resolve, reject) {
        if (resolve) {
            refSeccion.orderByChild('id')
                .equalTo(id).limitToFirst(1)
                .once('value').then(function (snapshot) {
                    snapshot.forEach(snap => {
                        resolve(snap.val())
                    });
                });

        } else {
            reject(Error("error de promesa consulta seccion"));
        }
    });
}

function consultaCasoPractico(id) {
    var id = id.toString();
    return new Promise(function (resolve, reject) {
        if (resolve) {
            refCasoPractico.orderByChild('id')
                .equalTo(id).limitToFirst(1)
                .once('value').then(function (snapshot) {
                    snapshot.forEach(snap => {
                        resolve(snap.val())
                    });
                });

        } else {
            reject(Error("error de promesa consulta caso practico"));
        }
    });
}

function consultaPregunta(id) {
    var id = id.toString();
    return new Promise(function (resolve, reject) {
        if (resolve) {
            refPreguntas.orderByChild('id')
                .equalTo(id).limitToFirst(1)
                .once('value').then(function (snapshot) {
                    snapshot.forEach(snap => {
                        resolve(snap.val())
                    });
                });

        } else {
            reject(Error("error de promesa consulta pregunta"));
        }
    });
}

function cargarSelectEmpresa() {
    $('#selectEmpresa').html('<option value="0">Ninguna seleccionada</option>');
    refEmpresa.on('child_added', function (snapshot) {
        var key = snapshot.key;
        var data = snapshot.val();
        $('<option></option>', {
            text: data.nombre,
            val: key
        }).appendTo('#selectEmpresa');

    });
}

function cargarSelectPuesto() {
      $('#selectPuesto').html('<option value="0">Ninguna seleccionada</option>');
    refPuestos.on('child_added', function (snapshot) {
        var key = snapshot.key;
        var data = snapshot.val();
        $('<option></option>', {
            text: data.nombre,
            val: key
        }).appendTo('#selectPuesto');

    });
}

function cargarSelectSeccion() {
      $('#selectSeccion').html('<option value="0">Ninguna seleccionada</option>');
    refSeccion.on('child_added', function (snapshot) {
        var key = snapshot.key;
        var data = snapshot.val();
        $('<option></option>', {
            text: data.nombre,
            val: data.id
        }).appendTo('#selectSeccion');

    });
}

function cargarSelectCasoPractico() {
    refCasoPractico.on('child_added', function (snapshot) {
        var key = snapshot.key;
        var data = snapshot.val();
        $('<option></option>', {
            text: data.nombre,
            val: data.id
        }).appendTo('#selectCasoPractico');

    });
}

function cargarSelectPregunta() {
      $('#selectPregunta').html('<option value="0">Ninguna seleccionada</option>');
    refPreguntas.orderByKey().on('child_added', function (snapshot) {
        var key = snapshot.key;
        var data = snapshot.val();
        $('<option></option>', {
            text: data.id +'.- '+data.pregunta,
            val: data.id
        }).appendTo('#selectPregunta');

    });
}
