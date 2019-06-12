var refEvaluacion = fireBd.ref('evaluacion');
var refResultados = fireBd.ref('resultados');
var refUsuarios = fireBd.ref('usuarios');

$(document).ready(function(){
    sessionStorage.setItem("instru", 1);
  $('#contInstruciones').load('componentes/contenedor/instrucciones/instruccion1.html');
  $.getScript( "componentes/contenedor/instrucciones/controlInstrucciones.js?n=1");
});

function SiguienteInstruccion(element) {

    var instrucion = $(element).data('instru');

    switch (instrucion) {
       
        case 1:
             sessionStorage.setItem("instru", 2);
            $('#contInstruciones').load('componentes/contenedor/instrucciones/formularioregistro.html');
          $.getScript( "componentes/contenedor/instrucciones/controlInstrucciones.js?n=1");
            break;
        case 2:
             sessionStorage.setItem("instru", 3);
           //$('#contInstruciones').load('componentes/contenedor/instrucciones/instruccion3.html');
          $.getScript( "componentes/contenedor/instrucciones/controlInstrucciones.js?n=1");
           
            break;
        case 3:
            sessionStorage.setItem("instru", 4);
            $('#contInstruciones').load('componentes/contenedor/instrucciones/instruccion4.html');
           $.getScript( "componentes/contenedor/instrucciones/controlInstrucciones.js?n=1");
            break;
        default:
 notificacionDefault();
            break;
    }

}
$('#iniciarSesion').click(function(){
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
                sessionStorage.setItem("instru", 1);
                    sessionStorage.setItem("estatus", 'OK');
                $.getScript( "componentes/contenedor/instrucciones/controlInstrucciones.js?n=1");
                  notificacion('top', 'center', 'Sesión Iniciada', 'success');

        }).catch(function (error) {
          
            notificacion('top', 'center', 'No se Pudo Iniciar Sesión Intentelo más tarde porfavor','danger');

        });
     
        } else {
            notificacion('top', 'center', 'Introduce el correo y la contraseña ','warning');
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
       sessionStorage.removeItem('instru');
        location.href ="index.html";

        notificacion('top', 'center', 'Sesión cerrada', 'success');

    }).catch(function (error) {

        notificacion('top', 'center', 'No se Pudo cerrar la Sesión', 'danger');
    });
}


