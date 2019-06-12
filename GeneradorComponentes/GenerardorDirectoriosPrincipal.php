<?php

$Carpeta = $_POST['nombreCarpeta'];
$Archivo = "Controlador".$Carpeta.".js";
$ArchivoVista = "Vista".$Carpeta.".html";


$Directorio = $_POST['nombreRuta'];
$ConControlador = $_POST['contenidoControl'];
$ConVista = $_POST['contenidoVista'];
$Respuesta = '';
   
if($Directorio ==''){
	$Directorio =__DIR__ . "/../componentes/$Carpeta";
}else{
    $Directorio = __DIR__ . "/../$Directorio/$Carpeta";
}

if (file_exists($Directorio)) { 
       
         
$resultado = file_put_contents($Directorio . "/$Archivo", $ConControlador);
 
if ($resultado === FALSE) {
    $Respuesta .= "Exixte el directorio Erro escribiendo : ".$Archivo;
} else {
    
    $resultado = file_put_contents($Directorio . "/$ArchivoVista", $ConVista);
 
if ($resultado === FALSE) {
    $Respuesta .= "Exixte el directorio Erro escribiendo : ".$ArchivoVista;
} else {
    $Respuesta .='ExitoControl';
}
}
    
    echo $Respuesta;
    }else{
    
if(!mkdir($Directorio, 0777, true)) {
    $Respuesta .= "Fallo al crear las carpetas... : ".$Directorio;
    
}else{
    
     
$resultado = file_put_contents($Directorio . "/$Archivo", $ConControlador);
 
if ($resultado === FALSE) {
    $Respuesta .= "No Existe el directorio Erro escribiendo : ".$Archivo;
} else {
    
    $resultado = file_put_contents($Directorio . "/$ArchivoVista", $ConVista);
 
if ($resultado === FALSE) {
    $Respuesta .= "No Existe el directorio Erro escribiendo : ".$ArchivoVista;
} else {
    $Respuesta .='ExitoControl';
}
}
   
}
    echo $Respuesta;
    }
  

/*
Extrae la ruta del servidor
$host  = $_SERVER['HTTP_HOST'];
$uri  = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
$base = "http://" . $host . $uri . "/";
print($base);
*/
?>
