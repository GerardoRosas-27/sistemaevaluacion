$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
$(document).ready(function () {
    var size = sessionStorage.getItem('formulariopregunta');
    if (size != null) {
        if (size == 'min') {
            $('#formulariopregunta').removeData('size');
            $('#formulariopregunta').attr('data-size', 'min');
            $('#formulariopregunta').removeClass('col-12');
            $('#formulariopregunta').addClass('col-md-6');
            $('#btnSize').html('<i class="material-icons">crop_din</i>');
        }
    }

    $('#btnGuardarPregunta').click(function () {
        if ($('#textNumeroPregunta').val().length != 0 && $('#textPregunta').val().length != 0) {

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
            console.log(DataRespuestas);
            var PreguntasKey = refPreguntas.push().key

            var data = {
                id: $('#textNumeroPregunta').val(),
                tiempo: $('#textTiempoPregunta').val(),
                pregunta: $('#textPregunta').val()

            }
            refPreguntas.child(PreguntasKey).set(data, function (error) {
                if (error) {
                    notificacionMensaje('Error los datos no se pudieron guardar');
                } else {
                    refPreguntas.child(PreguntasKey).child('respuestas').set(DataRespuestas, function (error) {
                        if (error) {
                            notificacionMensaje('Error los datos no se pudieron guardar');
                        } else {

                            Cancelar();
                            $('#espacioRespuestas').html('');
                            var accion = sessionStorage.getItem("compPreguntas");
                            if (accion == 'ambosPreguntas') {

                                cargarComponente();
                            }
                            notificacionMensajeColor('Los datos se guardaron correctamente', 'success');
                            cargarSelectPregunta();
                        }
                    });
                }
            });


        } else {
            notificacionMensaje('Los datos numero de pregunta Y pregunta ovligatorios');
        }

    });

    $('#GenerarTextRespuestas').click(function () {
        var cant = parseInt($('#textCantidadRespuestas').val());
        var htmlTextRespuestas = '';

        for (var i = 1; i <= cant; i++) {
            htmlTextRespuestas += '<div class="row"><div class="col-12 col-md-6 my-2"><label for="inputCity">Respuesta ' + i + '</label><input type="text" class="respuesta form control" ></div><div class="col-12 col-md-4 my-2"><label for="inputCity">Valor ' + i + '</label><input type="text" class="valor form control"></div></div>';
        };
        $('#espacioRespuestas').html(htmlTextRespuestas);
    });

});

