$(document).ready(function () {
    var size = sessionStorage.getItem('formularioCasoPractico');
    if (size != null) {
        if (size == 'min') {
            $('#formularioCasoPractico').removeData('size');
            $('#formularioCasoPractico').attr('data-size', 'min');
            $('#formularioCasoPractico').removeClass('col-12');
            $('#formularioCasoPractico').addClass('col-md-6');
            $('#btnSize').html('<i class="material-icons">crop_din</i>');
        }
        
    }
    $('#btnGuardarCasoPractico').click(function () {
        if ($('#textCasoPracticoNombre').val().length != 0) {
            if ($('#textCasoPracticoDescripcion').val().length != 0) {
                var data = {
                    id: $('#idCasoPractico').val(),
                    nombre: $('#textCasoPracticoNombre').val(),
                    descripcion: $('#textCasoPracticoDescripcion').val(),
                    tiempo: $('#textCasoPracticoTiempo').val()
                    
                }
                var CasoPracticoKey = refCasoPractico.push().key
                refCasoPractico.child(CasoPracticoKey).set(data, function (error) {
                    if (error) {
                        notificacionMensaje('Error los datos no se pudieron guardar');
                    } else {

                        Cancelar();
                        var accion = sessionStorage.getItem("compPreguntas");
                        if (accion == 'ambosPreguntas') {

                            cargarComponente();
                        }
                         $('#idCasoPractico').val(1+parseInt($('#idCasoPractico').val()));

                        notificacionMensajeColor('Los datos se guardaron correctamente', 'success');
                        cargarSelectCasoPractico();
                    }
                });

            } else {
                notificacionMensaje('La Descripcion es ovligatoria');
            }
        } else {
            notificacionMensaje('El nombre es ovligatorios');
        }

    });
    
      consultaCasoUltimo().then(function (result) {
        console.log(result);
        $('#idCasoPractico').val(parseInt(result) + 1);

    }, function (err) {
        console.log('resuelta error promesa: ' + err); //  Error: "It broke"
    });


});

function consultaCasoUltimo() {
    return new Promise(function (resolve, reject) {
        if (resolve) {
            refCasoPractico.orderByChild('id')
                .limitToLast(1)
                .once('value').then(function (snapshot) {
                    snapshot.forEach(snap => {
                        resolve(snap.val().id)
                    });
                });

        } else {
            reject(Error("error de promesa consulta caso practico"));
        }
    });
}
