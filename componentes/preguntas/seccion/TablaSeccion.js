//$('#datos').html('');
refSeccion.on('child_added', function (snapshot) {
    var key = snapshot.key;
    var data = snapshot.val();
   var creadotr = document.createElement("tr");
            var idtr = snapshot.key;
            creadotr.setAttribute("id", key);
            var data = snapshot.val();
            creadotr.innerHTML = crearHTML(data, key);
            document.getElementById('datosSeccion').appendChild(creadotr);
});
function crearHTML(data,key){
    var html = '<td>' + data.id + '</td><td>' + data.nombre + '</td><td>' + data.titulo + '</td><td>' + data.tiempo + '</td><td class="td-actions"><button id="' + key + '" type="button" rel="tooltip" title="Editar" class="btn btn-primary btn-link btn-sm"><i class="material-icons">edit</i></button><button id="' + key + '" type="button" rel="tooltip" title="Eliminar" class="btn btn-danger btn-link btn-sm"><i class="material-icons">close</i></button></td>';
    return html;
}

$('#remover').click(function () {
    notificacionMensaje('Este dato se perderá, ¿Desea eliminarlo: <button class="btn btn-primary">SI</button>');
})
