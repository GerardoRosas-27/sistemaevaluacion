$(document).ready(function () {
    // Javascript method's body can be found in assets/js/demos.js
    md.initDashboardPageCharts();
    $('#Imprimir').click(function () {
        print();
    })


    $('#guardarNombre').click(function () {
        var Pasar = new BHtml();
       var jsonData = {}
jsonData= {
		"id": 1,
		"name": $('#txtNombre').val(),
		"email": "dieguito@athelas.pe",
		"lastLogin": "Sat Feb 21 2015 08:44:55 GMT-0500 (PET)"
		};
        
        Pasar.id = 'usuario1'
        Pasar.data = jsonData;
        Pasar.GuardarDatosTem()

        var jsonData = Pasar.CopiarDatosTem();
        console.log(jsonData.name);
        
    })



});
