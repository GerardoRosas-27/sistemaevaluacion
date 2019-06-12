$(document).ready(function(){


    refEvaluacionAdminIndex.on('child_added', function (snapshot) {
        var key = snapshot.key;
        var data = snapshot.val();
        $('<option></option>', {
            text: data.NombreEmpresa.nombre,
            val: key
        }).appendTo('#selectEmpresaEvaluacion');

    });

$('#selectEmpresaEvaluacion').change(function(){
    $('#selectPuestoEvaluacion').html('<option class="text-uppercase" value="0">PUESTO DE TRABAJO</option>');
    if($(this).val() !=0){
        var empresa = $(this).val();
    
    refEvaluacionAdminIndex.child(empresa).on('child_added', function (snapshot) {
        var key = snapshot.key;
        var data = snapshot.val();
        $('<option></option>', {
            text: data.NombrePuesto.nombre,
            val: key
        }).appendTo('#selectPuestoEvaluacion');

    });
    }else{
        $('#seccionEleccion').html('');
    }
    
    
});
    $('#selectPuestoEvaluacion').change(function(){
        if ($('#selectPuestoEvaluacion').val() != 0 && $(this).val() != 0){
            $('#seccionEleccion').html('<button onClick="MostrarInformacion(this)" type="button" class="btn btn-success"><i class="material-icons">touch_app</i>Más Información<div class="ripple-container"></div></button>');
        }else{
            $('#seccionEleccion').html('');
        }
    });

});
function AccionEleccion() {
    if ($('#selectEmpresaEvaluacion').val() != 0) {
        if ($('#selectPuestoEvaluacion').val() != 0 && $('#selectPuestoEvaluacion').val() != 'nombre') {
             
            sessionStorage.setItem("IndexEmpresa", $('#selectEmpresaEvaluacion').val());
            sessionStorage.setItem("IndexPuesto", $('#selectPuestoEvaluacion').val());
           
            sessionStorage.setItem("estatus", 'OK');
           sessionStorage.setItem("index", 'preguntas');
            controlAccionesIndex();
                    
         camviarBtn('Preguntas','1','info','Siguiente');
 
        } else {
            notificacionMensaje('Seleccione un puesto de trabajo');
        }
    } else {
        notificacionMensaje('Seleccione una empresa');
    }
}
