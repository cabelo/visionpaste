var _photo = document.getElementById("fc_photo");
var _wait = document.getElementById("fc_load");

var _URLbase = 'https://192.168.0.4:8080/image';
var player = document.getElementById('player'); 
var snapshotCanvas = document.getElementById('snapshot');
navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;


var video = document.getElementById('player');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.setAttribute('playsinline', '');

function limparTela(){
    _photo.style.display = "none";
    clearInterval(myVar);
}


//var MODE = "user"; //'user' //'environment' 
var MODE = "environment"; //'user' //'environment' 
//        video: { width: {min: 1280}, height: {min: 720},

var constraints = {
        audio: false,
//        video: { facingMode: MODE , mirrored: true   }
        video: { facingMode: MODE  }
}

navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) 
{
	video.srcObject = stream; 
});


function sendAdd()
{
    _wait.style.display = "block";
    _photo.innerHTML = "";
    var context = snapshot.getContext('2d');
    context.drawImage(player, 0, 0,);
    var jpegUrl = snapshotCanvas.toDataURL("image/jpeg");
    //jpegUrl = jpegUrl.replace("data:image/jpeg;base64,","");
     console.log("IMG")
    var elem = document.createElement("img");
     elem.src = jpegUrl;
     elem.width = 120;
     elem.height = 160;
    _photo.appendChild(elem);
    _photo.style.display = "block";
    //jpegUrl = jpegUrl.replace("data:image/jpeg;base64,","");
    finalJPG = jpegUrl.split(',')[1];
    console.log(finalJPG)

     
    jQuery.support.cors = true;
    jQuery.ajax({
        url: _URLbase,
	enctype: 'application/json',
	contentType: 'application/json',
        dataType: 'json',
        type: 'POST',
        crossDomain: true,    
        data: JSON.stringify( { "data": finalJPG} ),
        //data: JSON.stringify( { "static": 1, "lib": "a200", "exec": "enroll", "img64": jpegUrl} ),
        headers: {
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          'acccept' : 'application/json'
        },
        async: true,
        crossDomain: true,

        success: function( data, textStatus, xhr ){
        console.log(data)

	console.log("retorno")
	console.log(data.result);
	//console.log(data.score);
	//console.log(data.label);
	//console.log("data:image/jpeg;base64, "+data.return);
 		_photo.innerHTML = "";
		if(data.result == "ok")
		{
			var elem = document.createElement("img");
			elem.width = 120;
			elem.height = 160;
			elem.src = "../../static/img/success.png";
			_photo.appendChild(elem);
			_photo.style.display = "block";
			myVar = setTimeout(limparTela, 5000);
		}
    		_wait.style.display = "none";
        },
        error: function( xhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });


}


function sendIMG()
{
    _wait.style.display = "block";
    _photo.innerHTML = "";
    var context = snapshot.getContext('2d');
    context.drawImage(player, 0, 0,);
    var jpegUrl = snapshotCanvas.toDataURL("image/jpeg");
    jpegUrl = jpegUrl.replace("data:image/jpeg;base64,","");
    console.log("IMG")
    console.log(jpegUrl);
     
    jQuery.support.cors = true;
    jQuery.ajax({
        url: _URLbase,
        dataType: 'json',
        type: 'POST',
        
        data: JSON.stringify( { "data": jpegUrl } ),
        //data: JSON.stringify( { "static": 1, "lib": "a200", "exec": "identifyImg", "img64": jpegUrl} ),
        headers: {
          'cache-control': 'no-cache',
          //'content-type': 'application/json charset=UTF-8'
          'content-type': 'application/json',
          'acccept' : 'application/json'
        },
        async: true,
        crossDomain: true,

        success: function( data, textStatus, xhr ){

            console.log("retorno")
            console.log(data.result);
            //console.log(data.score);
            //console.log(data.label);
            var elem = document.createElement("img");
                //elem.src = "img/found.jpg";
		console.log("data:image/jpeg;base64, "+data.return);
		//if(data.status == 1)
		//{
                //	elem.src = "data:image/jpeg;base64, "+data.return;
		//}
		//else
		//{
		elem.src = "img/notfound.jpg";
		//}
		elem.width = 120;
		elem.height = 160;

                _photo.appendChild(elem);
		_photo.style.display = "block";

    		_wait.style.display = "none";
		myVar = setTimeout(limparTela, 5000);
        },
        error: function( xhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}
    
function send()
{
    jQuery.support.cors = true;
    jQuery.ajax({
        url: 'http://localhost:8080/lib',
        dataType: 'json',
        type: 'POST',
        
        data: JSON.stringify( { "lib": "a200", "exec":  "version" } ),
        headers: {
          'cache-control': 'no-cache',
          'content-type': 'application/json charset=UTF-8'
          
        },
        async: true,
        crossDomain: true,

        success: function( data, textStatus, jQxhr ){
            console.log("retorno")
            console.log(data);
            //$('#response pre').html( JSON.stringify( data ) );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

function show()
{ 
    alert("Hello! I am an alert box!!");
}

function changeCamera()
{
    if(MODE == 'user')
    { 
        MODE = 'environment';
        console.log("Camera Traseira "+ MODE);
        
    }
    else
    {
        MODE = 'user';
        console.log("Camera Frontal " + MODE);
        
    }
    gum(MODE);
    //navigator.mediaDevices.getUserMedia({video: { facingMode:  MODE } } ).then(stream => (video.srcObject = stream));
    //navigator.getUserMedia({video: true}).then(stream => (video.srcObject = stream));
    //navigator.mediaDevices.getUserMedia({video: {facingMode: {exact: MODE}}}).then(stream => (video.srcObject = stream));
  
}

function log(msg)
{
    
    console.log(msg);

}

function gum(_MODE)
{
    console.log("debug " + _MODE)
     constraints = {
        audio: false,
        video: { width: {min: 1280}, height: {min: 720},
        facingMode: _MODE
     
  }
}
    
    navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) 
    {
        video.srcObject = stream; 
    });

}

function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
} 
