const video = document.querySelector('.handsome');
const canvas = document.querySelector('#paint');
const ctx = canvas.getContext('2d');


async function go() {
  // first ask for get user media
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
  video.srcObject = stream;
}


function takePhoto() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  const data = canvas.toDataURL('image/png');
  var res = data.replace("data:image/png;base64,", "");
 
 var type = "WEB_DETECTION";
 var json = '{' +
    ' "requests": [' +
    ' { ' +
    '   "image": {' +
    '     "content":"' + res + '"' +
    '   },' +
    '   "features": [' +
    '       {' +
    '         "type": "' + type + '",' +
    '     "maxResults": 1' +
    '       }' +
    '   ]' +
    ' }' +
    ']' +
    '}';

$.ajax({
    type: 'POST',
    url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD1h9v1qDj0EMx6UjLtpFn5t0ZjPGxstSQ",
    dataType: 'json',
    data: json,
    //Include headers, otherwise you get an odd 400 error.
    headers: {
      "Content-Type": "application/json",
    },

    success: function(data, textStatus, jqXHR) {
      musicInfo = data.responses["0"].webDetection.bestGuessLabels["0"].label;
      $.ajax({
        method: "GET",
        url: "https://api.spotify.com/v1/search?q=" + musicInfo + "&type=album&limit=1",
        headers: {
        Accept: 'application/json',
        Authorization: 'Bearer BQBjBIT1lMeGA5_37wWqndCmGLqQ93O0kVyvZ_ZubqwUIpTNc_q_5dCsONFB8WZ4Gg3fAiPpLbLzCM8IJdbxOEOhb50paTd2dn9KQuaKp0-XI8gLw799D2mUPepNWwIoKgAY1EUPQ7Bj9c4'
},
          }).done(function(data) {
             window.open(data.albums.items["0"].external_urls.spotify,'_blank');
             console.log(data.albums.items["0"]);




             // var albumURL = document.getElementById('player');
             // albumURL.setAttribute("src", 'https://open.spotify.com/embed?uri='+ data.albums.items["0"].uri);
             // console.log(data.albums.items["0"].uri);

          });

      console.log(musicInfo);


// spotify:album:42oggZmZI9b5BOPMGvYuXh

  },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('ERRORS: ' + textStatus + ' ' + errorThrown);
    }
  });   


    }


function deletePhoto() {
  var can = document.getElementById("paint");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

}

go().catch(err => {
  alert(err.message);
});

