

var lang = (navigator.language) ? navigator.language : navigator.userLanguage;
lang = lang.substr(0,2);

var infoContent = "";
var error1 = "";
var error2= "";
var download= "";
var developerText= "";
var imprintText= "";
var closeText= "";

if (lang == "de") {
    infoContent = "Für diese Anwendung müssen Sie den Zugriff auf Ihre Webcam im oberen Bereich ihres Browsers aktivieren!";
    error1 = "Die Webcame kann nicht vom Browser angesprochen werden! Vermutlich wird sie von einem anderen Programm verwendet!";
    error2 = "Ihr Browser wird nicht Unterstützt!";
    download = "Herunterladen";
    developerText = "Entwickler";
    imprintText = "Impressum";
    closeText = "Schließen";
} else {
    infoContent = "For this application you need to enable access to your webcam at the top of your browser!";
    error1 = "The Webcame can not be accessed by the browser! Presumably it is used by another program!";
    error2 = "Your browser is not supported!";
    download = "Download";
    developerText = "Developer";
    imprintText = "Imprint";
    closeText = "Close";
}

$(document).ready(function () {  
    //Dialog
    $('a.buttonDia').click(function () {       
        $('#dialog-overlay, #dialog-box').hide();         
        return false;  
    });  
    $(window).resize(function () {  
        if (!$('#dialog-box').is(':hidden')) popup();         
    }); 
    
});

//
var recorder;
var onvideo = false;



function startMedia() {
    try {
        //Opera
        if(navigator.getUserMedia)
        {
            navigator.getUserMedia({
                video:true
            }, function(stream) {
                videoPlayer.src = stream;
                startVideo();
            }, function(err) {
                alert(error1);
            });
        }
        //Firefox
        else if(navigator.mozGetUserMedia)
        {
            navigator.mozGetUserMedia({
                video:true
            }, function(stream) {
                videoPlayer.mozSrcObject = stream;
                startVideo();
            }, function(err) {
                alert(error1);
            });
        //infoContent += '<br/>Im Firefox muss in "about:config" die Einstellung "media.peerconnection.enabled" auf "true" gesetzt sein!';
        }
        //Chrome
        else if(navigator.webkitGetUserMedia)
        {
            navigator.webkitGetUserMedia({
                video:true
            }, function(stream) {
                videoPlayer.src = window.webkitURL.createObjectURL(stream);
                startVideo();
            }, function(err) {
                alert(error1);
            });
        }
        else
        {
            alert(error2);
            infoContent = error2;
        }
    } catch(e) {
        alert(e);
        stopMedia();
    }
    $("#info").html(infoContent);
    
}

function startVideo()
{
    $("#info").hide();
    $("#footer").show();
    $("#developerText").html(developerText);
    $("#imprintText").html(imprintText);
    $("#closeText").html(closeText);
    videoPlayer.play();
    recorder = RecordRTC({
        video: videoPlayer
    });
}

function captureImage() {

    canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width  = videoPlayer.videoWidth;
    canvas.height = videoPlayer.videoHeight;
    ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
    displayPhoto();
}

function captureVideo() {
    if(onvideo)
    {
        recorder.stopVideo(function(videoURL) {
            //recorder.save();
            popup('<video controls height="500px" src="'+videoURL+'"></video>');
            $('#setVideo').val('Video');
        });
        onvideo = false;
    }
    else
    {
        recorder.recordVideo();
        onvideo = true;
        $('#setVideo').val('Stop');
    }
}

function displayPhoto() {
    var data = canvas.toDataURL("image/png");
    var print = '<a class="link" onclick="savePhoto()"><img title="'+download+'" src="'+data+'" alt=""></a>';
    //print += '<br /><input onclick="savePhoto()" type="submit" value="Speichern" class="button"/>';
    popup(print);
//document.location.href = data;
}

function savePhoto()
{
    var cs = new CanvasSaver('canvasSave.php');
    cs.savePNG(canvas, 'picture');
}


function CanvasSaver(url) {
    this.url = url;
    this.savePNG = function(cnvs, fname) {
        if(!cnvs || !url) return;
        fname = fname || 'picture';

        var data = cnvs.toDataURL("image/jpeg");
        data = data.substr(data.indexOf(',') + 1).toString();
        var dataInput = document.createElement("input") ;
        dataInput.setAttribute("name", 'imgdata') ;
        dataInput.setAttribute("value", data);

        var nameInput = document.createElement("input") ;
        nameInput.setAttribute("name", 'name') ;
        nameInput.setAttribute("value", fname + '.jpeg');

        var myForm = document.createElement("form");
        myForm.method = 'post';
        myForm.action = url;
        myForm.appendChild(dataInput);
        myForm.appendChild(nameInput);

        document.body.appendChild(myForm) ;
        myForm.submit() ;
        document.body.removeChild(myForm) ;
    };
}

//Popup dialog  
function popup(message) {  
          
    // get the screen height and width    
    var maskHeight = $(document).height();    
    var maskWidth = $(window).width();  
      
    // calculate the values for center alignment  
    if (maskHeight > $('#dialog-box').height())
    {
        var dialogTop =  (maskHeight - $('#dialog-box').height())/6;  
    }
    else
    {
        var dialogTop = 15;
    }
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);   
      
    // assign values to the overlay and dialog box  
    $('#dialog-overlay').css({
        height:maskHeight, 
        width:maskWidth
    }).show();  
    $('#dialog-box').css({
        top:dialogTop, 
        left:dialogLeft
    }).show();  
      
    // display the message  
    $('#dialog-message').html(message);  
              
}