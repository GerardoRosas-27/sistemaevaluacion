var refUsuariosAdmin = fireBd.ref('usuariosAdmin');
$(document).ready(function () {
    var userA = auten.currentUser;
    if (userA) {
        var estatus = sessionStorage.getItem("statusadmin");
        if (estatus != null) {
            refUsuariosAdmin.child(userA.uid).on('value', function (snapshot) {
                if (userA.uid == snapshot.key) {
                    if (snapshot.val().estado == 'activo') {
                        sessionStorage.setItem('entrar','OK');
                        $('#contPrincipalAdmin').load('componentes/admin/contenidoAdmin.html');
                        notificacionMensajeColor('Sesión Iniciada', 'success');
                    }
                }
            }, function (erro) {
                if( sessionStorage.getItem('entrar') == null){
                      notificacionMensajeColor('Tu cuenta no cuenta con los permisos nesesarios', 'danger');
                }else{
                    var noti = sessionStorage.getItem('notificacionesAdmin');
                   if (noti != null || noti != 'FALSO') {
                   notificacionMensajeColor('El usuario: ' + snapshot.val().correo + 'Se a conectado', 'success');
                   }
                }
 
                /*
                var refUsuarios = fireBd.ref('usuarios');

                refUsuarios.child(userA.uid).on('value', function (snapshot) {
                    if (userA.uid == snapshot.key) {
                        if (snapshot.val().estado == 'activo') {
                            if (snapshot.val().tipo == 'usuario') {
                                var noti = sessionStorage.getItem('notificacionesAdmin');
                                if (noti != null || noti != 'FALSO') {
                                    notificacionMensajeColor('El usuario: ' + snapshot.val().correo + ' se a conectado', 'success');
                                }

                            } else {

                                notificacionMensajeColor('Esta cuenta no cuenta con los permisos necesarios', 'danger');
                            }
                        } else {
                            var noti = sessionStorage.getItem('notificacionesAdmin');
                            if (noti != null || noti != 'FALSO') {
                                notificacionMensajeColor('El usuario: ' + snapshot.val().correo + ' se a desconetado', 'danger');
                            }
                        }

                    }
                }, function (erro) {
                    notificacionMensajeColor('Esta cuenta no cuenta con los permisos necesarios', 'danger');
                });
               */
            });
        } else {
            $('#contPrincipalAdmin').load('componentes/login/login.html');
            $.getScript("componentes/login/login.js?n=1");
        }
    } else {

        $('#contPrincipalAdmin').load('componentes/login/login.html');
        $.getScript("componentes/login/login.js?n=1");
    }

});

function cerrarSesionAdmin() {
    var userA = auten.currentUser;
    if (userA) {

        refUsuarios.child(userA.uid).child('estado').set('inactivo');
    }
    auten.signOut().then(function () {
        sessionStorage.removeItem('statusadmin');
        sessionStorage.removeItem('stTEmpresa');

        notificacionMensajeColor('Sesión cerrada', 'success');
        $.getScript("adminEstado.js?n=1");

    }).catch(function (error) {

        notificacionMensajeColor('No se Pudo cerrar la Sesión', 'danger');
    });
}
