/*----------Referencias al la base de firebase-----------*/
var refEvaluacion = fireBd.ref('evaluacion');
var refResultados = fireBd.ref('resultados');
var refUsuarios = fireBd.ref('usuarios');

//funcion que recuerde si el usuario ya esta contestando la evaluacion 
//o encaso de que se balla la conecion recordar la seccion y la pregunta en queiva.

$('#btnComenzar').click(function () {
    var estadoUser = $('#estadoUsuario').data('id');
    if (estadoUser == 0) {
        $('#ModalIniciarSeccion').modal('show');
    } else {
        if (estadoUser == 1) {
            var Puesto = $('#selectPuestoEvaluacion').val();
            if (Puesto == 0) {
                $('#selectPuestoEvaluacion').css("color", "#ff3030")
                $('#selectPuestoEvaluacion').click(function () {
                    $(this).css("color", "#313131");
                });

     showNotification('top', 'center', 'Para comenzar selecione un puesto','warning');
         
            } else {


                consultaSeccion(Puesto, 1, 1);
                //consultaPregunta(Puesto,1);
            }
        }
    }



});

function consultaSeccion(Puesto, seccion, pregunta) {

    var refPuesto = refEvaluacion.child(Puesto);
    var refConsulSeccion = refPuesto.child(seccion);
    refConsulSeccion.on('value', function (snapshot) {
        var data = snapshot.val();
        var id = snapshot.key;
        //alert(id+' || '+data.nombre);

        $('#seccionDescripcion').html(crearSeccion(data, id));

        if (seccion == 1) {
            removeAllChilds('sePuesto');
        }

        $('#areaBotones').html('<button data-puesto="' + Puesto + '" data-seccion="' + seccion + '" data-cantidad="' + data.cantidadPreguntas + '" data-id="' + pregunta + '" onClick="siguientePregunta(this)" type="button" class="btn btn-success btn-lg"><i class="material-icons">touch_app</i>Siguiente</button>');
    });
};

function siguientePregunta(elemento) {

    var objeto = {
        puesto: $(elemento).data('puesto'),
        seccion: $(elemento).data('seccion'),
        id: $(elemento).data('id'),
        cantidad: $(elemento).data('cantidad')
    }
    consultaPregunta(objeto);
}

function consultaPregunta(objeto) {
    var refPuesto = refEvaluacion.child(objeto.puesto);
    var refSeccion = refPuesto.child(objeto.seccion);
    var refPreguntas = refSeccion.child('preguntas');
    var refPregunta = refPreguntas.child(objeto.id);
    console.log(objeto);
    refPregunta.on('value', function (snapshot) {
        var data = snapshot.val();
        var id = snapshot.key;

        if (objeto.id <= objeto.cantidad) {
  
            var numeroPregunta = objeto.id + 1;
           
            removeAllChilds('seccionDescripcion');
            $('#contenedorPreguntas').html(crearPregunta(data, id, objeto));
            $('#contenedorRespuestas').html(crearRespuestas(objeto));
            $('#areaBotones').html('<button data-puesto="' + objeto.puesto + '" data-seccion="' + objeto.seccion + '" data-cantidad="' + objeto.cantidad + '" data-id="' + numeroPregunta + '" onClick="siguientePregunta(this)" id="bottonPregunta" class="btn btn-success btn-lg"><i class="material-icons">touch_app</i>Siguiente</button>');
            
            if(parseInt(numeroPregunta) >= 1 && parseInt(numeroPregunta) <= 5){
                localStorage.setItem("tiempo", 20);
                $('#BarraTiempo').load('componentes/barraTiempo/tiempo.html');
        }
        } else {
            removeAllChilds('contenedorPreguntas');
            removeAllChilds('contenedorRespuestas');
            consultaSeccion(objeto.puesto, objeto.seccion + 1, 1);

        }

    });
};


/*----------funcion crear elementos -----------*/
function crearSeccion(data, id) {

    var html = '<h2 class="title">Parte' + id + ' </h2><h3 class="title">' + data.nombre + '</h3><h4>Recomendaciones</h4><div class="description text-justify"><p>' + data.descripcion + '</p></div>';
    return html;
}

function crearPregunta(data, id) {


    var html = '<div class="col-12"><h3>' + id + '.- ' + data.pregunta + '</h3></div>';

    return html;
}

function crearRespuestas(objeto) {
    var html = '';
    var refPuesto = refEvaluacion.child(objeto.puesto);
    var refSeccion = refPuesto.child(objeto.seccion);
    var refPreguntas = refSeccion.child('preguntas');
    var refPregunta = refPreguntas.child(objeto.id);
    var refRespuestas = refPregunta.child('respuestas/DataRes');
    refRespuestas.on('child_added', function (snapshot) {
        var key = snapshot.key;
        var data = snapshot.val();

        html += '<div class="col-12 form-check form-check-radio"><label class="form-check-label mx-4 radioPreguntas"><input class="form-check-input" type="radio" name="exampleRadios" id="res' + key + '" value="' + key + '" ><p id="radioTexto">' + data.nombre + '</p><span class="circle"><span class="check"></span></span></label></div>';
    });
    return html;
}
//-----
$('#btnModalSeccion').click(function () {
    $('#ModalIniciarSeccion').modal('show');

});

$('#btnModalPuesto').click(function () {

    $('#ModalGuardarPuesto').modal('show');
});

//Insertar preguntas prueba
$('#btnGuardarPuesto').click(function () {

    var Data = {
        puesto: $('#textNivelPuesto').val(),
        numero: $('#textNumeroSeccion').val(),
        seccion: $('#textParteSeccion').val(),
        descripcion: $('#textDescripcionSeccion').val(),
        tiempo: $('#textTiempoSeccion').val(),
        cantidadPreSeccion: $('#textCantidadPreguntas').val(),
        numeroPre: $('#textNumeroPregunta').val()

    };
    guardarDatosPuesto(Data);

});
$('#btnModalPreguntas').click(function () {

    $('#ModalGuardarPreguntas').modal('show');
});
$('#btnGuardarPreguntas').click(function () {


    var Data = {
        puesto: $('#selectPuesto').val(),
        seccion: $('#selectSeccion').val(),
        numeroPre: $('#textNumeroPregunta').val(),
        tiempo: $('#textTiempoPregunta').val(),
        pregunta: $('#textPregunta').val(),
        cantRes: $('#textCantidadRespuestas').val()

    };
    var cant = parseInt($('#textCantidadRespuestas').val());

    var arrayCant = new Array(cant);
    for (var i = 1; i <= cant; i++) {
        arrayCant[i] = new Array(2);

        arrayCant[i][0] = $('#espacioRespuestas').children('div:nth-of-type(' + i + ')').children('div:nth-of-type(1)').children('input').val();
        arrayCant[i][1] = $('#espacioRespuestas').children('div:nth-of-type(' + i + ')').children('div:nth-of-type(2)').children('input').val();
    }
    var DataRespuestas = toObject(arrayCant, cant);
    console.log(DataRespuestas);

    function toObject(arrayCant, cant) {
        var respuesta = {};
        for (var i = 1; i <= cant; ++i)
            respuesta[i] = {
                'nombre': arrayCant[i][0],
                'valor': arrayCant[i][1]

            }
        return respuesta;
    }

    //+' || '+arrayCant[1][0]+' || '+arrayCant[2][0]);
    guardarDatosPreguntas(Data, DataRespuestas);

});

$('#GenerarTextRespuestas').click(function () {
    var cant = parseInt($('#textCantidadRespuestas').val());
    var htmlTextRespuestas = '';

    for (var i = 1; i <= cant; i++) {
        htmlTextRespuestas += '<div class="row"><div class="col-12 col-md-6 my-2"><label for="inputCity">Respuesta ' + i + '</label><input type="text" class="form control" ></div><div class="col-12 col-md-4 my-2"><label for="inputCity">Valor ' + i + '</label><input type="text" class="form control"></div></div>';
    };
    $('#espacioRespuestas').html(htmlTextRespuestas);

});

$('#selectPuesto').change(function () {
    removeAllChilds('selectSeccion');
    var puesto = $(this).val();
    var refPuesto = refEvaluacion.child(puesto);
    refPuesto.on('child_added', function (snapshot) {
        var key = snapshot.key;
        var data = snapshot.val();

        $('<option></option>', {
            text: data.nombre,
            val: key
        }).appendTo('#selectSeccion');

    });
});

function recargarSelect() {
    refEvaluacion.on('child_added', function (snapshot) {
        var key = snapshot.key;

        $('<option></option>', {
            text: key,
            val: key
        }).appendTo('#selectPuestoEvaluacion');

    });
}
/*-----Evento child_changed Detecta y Actualiza nuevos datos-------
refCursos.on("child_changed", function (snapshot) {
    var elementActualizar = document.getElementById(snapshot.key);
    elementActualizar.innerHTML = crearHtml(snapshot.val(), snapshot.key);
});
*/
/*-----Evento child_removed Detecta y Elimina nuevos datos-------
refCursos.on("child_removed", function (snapshot) {
    var elementEliminar = document.getElementById(snapshot.key);
    elementEliminar.remove();
});
*/
/*----------funcion crear elementos con datos-----------*/

/****************************************************************
 *****************---Modelo de funciones---***********************************************************
 ************************************************************/

function removeAllChilds(a) {
    var a = document.getElementById(a);
    while (a.hasChildNodes())
        a.removeChild(a.firstChild);
}

function removeClild(elemto) {
    var elemto = document.getElementById(elemto);
    elemto.removeChild(elemto);
}


function guardarDatosPuesto(Data) {

    var refPuesto = refEvaluacion.child(Data.puesto);
    var refSeccion = refPuesto.child(Data.numero);
    refSeccion.set({
        descripcion: Data.descripcion,
        nombre: Data.seccion,
        tiempo: Data.tiempo,
        cantidadPreguntas: Data.cantidadPreSeccion
    });

}

function guardarDatosPreguntas(Data, DataRes) {

    var refPuesto = refEvaluacion.child(Data.puesto);
    var refSeccion = refPuesto.child(Data.seccion);
    var refPreguntas = refSeccion.child('preguntas');
    var refPregunta = refPreguntas.child(Data.numeroPre);
    refPregunta.set({
        tiempo: Data.tiempo,
        pregunta: Data.pregunta,
        cantidadRes: Data.cantRes
    });
    refPregunta.child('respuestas').set({
        DataRes
    })
}

function recargarSelectModal() {

    refEvaluacion.on('child_added', function (snapshot) {
        var key = snapshot.key;
        $('<option></option>', {
            text: key,
            val: key
        }).appendTo('#selectPuesto');

        var data = snapshot.val();
        console.log(key + ' || ' + data);
    });
}



$('#btnCrearCuenta').click(function () {

    $('#contenedorSesion').html('<div class="form-row"><div class="form-group col-12"><span class="input-group-text"><i class="material-icons">face</i><input type="text" class="form-control"  placeholder="Nombre..." required></span></div></div><div class="form-row"><div class="form-group col-12"><span class="input-group-text"><i class="material-icons">mail</i><input type="text" class="form-control"  placeholder="Correo..." required></span></div></div> <div class="form-row"><div class="form-group col-12"><span class="input-group-text"><i class="material-icons">lock_outline</i><input id="textContra" type="password" class="form-control" placeholder="ContraseÃ±a..." required></span></div></div> <div class="form-row"><div class="form-group col-12"><span class="input-group-text"><i class="material-icons">lock_outline</i><input type="password" class="form-control" placeholder="Repite tu ContraseÃ±a..." required></span></div></div>');

    var btnEliminar = $('#btnCrearCuenta');
    btnEliminar.remove();
    var btnIniciar = $('#btnIniciarCuenta');
    btnIniciar.removeData('id');
    btnIniciar.attr('data-id', 'crearIniciar');

});
$('#btnIniciarCuenta').click(function () {
    var estado = $(this).data('id');
    if (estado == 'iniciar') {

        if ($('#textCorreo').val().length > 0 && $('#textContra').val().length > 0) {

            var data = {
                estado: 1,
                correo: $('#textCorreo').val(),
                contra: $('#textContra').val()
            }
            iniciarCuentaUsuario(data);

        } else {
            showNotification('top', 'center', 'El correo o la contraseña no son correctos','warning');
        }
    } else {
        if (estado == 'crearIniciar') {
            var padre = $(this).parent('div');
            var hermano = $(padre).siblings('div');
            var hijo1 = $(hermano).children('div:nth-of-type(1)').children('div');
            var nombre = $(hijo1).children('span').children('input');
            var hijo2 = $(hermano).children('div:nth-of-type(2)').children('div');
            var correo = $(hijo2).children('span').children('input');
            var hijo3 = $(hermano).children('div:nth-of-type(3)').children('div');
            var contra1 = $(hijo3).children('span').children('input');
            var hijo4 = $(hermano).children('div:nth-of-type(4)').children('div');
            var contra2 = $(hijo4).children('span').children('input');


            if (nombre.val().length > 0 && correo.val().length > 0 && contra1.val().length > 0 && contra2.val().length > 0) {


                if (contra1.val() == contra2.val()) {
                    if (contra1.val().length > 6) {
                        var data = {
                            estado: 2,
                            nombre: nombre.val(),
                            correo: correo.val(),
                            contra1: contra1.val(),
                            contra2: contra2.val()
                        }
                        iniciarCuentaUsuario(data);
                    } else {
                showNotification('top', 'center', 'La Contraseñasa debe contar con más de 6 caracteres','warning');
                    }
                } else {
                   
                     showNotification('top', 'center', 'los datos no coinciden','warning');

                }


            } else {

            showNotification('top', 'center', 'Faltan Algunos Datos','warning');
            }

        }
    }

});
$('#iniciarSesion').click(function () {
    var estado = $('#estadoUsuario').data('id');
    if (estado == 0) {
        $('#ModalIniciarSeccion').modal('show');
    }

});

function iniciarCuentaUsuario(data) {
    if (data.estado == 1) {
        auten.signInWithEmailAndPassword(data.correo, data.contra).then(function (result) {

            var user = result.user;

            iniciarGuardarUsuarios(user, "");


        }).catch(function (error) {
          
            showNotification('top', 'center', 'No se Pudo Iniciar Sesión Intentelo más tarde porfavor','danger');

        });

    } else {
        if (data.estado == 2) {

            auten.createUserWithEmailAndPassword(data.correo, data.contra1).then(function (result) {
                var user = result.user;
                iniciarGuardarUsuarios(user, data.nombre);

            }).catch(function (error) {

            showNotification('top', 'center', 'No se Pudo crear la Sesión Intentelo más tarde porfavor','danger');

            });

        }
    }
}
var provider = new firebase.auth.GoogleAuthProvider();
$('#iniciarSesionGoogle').click(function () {

    auten.signInWithPopup(provider).then(function (result) {

        var user = result.user;
        if (user.emailVerified == true) {
            iniciarGuardarUsuarios(user, "");
        }

    }).catch(function (error) {
        // Handle Errors here.
        /*
  var errorCode = error.code;
  var errorMessage = error.message;
  */
            showNotification('top', 'center', 'No se Pudo Iniciar Sesión con google Intentelo más tarde porfavor','danger');

        // ...
    });
});

function iniciarGuardarUsuarios(user, nombreCrear) {
    $('#ModalIniciarSeccion').modal('hide');
     showNotification('top', 'center', 'Sesión Iniciada','success');

    $('#estadoUsuario').removeData('id');
    $('#estadoUsuario').attr('data-id', '1');

    $('#estadoUsuario').html('<i class="material-icons">record_voice_over</i>');

    var nombre = user.displayName;
    var foto = user.photoURL;
    if (foto == null) {
        var foto = './assets/img/Plantilla-desempeno.png';
    }
    if (nombre == null) {
        nombre = nombreCrear;
    }
    $('#usuarioNombre').text(nombre);
    $('#usuarioCorreo').text(user.email);
    $('#avatar').html('<img src="' + foto + '" alt="Circle Image" class="img-raised rounded-circle img-fluid"><h4 style="text-align: center;position:relative;top:-80px;">' + nombre + '</h4>');
    var data = {
        estado: "activo",
        uid: user.uid,
        nombre: nombre,
        correo: user.email,
        foto: foto
    }

    refUsuarios.child(user.uid).set(data);
    recargarSelectModal();
    recargarSelect();
}

function cerrarSesion() {
    auten.signOut().then(function () {

      showNotification('top', 'center', 'Sesión cerrada','success');
     
    }).catch(function (error) {
        
            showNotification('top', 'center', 'No se Pudo cerrar la Sesión','danger');
    });
}
/////escuchador de sesiones de usuarios
/*
auten.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  
    alert(user.email);
    
    // ...
  } else {
    // User is signed out.
   alert("desconetado");
  }
});
*/
/*
auten.setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function(resul) {
    console.log(resul.user);
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    //return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
*/