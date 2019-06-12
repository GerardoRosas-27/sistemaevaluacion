
$(document).ready(function () {
    var size = sessionStorage.getItem('formulario_RemNomComp');
    if (size != null) {
        if (size == 'min') {
            $('#formulario_RemNomComp').removeData('size');
            $('#formulario_RemNomComp').attr('data-size', 'min');
            $('#formulario_RemNomComp').removeClass('col-12');
            $('#formulario_RemNomComp').addClass('col-md-6');
            $('#btnSize').html('<i class="material-icons">crop_din</i>');
        }
    }
    
  $('#btnGuardar_RemNomComp').click(function(){
     if ($('#text_RemNomCompNombre').val().length != 0 ){
         if($('#text_RemNomCompDireccion').val().length != 0 ) {
        
           ref_RemNomComp.push({
              nombre: $('#text_RemNomCompNombre').val(),
              descripcion: $('#text_RemNomCompDescripcion').val(),
              telefono: $('#text_RemNomCompTelefono').val(),
              direccion: $('#text_RemNomCompDireccion').val()
          });
         Cancelar();
         var accion = sessionStorage.getItem("comp_RemNomSubCar");
         if(accion == 'ambos_RemNomSubCar'){
            
             cargarComponente_RemNomSubCar();
         }
  
        notificacionMensajeColor('Los datos se guardaron correctamente','success');
        cargarSelect_RemNomComp();

     }else{
       notificacionMensaje('La dirrección es ovligatoria');
     }
     }else{
       notificacionMensaje('El nombre es ovligatorios');
     } 
   
});

    
});

    
