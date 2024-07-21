// scripts.js

// Get modal elements
const modal = document.getElementById('popupModal');
const openModalLink = document.getElementById('raiseIssueLink');
const closeModalBtn = document.querySelector('.close-btn');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const captureBtn = document.getElementById('captureBtn');
const ctx = canvas.getContext('2d');

// Open the modal and start the camera
openModalLink.onclick = function(event) {
    event.preventDefault(); // Prevent default link behavior
    modal.style.display = 'block';
    startCamera();
}

// Close the modal
closeModalBtn.onclick = function() {
    modal.style.display = 'none';
    stopCamera();
}

// Close the modal if user clicks outside of it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        stopCamera();
    }
}

// Start camera
function startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream;
                video.onloadedmetadata = function() {
                    video.play();
                };
            })
            .catch(function(err) {
                console.error('Error accessing camera: ', err);
            });
    } else {
        alert('Camera not supported by this browser.');
    }
}

// Stop camera
function stopCamera() {
    const stream = video.srcObject;
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(function(track) {
            track.stop();
        });
        video.srcObject = null;
    }
}

// Capture image
captureBtn.onclick = function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/png');
    photo.src = dataURL;
    photo.style.display = 'block';
}
