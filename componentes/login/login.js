var refUsuarios = fireBd.ref('usuariosAdmin');
$(document).ready(function () {
    $('#btnIniciarAdmin').click(function () {


        if ($('#textCorreoLogin').val().length > 0 && $('#textContraLogin').val().length > 0) {

            var data = {
                correo: $('#textCorreoLogin').val(),
                contra: $('#textContraLogin').val()
            }
            auten.signInWithEmailAndPassword(data.correo, data.contra).then(function (result) {
                var user = result.user;
                $('#textCorreoLogin').val('')
                $('#textContraLogin').val('')
                var refUserRegistrado = refUsuarios.child(user.uid);
                refUserRegistrado.child('estado').set('activo');
                sessionStorage.setItem("statusadmin", 'OK');
                $.getScript( "adminEstado.js?n=1");
                
            }).catch(function (error) {

                notificacionMensajeColor('No se pudo "iniciar sesión" el Correo o la Contraseña no son correctos', 'danger');

            });

        } else {
            notificacion('top', 'center', 'Introduce el correo y la contraseña ', 'warning');
        }
    });
});
