<!DOCTYPE html>
<html lang="de">
    <head>
        <!-- Impressum: Valentin Giselbrecht vgiselbrecht@hotmail.com -->
        <meta name="description" content="egoview ermöglicht es Ihnen, sehr einfach ein Foto von Ihnen über die Webcam zu erstellen!">
        <meta name="keywords" content="egoview, gise, webcam, picture, from, you">
        <meta name="author" content="Valentin Giselbrecht">
        <meta charset="utf-8" />
        <meta property="og:title" content="egoview [Beta]" >
        <meta property="og:description" content="egoview ermöglicht es Ihnen, sehr einfach ein Foto von Ihnen über die Webcam zu erstellen!" >
        <meta property="og:url" content="http://egoview.tk" >
        <meta property="og:image" content="http://egoview.tk/images/og.png" >
        <title>egoview [Beta]</title>
        <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
        <link rel="icon" href="images/favicon.ico" type="image/x-icon">
        <link rel="stylesheet" type="text/css" href="style.css">
        <script language="JavaScript" type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="script.js"></script>
        <script language="JavaScript" type="text/javascript" src="RecordRTC.js"></script>
        <script language="JavaScript" type="text/javascript" src="Whammy.js"></script>
    </head>
    <body>
        <div id="wrapper">
            <div id="info"></div>
            <video id="video" height="100%"></video>
            <div id="footer">
                <a href="http://www.gise.at" target="_blank"><span id="developerText" class="textFooter textFooterLeft">Developer</span></a>
                <span class="placeholderLeft"></span>
                <input value="Shoot" id="setImage" class="buttonFooter buttonShot" onclick="captureImage()" type="submit"/>
                <input value="Video" id="setVideo" class="buttonFooter buttonShot" onclick="captureVideo()" type="submit"/>
                <span class="placeholderRight"></span>
                <a href="http://www.gise.at/#!/pageImpressum" target="_blank"><span id="imprintText" class="textFooter textFooterRight">Imprint</span></a>
            </div>
        </div>
        <div id="dialog-overlay"></div>  
        <div id="dialog-box">  
            <div class="dialog-content">  
                <div id="dialog-message"></div>  
                <a id="closeText" class="buttonDia link">Close</a>  
            </div>  
        </div> 
        <script type="application/javascript">
            $("#footer").hide();
            var videoPlayer = document.getElementById("video");
            var canvas;
            startMedia();        
        </script>
    </body>
</html>