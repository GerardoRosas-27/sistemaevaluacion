$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
$(document).ready(function () {
    var size = sessionStorage.getItem('formularioseccion');
    if (size != null) {
        if (size == 'min') {
            $('#formularioSeccion').removeData('size');
            $('#formularioSeccion').attr('data-size', 'min');
            $('#formularioSeccion').removeClass('col-12');
            $('#formularioSeccion').addClass('col-md-6');
            $('#btnSize').html('<i class="material-icons">crop_din</i>');
        }
    }

    $('#btnGuardarSeccion').click(function () {
        if ($('#idSeccionId').val().length != 0 && $('#textSeccionNombre').val().length != 0) {
            var instruciones = {};
            var cont = 1;
            $('input.instruccion').each(function () {
                instruciones[cont] = $(this).val();
                cont++;
            });
            var SeccionKey = refSeccion.push().key
            var data = {
                id: $('#idSeccionId').val(),
                nombre: $('#textSeccionNombre').val(),
                titulo: $('#textSeccionTitulo').val(),
                tituloinstruccion: $('#textSeccionInstruccion').val(),
                tiempo: $('#textSeccionTiempo').val()
                
            }
            refSeccion.child(SeccionKey).set(data, function (error) {
                if (error) {
                    notificacionMensaje('Error los datos no se pudieron guardar');
                } else {
                    refSeccion.child(SeccionKey).child('instrucciones').set(instruciones, function (error) {
                        if (error) {
                            notificacionMensaje('Error los datos no se pudieron guardar');
                        } else {

                            Cancelar();
                            $('#agrgarInstruccion').html('');
                            var accion = sessionStorage.getItem("compPregunta");
                            if (accion == 'ambosPregunta') {

                                cargarComponente();
                            }
                            $('#idSeccionId').val(1 + parseInt($('#idSeccionId').val()));
                            notificacionMensajeColor('Los datos se guardaron correctamente', 'success');
                            cargarSelectSeccion();
                        }
                    });
                }
            });

        } else {
            notificacionMensaje('El nombre es ovligatorio');
        }
    });
    $('#CrearInstruccion').click(function () {
        var id = 1 + parseInt($(this).data('id'));
        $('#agrgarInstruccion').append('<div id="EliminarInstru' + id + '" class="row form-group"><input type="text" class="instruccion borrar form-control col-9"><button data-eliminar="' + id + '" onClick="EliminarInstruccion(this)" class="btn btn-danger"><i class="material-icons">close</i></button></div>');
        $('#CrearInstruccion').removeData('id');
        $('#CrearInstruccion').attr('data-id', id);
    })
    
    consultaSeccionUltimo().then(function (result) {
        console.log(result);
        $('#idSeccionId').val(parseInt(result) + 1);

    }, function (err) {
        console.log('resuelta error promesa: ' + err); //  Error: "It broke"
    });

});

function EliminarInstruccion(element) {
    var idE = $(element).data('eliminar');
    $('#EliminarInstru' + idE).remove();
}

function consultaSeccionUltimo() {
    return new Promise(function (resolve, reject) {
        if (resolve) {
            refSeccion.orderByChild('id')
                .limitToLast(1)
                .once('value').then(function (snapshot) {
                    snapshot.forEach(snap => {
                        resolve(snap.val().id)
                    });
                });

        } else {
            reject(Error("error de promesa consulta seccion"));
        }
    });
}
