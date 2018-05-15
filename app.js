const video = document.querySelector('.handsome');
const canvas = document.querySelector('#paint');
const ctx = canvas.getContext('2d');


async function go() {
  // first ask for get user media
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
}

function takePhoto() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  const data = canvas.toDataURL('image/jpeg');
  console.log(data);
}

function deletePhoto() {
  var can = document.getElementById("paint");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

}

go().catch(err => {
  alert(err.message);
});