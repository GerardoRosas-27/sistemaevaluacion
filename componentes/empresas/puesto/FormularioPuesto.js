$(document).ready(function () {
    var size = sessionStorage.getItem('formulariopuesto');
    if (size != null) {
        if (size == 'min') {
            $('#formulariopuesto').removeData('size');
            $('#formulariopuesto').attr('data-size', 'min');
            $('#formulariopuesto').removeClass('col-12');
            $('#formulariopuesto').addClass('col-md-6');
            $('#btnSize').html('<i class="material-icons">crop_din</i>');
        }
    }

    $('#btnGuardarPuesto').click(function () {

        if ($('#textNombrep').val().length != 0 && $('#textVacantesp').val().length != 0) {

            var data = {
                nombre: $('#textNombrep').val(),
                descripcion: $('#textDescripcionp').val(),
                vacantes: $('#textVacantesp').val()
            }

            var PuestoKey = refPuestos.push().key
            refPuestos.child(PuestoKey).set(data, function (error) {
                if (error) {
                    notificacionMensaje('Error los datos no se pudieron guardar');
                } else {

                    Cancelar();
                    var accion = sessionStorage.getItem("compEmpresa");
                    if (accion == 'ambosEmpresa') {

                        cargarComponente();
                    }

                    notificacionMensajeColor('El puesto se a guardado correctamente', 'success')
                    cargarSelectPuesto();
                }
            });

        } else {
            notificacionMensaje('Los datos de nombre Y vacantes son ovligatorios');
        }

    });

});
