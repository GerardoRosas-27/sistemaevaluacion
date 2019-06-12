//$('#datos').html('');
refPuestos.on('child_added', function (snapshot) {
    var key = snapshot.key;
    var data = snapshot.val();
   var creadotr = document.createElement("tr");
            var idtr = snapshot.key;
            creadotr.setAttribute("id", key);
            var data = snapshot.val();
            creadotr.innerHTML = crearHTML(data, key);
            document.getElementById('datosPuesto').appendChild(creadotr);
});
function crearHTML(data,key){
    var html = '<td>' + data.nombre + '</td><td>' + data.descripcion + '</td><td>' + data.vacantes + '</td><td class="td-actions"><button id="' + key + '" type="button" rel="tooltip" title="Editar" class="btn btn-primary btn-link btn-sm"><i class="material-icons">edit</i></button><button id="' + key + '" type="button" rel="tooltip" title="Eliminar" class="btn btn-danger btn-link btn-sm"><i class="material-icons">close</i></button></td>';
    return html;
}

$('#remover').click(function () {
    notificacionMensaje('Este dato se perderá, ¿Desea eliminarlo: <button class="btn btn-primary">SI</button>');
})
