$(document).ready(function () {
    var size = sessionStorage.getItem('formularioempresa');
    if (size != null) {
        if (size == 'min') {
            $('#formularioempresa').removeData('size');
            $('#formularioempresa').attr('data-size', 'min');
            $('#formularioempresa').removeClass('col-12');
            $('#formularioempresa').addClass('col-md-6');
            $('#btnSize').html('<i class="material-icons">crop_din</i>');
        }
    }

    $('#btnGuardarEmpresa').click(function () {
        if ($('#textNombre').val().length != 0 && $('#textDireccion').val().length != 0) {

            var EmpresaKey = refEmpresa.push().key
            refEmpresa.child(EmpresaKey).set({
                nombre: $('#textNombre').val(),
                descripcion: $('#textDescripcion').val(),
                telefono: $('#textTelefono').val(),
                direccion: $('#textDireccion').val()
            }, function (error) {
                if (error) {
                    notificacionMensaje('Error los datos no se pudieron guardar');
                } else {
                    Cancelar();
                    var accion = sessionStorage.getItem("compEmpresa");
                    if (accion == 'ambosEmpresa') {
                        cargarComponente();
                    }
                    notificacionMensajeColor('Los datos se guardaron correctamente', 'success');
                    cargarSelectEmpresa();
                }
            });

        } else {
            notificacionMensaje('Los datos de nombre Y dirrección son ovligatorios');
        }

    });



});
