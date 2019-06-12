
refCasoPractico.on('child_added', function (snapshot) {
    var key = snapshot.key;
    var data = snapshot.val();
   var creadotr = document.createElement("tr");
            var idtr = snapshot.key;
            creadotr.setAttribute("id", key);
            var data = snapshot.val();
            creadotr.innerHTML = crearHTML(data, key);
            document.getElementById('datosCasoPractico').appendChild(creadotr);
});
function crearHTML(data,key){
    var html = '<td>' + data.id + '</td><td>' + data.nombre + '</td><td>' + data.descripcion + '</td><td>' + data.tiempo + '</td><td class="td-actions"><button onClick="EditarCasoPractico(this)" id="' + key + '" type="button" rel="tooltip" title="Editar" class="btn btn-primary btn-link btn-sm"><i class="material-icons">edit</i></button><button onClick="PreguntaEliminarCasoPractico(this)" data-nombre="' + data.nombre + '" id="' + key + '" type="button" rel="tooltip" title="Eliminar" class="btn btn-danger btn-link btn-sm"><i class="material-icons">close</i></button></td>';
    return html;
}
function EditarCasoPractico(element){
    var id = $(element).attr("id");
    alert(id);
}
function PreguntaEliminarCasoPractico(element) {
    var id = $(element).attr("id");
    var nombre = $(element).data("nombre");
    notificacionMensaje(nombre+' => Este dato se perderá, ¿Desea eliminarlo: <button id="'+ id +'"  onClick="EliminarCasoPractico(this)" class="btn btn-primary">SI</button>');
}
function EliminarCasoPractico(element){
    var id = $(element).attr("id");
    alert(id);
}