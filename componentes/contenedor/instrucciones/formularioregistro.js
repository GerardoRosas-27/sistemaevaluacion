function CrearCuenta() {

    if ($('#textCorreo').val().length != 0 && $('#textContra').val().length != 0 && $('#textRepiteContra').val().length != 0) {
        if ($('#textContra').val() == $('#textRepiteContra').val()) {
            if ($('#textContra').val().length > 6 && $('#textRepiteContra').val().length > 6) {

                var datos = {
                    correo: $('#textCorreo').val(),
                    contra: $('#textContra').val(),
                    repitecontra: $('#textRepiteContra').val(),
                    nombre: $('#textNombre').val(),
                    primerApellido: $('#textPrimerApellido').val(),
                    segundoApellido: $('#textSegundoApellido').val(),
                    edad: $('#textEdad').val(),
                    sexo: $('#textSexo').val(),
                    domicilio: $('#textDomicilio').val(),
                    ciudad: $('#textCiudad').val(),
                    celular: $('#textCelular').val(),
                    gradoEstudios: $('#textEstudios').val(),
                    especialidad: $('#textEspecialidad').val(),
                    diplomados: $('#textAreaDiplomados').val(),
                    cursos: $('#textAreaCursos').val(),
                    ingles: $('#textIngles').val(),
                    experiencia: $('#textExperiencia').val(),
                    ultimoPuesto: $('#textPuestoSimilar').val(),
                    anosUltimoPuesto: $('#textAnosPuestoSimilar').val(),
                    ultimaEmpresa: $('#textUltimaEmpresa').val()

                }
                auten.createUserWithEmailAndPassword(datos.correo, datos.contra).then(function (result) {
                    var user = result.user;
                    iniciarGuardarUsuarios(user, datos);
                    auten.setPersistence(firebase.auth.Auth.Persistence.SESSION)
                        .then(function () {
                            return firebase.auth().signInWithEmailAndPassword(datos.correo, datos.contra);
                        })
                        .catch(function (error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            console.log(errorMessage);
                        });


                }).catch(function (error) {
                    notificacion('top', 'center', 'No se Pudo crear la Sesión Intentelo más tarde porfavor', 'danger');
                });

            } else {
                notificacion('top', 'center', 'Las Contraseñas deben tener más de 6 caracteres', 'warning');
            }
        } else {
            notificacion('top', 'center', 'Las Contraseñas son desiguales', 'warning');
        }
    } else {
        notificacion('top', 'center', 'Los campos de Correo y Contraseñas son obligatorios', 'warning');
    }
}

function iniciarGuardarUsuarios(user, datos) {
    $('#estadoUsuario').removeData('id');
    $('#estadoUsuario').attr('data-id', '1');

    $('#estadoUsuario').html('<i class="material-icons">record_voice_over</i>');

    var nombre = user.displayName;
    var foto = user.photoURL;
    var correo = user.email;
    if (foto == null) {
        var foto = './assets/img/Plantilla-desempeno.png';
    }
    if (nombre == null) {
        nombre = datos.nombre;
    }
    if (correo == null) {
        correo = datos.correo;
    }
    $('#usuarioNombre').text(nombre);
    $('#usuarioCorreo').text(correo);
    $('#avatar').html('<img src="' + foto + '" alt="Circle Image" class="img-raised rounded-circle img-fluid"><h4 style="text-align: center;position:relative;top:-80px;">' + nombre + '</h4>');
    var obj = Object.assign(user, datos);
    var data = {
        estado: "activo",
        uid: user.uid,
        nombre: nombre,
        correo: correo,
        foto: foto,
        primerApellido: datos.primerApellido,
        segundoApellido: datos.segundoApellido,
        edad: datos.edad,
        sexo: datos.sexo,
        domicilio: datos.domicilio,
        ciudad: datos.ciudad,
        celular: datos.celular,
        gradoEstudios: datos.gradoEstudios,
        especialidad: datos.especialidad,
        diplomados: datos.diplomados,
        cursos: datos.cursos,
        ingles: datos.ingles,
        experiencia: datos.experiencia,
        ultimoPuesto: datos.ultimoPuesto,
        anosUltimoPuesto: datos.anosUltimoPuesto,
        ultimaEmpresa: datos.ultimaEmpresa
    }

    refUsuarios.child(user.uid).set(data, function (error) {
        if (error) {
            notificacionMensaje('Error los datos no se pudieron guardar');
        } else {
            sessionStorage.setItem("estatus", 'OK');
            sessionStorage.setItem("index", 'eleccion');
            controlAccionesIndex();
            camviarBtn('AccionEleccion', 'preguntas', 'info', 'Comenzar Evaluación');

            notificacionMensajeColor('Sesión Iniciada', 'success');

        }
    });
    //recargarSelectModal();
    //recargarSelect();
}
