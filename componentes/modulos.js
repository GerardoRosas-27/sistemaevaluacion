function EliminarNodo(elemto) {
    var elemen = $(elemto);
    var seguridad = 0;
    do {
        var elemen = $(elemen).parent('div')
        var res = $(elemen).data('eliminar')
        seguridad++
    } while (res != 'eliminar' && seguridad < 20);
    if (seguridad == 20) {
        notificacionMensaje('se detuvo el ciclo, No se encontro un data-eliminar="eliminar"')
    }
    if (res == 'eliminar') {
        $(elemen).remove();

    } else {
        notificacionMensaje("se encontro el data pero la accion no coresponde: " + res);
    }
}

function RemoveAllChilds(id) {
    var elemto = document.getElementById(id);
    while (elemto.hasChildNodes())
        elemto.removeChild(elemto.firstChild);
}

function RemoveChlild(id) {
    var elemto = document.getElementById(id);
    elemto.removeChild(elemto);
}

function GuardarDatosTem(id, data) {
    localStorage.setItem(id, JSON.stringify(data))
}

function ExtraerDatosTem(id) {
    var dataTem = JSON.parse(localStorage.getItem(id));
    localStorage.setItem(id, '');
    return dataTem;
}

function CopiarDatosTem(id) {
    var dataTem = JSON.parse(localStorage.getItem(id));
    return dataTem;
}

function accionMaxMin(elemento) {
    var elemen = $(elemento);
    var seguridad1 = 0;
    do {
        var elemen = $(elemen).parent('div')
        var res = $(elemen).data('size')
        seguridad1++
    } while (res != 'max' && seguridad1 < 10);

    if (res == 'max') {
        var ventana = $(elemen).attr('id');
        sessionStorage.setItem(ventana, 'min');
        $(elemen).removeData('size');
        $(elemen).attr('data-size', 'min');
        $(elemen).removeClass('col-12');
        $(elemen).addClass('col-md-6');
        $(elemento).html('<i class="material-icons">crop_din</i>');

    } else {
        var elemen = $(elemento);
        var seguridad2 = 0;
        do {
            var elemen = $(elemen).parent('div')
            var res = $(elemen).data('size')
            seguridad2++
        } while (res != 'min' && seguridad2 < 10);
        if (res == 'min') {
            var ventana = $(elemen).attr('id');
            sessionStorage.setItem(ventana, 'max');
            $(elemen).removeData('size');
            $(elemen).attr('data-size', 'max');
            $(elemen).removeClass('col-md-6');
            $(elemen).addClass('col-12');
            $(elemento).html('<i class="material-icons">crop_portrait</i>');
        } else {
            if (seguridad1 == 10 || seguridad2 == 10) {
                notificacionMensaje('error no se pudo max o min')
            }
        }
    }
}

function ocultar(element) {
    var ocultar = $(element).data('ocultar');
    var clase = $(element).data('clas');
    if (ocultar == 'si') {
        $('.'+clase).css("display", 'none');
         $('.'+clase).css("display", 'none');
        $(element).removeData('ocultar');
        $(element).attr('data-ocultar', 'no');
       $(element).html('<i class="material-icons">open_in_new</i>');

    } else {
         $('.'+clase).css("display", 'block');
         $('.'+clase).css("display", 'block');
        $(element).removeData('ocultar');
        $(element).attr('data-ocultar', 'si');
        $(element).html('<i class="material-icons">minimize</i>'); 
    }
}

function Cancelar() {
    $("input.borrar").val('');
}

function notificacionMensajeColor(mensaje, color) {
    notificacion('top', 'center', mensaje, color);
}

function notificacionMensaje(mensaje) {
    notificacion('top', 'center', mensaje, 'warning');
}

function notificacionDefault() {
    notificacion('top', 'center', 'No se pudo realizar la acción', 'warning');
}

function notificacion(from, align, mensaje, tipo) {

    type = ['', 'info', 'danger', 'success', 'warning', 'rose', 'primary'];
    if (tipo == '') {
        tipo = type;
    }

    color = Math.floor((Math.random() * 6) + 1);

    $.notify({
        icon: "add_alert",
        message: mensaje

    }, {
        z_index: 5000,
        type: tipo,
        timer: 4000,
        placement: {
            from: from,
            align: align
        }
    });
}
function buscarDatos(element) {
    var elemento = $(element).attr('id');
    var mostrar = $(element).data('mostrar');
    var tableReg = document.getElementById(mostrar);
    var searchText = document.getElementById(elemento).value.toLowerCase();
    var cellsOfRow = "";
    var found = false;
    var compareWith = "";

    // Recorremos todas las filas con contenido de la tabla
    for (var i = 1; i < tableReg.rows.length; i++) {
        cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        found = false;
        // Recorremos todas las celdas
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1)) {
                found = true;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';
        }
    }
};

function validaInt(e){
    tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla==8){
        return true;
    }
        
    // Patron de entrada, en este caso solo acepta numeros
    patron =/[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

