$(document).ready(function () {
    var empresa = sessionStorage.getItem("IndexEmpresa");
    var puesto = sessionStorage.getItem("IndexPuesto");
    consultaSeccion(empresa, puesto, 1)
    consultaPuestoIndex(empresa, puesto).then(function (result) {
        sessionStorage.setItem("IndexCantSecciones", result);
        console.log(result);
    }, function (err) {
        console.log('resuelta consulta puesto index: ' + err); //  Error: "It broke"
    });
 sessionStorage.removeItem('SumaPregCaso');
});

function consultaSeccion(empresa, Puesto, seccion) {
    consultaSeccionIndex(empresa, Puesto, seccion).then(function (result) {
        console.log(result);
        sessionStorage.setItem("IndexSeccion", result.datos.id);
        if (result.EstadoCaso.caso == 'SI') {
            sessionStorage.setItem("SeccionCaso", "SI");
            sessionStorage.setItem("IndexCaso", 1);
            sessionStorage.setItem("IndexCantidadSeccion", result.CantPreguntasSeccion.cant);

        } else {
            if (result.EstadoCaso.caso == 'NO') {
                sessionStorage.setItem("SeccionCaso", "NO");
                sessionStorage.setItem("IndexCantidadSeccion", result.CantPreguntasSeccion.cant);

            } else {
                console.log("error desicion de caso de uso no hay");
            }

        }
        var instrucciones = '';
        result.datos.instrucciones.forEach(snap => {
            console.log(snap)
            instrucciones += '<li class="text_responsive my-2">' + snap + '</li>';
        });

        $('#descriccion').html('<div class="name"><h2 class="title text_responsive">' + result.datos.nombre + '</h2><h3 class="title text_responsive">' + result.datos.titulo + '</h3><h4 class="text_responsive">' + result.datos.tituloinstruccion + '</h4><div class="text-justify"><ol>' + instrucciones + '</ol></div></div>');

    }, function (err) {
        console.log('resuelta consulta seccion index: ' + err); //  Error: "It broke"
    });
};


function consultaSeccionIndex(empresa, puesto, seccion) {
    return new Promise(function (resolve, reject) {
        if (resolve) {
            var NumSeccion = refEvaluacionAdminIndex.child(empresa).child(puesto).child(seccion);
            NumSeccion.once('value').then(function (snapshot) {
                console.log(snapshot.key)
                resolve(snapshot.val());
            });

        } else {
            reject(Error("error de promesa consulta seccion index"));
        }
    });
}

function consultaPuestoIndex(empresa, puesto) {
    return new Promise(function (resolve, reject) {
        if (resolve) {
            var NumPuesto = refEvaluacionAdminIndex.child(empresa).child(puesto);
            NumPuesto.child('CantSecciones').once('value').then(function (snapshot) {
                console.log(snapshot.key)
                resolve(snapshot.val().cant);
            });

        } else {
            reject(Error("error de promesa consulta puesto index"));
        }
    });
}

function consultaCasoIndex(empresa, puesto, seccion, caso) {
    return new Promise(function (resolve, reject) {
        if (resolve) {
            var NumCaso = refEvaluacionAdminIndex.child(empresa).child(puesto).child(seccion).child('caso').child('casos').child(caso);
            NumCaso.once('value').then(function (snapshot) {
                console.log(snapshot.key)
                resolve(snapshot.val());
            });

        } else {
            reject(Error("error de promesa consulta caso index"));
        }
    });
}

function consultaCaso(empresa, puesto, seccion, caso) {
    consultaCasoIndex(empresa, puesto, seccion, caso).then(function (result) {
        console.log(result);
        sessionStorage.setItem('IndexCantPregCaso', result.CantPreguntasCaso.cant);
        var sumaPreg = sessionStorage.getItem('SumaPregCaso')
        if (sumaPreg == null) {
            sessionStorage.setItem('SumaPregCaso', result.CantPreguntasCaso.cant)
        } else {
            sessionStorage.setItem('SumaPregCaso', parseInt(result.CantPreguntasCaso.cant) + parseInt(sumaPreg));
        }
        console.log(sessionStorage.getItem('SumaPregCaso'))
        $('#descriccion').html('<div class="name"><h2 class="title text_responsive">' + result.datos.nombre + '</h2><h4 class="text_responsive">' + result.datos.descripcion + '</h4></div>');
        var otroCaso = parseInt(sessionStorage.getItem("IndexCaso"));
        
        sessionStorage.setItem("IndexCaso", otroCaso + 1)
        sessionStorage.setItem("SeccionCaso", 'Mostrado');
    }, function (err) {
        console.log('resuelta consulta caso index: ' + err); //  Error: "It broke"
    });
};

function AccionesPregunta() {
    var caso = sessionStorage.getItem("SeccionCaso");
    switch (caso) {
        case 'SI':
         
            var NumResPregunta = sessionStorage.getItem('numPregunta')
            camviarBtn('Preguntas', NumResPregunta, 'success', 'Siguiente');
            $('#contenedorPreguntas').html('');
            $('#contenedorRespuestas').html('');
            var casoEmpresa = sessionStorage.getItem('IndexEmpresa')
            var casoPuesto = sessionStorage.getItem('IndexPuesto')
            var casoSeccion = parseInt(sessionStorage.getItem('IndexSeccion'))
            var casoCaso = parseInt(sessionStorage.getItem("IndexCaso"));

            consultaCaso(casoEmpresa, casoPuesto, casoSeccion, casoCaso);
            sessionStorage.setItem("IndexCasoActul", casoCaso);
            break;
        case 'NO':
            var objeto = {
                empresa: sessionStorage.getItem('IndexEmpresa'),
                puesto: sessionStorage.getItem('IndexPuesto'),
                cantSeccionesP: parseInt(sessionStorage.getItem("IndexCantSecciones")),
                seccion: parseInt(sessionStorage.getItem('IndexSeccion')),
                id: parseInt(sessionStorage.getItem('numPregunta')),
                cantPregSeccion: parseInt(sessionStorage.getItem('IndexCantidadSeccion'))
            }
            consultaPreguntaSinCaso(objeto);

            break;
        case 'Mostrado':
            var pregunta = sessionStorage.getItem('numPregunta');
            
            var Numcaso = sessionStorage.getItem("IndexCasoActul")

            var objeto = {
                empresa: sessionStorage.getItem('IndexEmpresa'),
                puesto: sessionStorage.getItem('IndexPuesto'),
                cantSeccionesP: parseInt(sessionStorage.getItem("IndexCantSecciones")),
                caso : parseInt(Numcaso),
                seccion: parseInt(sessionStorage.getItem('IndexSeccion')),
                id: parseInt(pregunta),
                cantPregSeccion: parseInt(sessionStorage.getItem('IndexCantidadSeccion')),
                cantPregCaso: parseInt(sessionStorage.getItem('IndexCantPregCaso')),
                cantTotalPregCasos: parseInt(sessionStorage.getItem('SumaPregCaso')),
            }
            consultaPreguntaConCaso(objeto);
            
            break;
    }
}
function crearBtnCaso(caso,pregunta){
     $('#areaBotones').html('<button onClick="MostrarCaso(this)" data-caso="' + caso + '" type="button" class="btn btn-info mx-2 my-4"><i class="material-icons">touch_app</i>Caso Práctico<div class="ripple-container"></div></button><button onClick="Preguntas(this)" data-accion="' + pregunta + '" type="button" class="btn btn-success mx-2 my-4"><i class="material-icons">touch_app</i>Siguiente<div class="ripple-container"></div></button>');
}
function MostrarCaso(element) {
    var resta = (parseInt(sessionStorage.getItem('SumaPregCaso'))) -(parseInt(sessionStorage.getItem('IndexCantPregCaso')));
    sessionStorage.setItem('SumaPregCaso',resta)
    var NumCaso = $(element).data('caso');
    sessionStorage.setItem("SeccionCaso", 'SI');
    sessionStorage.setItem("IndexCaso", NumCaso);
    AccionesPregunta();
}

function Preguntas(accion) {
    var accion = $(accion).data('accion');
    sessionStorage.setItem('numPregunta', accion);
    AccionesPregunta();
}

function consultaPreguntaSinCaso(objeto) {
    refEvaluacionAdminIndex.child(objeto.empresa).child(objeto.puesto).child(objeto.seccion).child('caso').child('preguntas').child(objeto.id).on('value', function (snapshot) {
        var data = snapshot.val();
        var id = snapshot.key;

        if (objeto.id <= objeto.cantPregSeccion) {
            var numeroPregunta = objeto.id + 1;
            sessionStorage.setItem('numPregunta', numeroPregunta)
            $('#descriccion').html('');
            $('#contenedorPreguntas').html(crearPregunta(data));
            $('#contenedorRespuestas').html(crearRespuestas(data));
            camviarBtn('Preguntas', numeroPregunta, 'success', 'Siguiente');
            if (numeroPregunta >= 1 && numeroPregunta <= objeto.cantPregSeccion) {
                localStorage.setItem("tiempo", 20);
                $('#BarraTiempo').load('componentes/barratiempo/Tiempo.html');
            }
        } else {
           
            if ((objeto.seccion + 1) <= objeto.cantSeccionesP) {
                $('#BarraTiempo').html('');
                $('#contenedorPreguntas').html('');
                $('#contenedorRespuestas').html('');
                camviarBtn('Preguntas', 1, 'info', 'Siguiente');
                consultaSeccion(objeto.empresa, objeto.puesto, objeto.seccion + 1);
            } else {
                $('#BarraTiempo').html('');
                $('#contenedorPreguntas').html('<h3 text-center>Felicidades has finalizado la evaluación</h3><button onClick="resultados()" class="btn btn-success mx-4">Resultados</button>');
                $('#contenedorRespuestas').html('');
                camviarBtn('otraEvaluaccion', '', 'info', 'Realizar otra evaluacíon');
            }
        }
    });
};

function consultaPreguntaConCaso(objeto) {
    refEvaluacionAdminIndex.child(objeto.empresa).child(objeto.puesto).child(objeto.seccion).child('caso').child('casos').child(objeto.caso).child('preguntas').child(objeto.id).on('value', function (snapshot) {
        var data = snapshot.val();
        var id = snapshot.key;

        if (objeto.id <= objeto.cantPregCaso) {
            var numeroPregunta = objeto.id + 1;
            //sessionStorage.setItem('numPregunta', numeroPregunta)
            $('#descriccion').html('');
            $('#contenedorPreguntas').html(crearPregunta(data));
            $('#contenedorRespuestas').html(crearRespuestas(data));
            crearBtnCaso(objeto.caso,numeroPregunta);
            if (numeroPregunta >= 1 && numeroPregunta <= objeto.cantPregSeccion) {
                localStorage.setItem("tiempo", 20);
                $('#BarraTiempo').load('componentes/barratiempo/Tiempo.html');
            }
        } else {
            console.log(objeto.cantTotalPregCasos+ ' = ' + objeto.cantPregSeccion)
            if(objeto.cantTotalPregCasos == objeto.cantPregSeccion){
                
                 console.log('num seccion: ' + objeto.seccion +1);
            console.log('cantidad secciones: ' + objeto.cantSeccionesP);
            if ((objeto.seccion + 1) <= objeto.cantSeccionesP) {
                $('#BarraTiempo').html('');
                $('#contenedorPreguntas').html('');
                $('#contenedorRespuestas').html('');
                camviarBtn('Preguntas', 1, 'info', 'Siguiente');
                consultaSeccion(objeto.empresa, objeto.puesto, objeto.seccion + 1);
            } else {
                $('#BarraTiempo').html('');
               
                $('#contenedorPreguntas').html('<h3 text-center>Felicidades has finalizado la evaluación</h3><button onClick="resultados()" class="btn btn-success mx-4">Resultados</button>');
                $('#contenedorRespuestas').html('');
                camviarBtn('otraEvaluaccion', '', 'info', 'Realizar otra evaluacíon');
            }
 
            }else{
                
                sessionStorage.setItem('numPregunta',1)
                  sessionStorage.setItem("SeccionCaso",'SI');
                AccionesPregunta()
            }
            
        }
    });
};
function resultados(){
     location.href ="resultados.html";
}

function otraEvaluaccion(elemnt) {
    sessionStorage.setItem("estatus", 'OK');
    sessionStorage.setItem("index", 'eleccion');
    controlAccionesIndex();
    camviarBtn('AccionEleccion', 'preguntas', 'info', 'Comenzar Evaluación');
}

function crearPregunta(data) {
    var html = '<div class="col-12"><h3 class="text_responsive">' + data.id + '.- ' + data.pregunta + '</h3></div>';
    return html;
}

function crearRespuestas(data) {
    console.log(data);
    var html = '';
    var cont = 1;
    data.respuestas.forEach(respuesta => {
        console.log(respuesta)
        html += '<div class="col-12 form-check form-check-radio"><label class="form-check-label mx-4 radioPreguntas"><input class="form-check-input" type="radio" name="exampleRadios" value="' + cont + '"><p  class="radioTexto text_responsive">' + respuesta.nombre + '</p><span class="circle"><span class="check"></span></span></label></div>';
        cont++;
    });
    return html;
}
