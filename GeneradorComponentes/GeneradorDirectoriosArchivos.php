<?php

$ForHtml = $_POST['contenidoFormularioHtml'];
$ForJs = $_POST['contenidoFormularioJs'];
$TablaHtml = $_POST['contenidoTablaHtml'];
$TablaJs = $_POST['contenidoTablaJs'];

$Nombre = $_POST['nombreComp'];
$ArchivoForHtml = "Formulario".$Nombre.".html";
$ArchivoForJs = "Formulario".$Nombre.".js";
$ArchivoTablaHtml = "Tabla".$Nombre.".html";
$ArchivoTablaJs = "Tabla".$Nombre.".js";

$Carpeta = $_POST['nombreCarpeta'];

$Directorio = $_POST['nombreRuta'];

$Respuesta = '';
   
if($Directorio ==''){
	$Directorio =__DIR__ . "/../componentes/$Carpeta/$Nombre";
}else{
    $Directorio = __DIR__ . "/../$Directorio/$Carpeta/$Nombre";
}

if (file_exists($Directorio)) { 
        
    $resultado = file_put_contents($Directorio . "/$ArchivoForHtml", $ForHtml);
    if ($resultado === FALSE) {
        $Respuesta .= " || Exixte el directorio Erro escribiendo : ".$ArchivoForHtml;
    } else {
            $resultado = file_put_contents($Directorio . "/$ArchivoForJs", $ForJs);

           if ($resultado === FALSE) {
                    $Respuesta .= "Exixte el directorio Erro escribiendo : ".$ArchivoForJs;
            } else {
                    $resultado = file_put_contents($Directorio . "/$ArchivoTablaHtml", $TablaHtml);

                    if ($resultado === FALSE) {
                        $Respuesta .= " || Exixte el directorio Erro escribiendo : ".$ArchivoTablaHtml;
                    } else {

                            $resultado = file_put_contents($Directorio . "/$ArchivoTablaJs", $TablaJs);

                            if ($resultado === FALSE) {
                                $Respuesta .= "Exixte el directorio Erro escribiendo : ".$ArchivoTablaJs;
                            } else {
                                $Respuesta .='Exito';
                            }
                           }
                 }
        }
    
    echo $Respuesta;
    }else{
    
if(!mkdir($Directorio, 0777, true)) {
    $Respuesta .= "Fallo al crear las carpetas... : ".$Directorio;
    
}else{

 $resultado = file_put_contents($Directorio . "/$ArchivoForHtml", $ForHtml);
    if ($resultado === FALSE) {
        $Respuesta .= " || Exixte el directorio Erro escribiendo : ".$ArchivoForHtml;
    } else {
            $resultado = file_put_contents($Directorio . "/$ArchivoForJs", $ForJs);

           if ($resultado === FALSE) {
                    $Respuesta .= "Exixte el directorio Erro escribiendo : ".$ArchivoForJs;
            } else {
                    $resultado = file_put_contents($Directorio . "/$ArchivoTablaHtml", $TablaHtml);

                    if ($resultado === FALSE) {
                        $Respuesta .= " || Exixte el directorio Erro escribiendo : ".$ArchivoTablaHtml;
                    } else {

                            $resultado = file_put_contents($Directorio . "/$ArchivoTablaJs", $TablaJs);

                            if ($resultado === FALSE) {
                                $Respuesta .= "Exixte el directorio Erro escribiendo : ".$ArchivoTablaJs;
                            } else {
                                $Respuesta .='Exito';
                            }
                           }
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
