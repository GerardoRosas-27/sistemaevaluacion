var refEvaluacionAdminIndex = fireBd.ref('evaluacionAdmin');
var refEmpresa = fireBd.ref('empresas');
var refPuestos = fireBd.ref('puestos');
//var refResultados = fireBd.ref('resultados');
var refUsuarios = fireBd.ref('usuarios');


$(document).ready(function () {
    var accion = sessionStorage.getItem("index");
    if (accion == null) {
        sessionStorage.setItem("index", 'instruccion');
        controlAccionesIndex();

    } else {
        controlAccionesIndex();
    }
  
});

function controlAccionesIndex() {
    var instruccion = sessionStorage.getItem("index");
    switch (instruccion) {

        case 'instruccion':
            $('#contInstruciones').load('componentes/contenedor/instrucciones/instruccion.html');

            break;
        case 'registro':
            camviarBtn('CrearCuenta','registro','success','Crear Cuenta'); $('#contInstruciones').load('componentes/contenedor/instrucciones/formularioregistro.html');
            $.getScript("componentes/contenedor/instrucciones/formularioregistro.js?n=1");
            
            break;
        case 'eleccion':
            $('#contInstruciones').load('componentes/contenedor/instrucciones/eleccion.html');
            $.getScript("componentes/contenedor/instrucciones/eleccion.js?n=1");
            break;
        case 'preguntas':
            $('#contInstruciones').load('componentes/contenedor/preguntas/preguntas.html');
            $.getScript("componentes/contenedor/preguntas/preguntas.js?n=1");
            break;
        default:
            notificacionDefault();
            break;
    }
}

function btnAccionIndex(element) {
    var instruccion = $(element).data('accion');
    sessionStorage.setItem("index", instruccion);
    controlAccionesIndex();
}
function camviarBtn(fun,accion,color,mensaje){
    $('#areaBotones').html('<button onClick="'+fun+'(this)" data-accion="'+ accion +'" type="button" class="btn btn-'+color+' btn-lg my-4"><i class="material-icons">touch_app</i>'+mensaje+'<div class="ripple-container"></div></button>');
}

//iniciar session
$('#iniciarSesion').click(function () {
    $('#ModalIniciarSeccion').modal('show');
});
$('#btnIniciarCuenta').click(function () {

    if ($('#textCorreoInicio').val().length > 0 && $('#textContraInicio').val().length > 0) {

        var data = {
            correo: $('#textCorreoInicio').val(),
            contra: $('#textContraInicio').val()
        }
        auten.signInWithEmailAndPassword(data.correo, data.contra).then(function (result) {
            var user = result.user;

            $('#textCorreoInicio').val('')
            $('#textContraInicio').val('')
            $('#ModalIniciarSeccion').modal('hide');

            var refUserRegistrado = refUsuarios.child(user.uid);
            refUserRegistrado.child('estado').set('activo');
            refUserRegistrado.on('value', function (snapshot) {
                var data = snapshot.val();

                $('#estadoUsuario').html('<i class="material-icons">record_voice_over</i>');
                $('#usuarioNombre').text(data.nombre);
                $('#usuarioCorreo').text(data.correo);
                $('#avatar').html('<img src="' + data.foto + '" alt="Circle Image" class="img-raised rounded-circle img-fluid"><h4 style="text-align: center;position:relative;top:-80px;">' + data.nombre + '</h4>');
            });
            sessionStorage.setItem("index", 'eleccion');
            sessionStorage.setItem("estatus", 'OK');
            controlAccionesIndex();
            camviarBtn('AccionEleccion','preguntas','info','Comenzar Evaluación');

            notificacion('top', 'center', 'Sesión Iniciada', 'success');

        }).catch(function (error) {
            notificacion('top', 'center', 'Sus datos no coinciden. No se Pudo Iniciar Sesión Intentelo más tarde porfavor', 'danger');
        });

    } else {
        notificacion('top', 'center', 'Introduce el correo y la contraseña ', 'warning');
    }
});

//Serrar sesion
function cerrarSesion() {
    var userA = auten.currentUser;
    if (userA) {
        refUsuarios.child(userA.uid).child('estado').set('inactivo');
    }
    auten.signOut().then(function () {
        sessionStorage.removeItem('estatus');
        sessionStorage.removeItem('index');
        location.href = "index.html";

        notificacion('top', 'center', 'Sesión cerrada', 'success');

    }).catch(function (error) {

        notificacion('top', 'center', 'No se Pudo cerrar la Sesión', 'danger');
    });
}
