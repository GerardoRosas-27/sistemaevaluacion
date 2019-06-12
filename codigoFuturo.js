//consulta con una Promesa
var res = refSeccion.orderByChild('id')
    .equalTo('3').limitToFirst(1)
    .once('value').then(function (snapshot) {
        snapshot.forEach(snap => {
            console.log(snap.val());
        });
    }, function (error) {
        console.log(error);
    });
//consulta sin promesa
refSeccion.orderByChild('id')
    .equalTo('1').limitToFirst(1)
    .on('child_added', function (snapshot) {
        var data = snapshot.val();
        console.log(data);
    });


//invocar consulta con promesa controlada
consulta(3).then(function (result) {
    console.log(result);
}, function (err) {
    console.log('resuelta error al remplazar: ' + err); //  Error: "It broke"
});
//funcion consulta() Estructura de la promesa
function consulta(id) {
    var id = id.toString();
    return new Promise(function (resolve, reject) {
        if (resolve) {
            refSeccion.orderByChild('id')
                .equalTo(id).limitToFirst(1)
                .on('child_added', function (snapshot) {
                    var data = snapshot.val();
                    resolve(data);
                });

        } else {
            reject(Error("error de promesa consulta"));
        }
    });
}

//devuelve toda la promesa 
function cont(){
    var userId = auten.currentUser.uid;
        return fireBd.ref('usuarios/' + userId).once('value').then(function (snapshot) {
                    snapshot.forEach(snap => {
                        var username = (snap.val() && snap.val().nombre) || 'Anonymous';
                    });
                });

}
 console.log(cont());



         /*
         var promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() { 
    resolve('foo');
  }, 300);
});

promise1.then(function(value) { 
  console.log(value);
  // expected output: "foo"
});

console.log(promise1);
// expected output: [object Promise]
         */

        /* 
         // Always change the value of "/hello" to "world!"
exports.hello = functions.database.ref('/hello').onWrite(event => {
  // set() returns a promise. We keep the function alive by returning it.
  return event.data.ref.set('world!').then(() => {
    console.log('Write succeeded!');
  });
});
    */  

//-----MOVER LAS VENTANAS-------
jQuery.fn.draggit = function (el) {
    var thisdiv = this;
    var thistarget = $(el);
    var relX;
    var relY;
    var targetw = thistarget.width();
    var targeth = thistarget.height();
    var docw;
    var doch;
    var ismousedown;

    thistarget.css('position','absolute');


    thisdiv.bind('mousedown', function(e){
        var pos = $(el).offset();
        var srcX = pos.left;
        var srcY = pos.top;

        docw = $('body').width();
        doch = $('body').height();

        relX = e.pageX - srcX+120;
        relY = e.pageY - srcY;

        ismousedown = true;
    });

    $(document).bind('mousemove',function(e){ 
        if(ismousedown)
        {
            targetw = thistarget.width();
            targeth = thistarget.height();

            var maxX = docw - targetw - 10;
            var maxY = doch - targeth - 10;

            var mouseX = e.pageX;
            var mouseY = e.pageY;

            var diffX = mouseX - relX;
            var diffY = mouseY - relY;

            // check if we are beyond document bounds ...
            if(diffX < 0)   diffX = 0;
            if(diffY < 0)   diffY = 0;
            if(diffX > maxX) diffX = maxX;
            if(diffY > maxY) diffY = maxY;

            $(el).css('top', (diffY)+'px');
            $(el).css('left', (diffX)+'px');
        }
    });

    $(window).bind('mouseup', function(e){
        ismousedown = false;
    });

    return this;
}
//invocacion de MOVER LAS VENTANAS
$("#mover").draggit("#formularioempresa");
    
   /* $("#mover").mousedown(function(){
        
        $("#ventana").css("z-index",10);
        $("#ventana2").css("z-index",5);
         $('.card').removeClass('sombra');
        $("#ventana").addClass('sombra');
    });
    $("#mover2").draggit("#ventana2");
     $("#mover2").mousedown(function(){
        
        $("#ventana").css("z-index",5);
        $("#ventana2").css("z-index",10);
         $('.card').removeClass('sombra');
        $("#ventana2").addClass('sombra');
         
    });
    $('#enviar').click(function(){
        alert($('#textEnviar').val());
    })
    */






