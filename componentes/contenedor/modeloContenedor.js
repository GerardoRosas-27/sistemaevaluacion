function removeAllChilds(a)
 {
 var a=document.getElementById(a);
 while(a.hasChildNodes())
	a.removeChild(a.firstChild);	
 }


function guardarDatosPuesto(Data) {
 
    var refPuesto=refEvaluacion.child(Data.puesto);      
    var refSeccion=refPuesto.child(Data.seccion);  
        refSeccion.set({
            descripcion: Data.descripcion,
            tiempo: Data.tiempo,
            cantidadPreguntas: Data.cantidadPreSeccion
        });
      
    }
function guardarDatosPreguntas(Data,DataRes) {
                                          
    var refPuesto=refEvaluacion.child(Data.puesto);      
    var refSeccion=refPuesto.child(Data.seccion);  
        var refPreguntas=refSeccion.child('preguntas');
        var refPregunta=refPreguntas.child(Data.numeroPre);
        refPregunta.set({
            pregunta: Data.pregunta,
            cantidadRes: Data.cantRes
        });
        refPregunta.child('respuestas').set({DataRes})   
    }
    
    refEvaluacion.on('child_added', function (snapshot) {
            var key = snapshot.key;
        $('<option></option>', {
            text: key,
            val: key
    }).appendTo('#selectPuesto');
    
            var data = snapshot.val();
           console.log(key+' || '+data);
        });


        function crearHtml(data, dataid){

            var contenido = '<td>' + data.categoria + '</td>\
            \n<td>' + data.fecha + '</td>\
            \n<td>' + data.horario + '</td>\
            \n<td>' + data.nombre + '</td>\
            \n<td>' + data.duracion + '</td>\
            \n<td>' + data.cupo + '</td>\
            \n<td>' + data.observaciones + '</td>\
            \n<td><img src="' + data.url + '" alt="" class="img-fluid">\
            \n<p>' + data.nombreImg + '</p></td>\
            \n<td">\
            \n<button style="margin-bottom:10px;" onClick="btnEditarCurso(this)" type="button" data-id="' + dataid + '" data-url="' + data.url + '" data-nombreimg="' + data.nombreImg + '" class="btn btn-outline-success block btn-md"><i class="icon-edit"></i>Editar</button>\
            \n<button style="margin-bottom:10px;" onClick="btnEliminarCurso(this)" type="button" data-id="' + dataid + '" data-url="' + data.nombreImg + '" class="btn btn-outline-danger block btn-md"><i class="icon-trash4"></i>Eliminar</button></td>';
            return contenido;
        };



