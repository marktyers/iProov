
/*
  video_recording.js
  script to capture screenshots from a laptop webcam
  iProov Web SDK Test 2023
  Author: Mark J Tyers
*/

const colours = [0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1]

window.addEventListener('DOMContentLoaded', async () => {
  const constraints = {
    // audio: true,
    video: {
      width: 640,
      height: 480
    }
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    handleSuccess(stream)
  } catch (error) {
    console.log(error)
  }

  // stop the process after 10 seconds (10,000 ms)
  setTimeout( () => tidyUp(interval), 10000)
  // immediately grab a screenshot then repeat every 0.5 seconds (500ms)
  captureImage()
  const interval = setInterval(() => captureImage(), 500)
})

// connect to the webcam stream
function handleSuccess(stream) {
  const video = document.querySelector('video')
  const width = video.offsetWidth
  const height = video.offsetHeight
  window.stream = stream
  video.srcObject = stream
}

// capture a single image
function captureImage() {
  // get next colour choice and set background
  const bg = colours.shift()
  const body = document.querySelector('body')
  if (bg === 1) body.classList.remove('black')
  if (bg === 0) body.classList.add('black')

  // capture video frame in the canvas element
  const canvas = document.querySelector('canvas')
  var context = canvas.getContext('2d')
  const video = document.querySelector('video')
  context.drawImage(video, 0, 0, 320, 240)

  // convert the image to a dataURL, create img element and set source
  const base64 = canvas.toDataURL()
  const img = document.createElement('img')
  img.src = base64

  // add the image to the page
  document.querySelector('section').appendChild(img)
}

// perform clean-up at the end
function tidyUp(interval) {
  // stop the imterval timer
  clearInterval(interval)

  // stop the video stream
  stream.getTracks().forEach( track => track.stop())

  // tidy up the interface to show the images
  document.querySelector('section').hidden = false
  document.querySelector('video').hidden = true
  document.querySelector('canvas').hidden = true
}