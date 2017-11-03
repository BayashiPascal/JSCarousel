<?php 
  // ------------------ index.php --------------------->
  // Start the PHP session
  session_start();

  // Ensure no message will interfere with output
  ini_set('display_errors', 'Off');
  error_reporting(0);

  // Turn on display of errors and warning for debug
  ini_set('display_errors', 'On');
  error_reporting(E_ALL ^ E_WARNING);
  error_reporting(E_ALL | E_STRICT);

?>
<!DOCTYPE html>
<html>
  <head>

    <!-- Meta -->
    <meta content="text/html; charset=UTF-8;">
    <meta name="viewport" 
      content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="JSCarousel" />
    <meta name="keywords" content="JSCarousel" />
      
    <!-- Icon -->
    <link rel="icon" type="image/x-icon" 
      href="./Img/jscarousel.ico" />

    <!-- Include the CSS files -->
    <link href = "./index.css" rel = "stylesheet" type = "text/css"> 
    <link href = "./jscarousel.css" rel = "stylesheet" type = "text/css"> 

    <!-- Include the JS files -->
    <script charset = "UTF-8" src = "./jquery.min.js"></script>
    <script charset = "UTF-8" src = "./jscarousel.js"></script>
    <script charset = "UTF-8" src = "./index.js"></script>
    <title>JSCarousel</title>
  </head>
  <body onload = 'BodyOnLoad();'>
    <!-- Main div -->
    <div id = "divMain">
      
      <!-- Title div -->
      <div id = "divTitle">
        JSCarousel<br>
        <div id = "divSubTitle">

        </div>
      </div>
      
      <!-- Main div -->
      <div id = "divJSCarousel">

      </div>

      <!-- Button div -->
      <div id = "divCmd">
        <input type = "button" onClick = "Prev();" value = "Prev">
        <input type = "button" onClick = "Play();" value = "Play">
        <input type = "button" onClick = "Next();" value = "Next">
        <input type = "button" onClick = "Perspective();" 
          value = "Perspective">
        <input type = "button" onClick = "Cylinder();" 
          value = "Cylinder">
        <input type = "button" onClick = "Solid();" 
          value = "Solid">
        <input type = "button" onClick = "Darken();" 
          value = "Darken">
        <input type = "button" onClick = "Opacity();" 
          value = "Opacity">
      </div>
      
      <!-- footer div -->
      <div id = "divFooter">
        Copyright <a href="mailto:Pascal@BayashiInJapan.net">
            P. Baillehache
        </a>, 2017.<br>
      </div>

    </div>

    <script type="text/javascript">

    </script>

  </body>

</html>
