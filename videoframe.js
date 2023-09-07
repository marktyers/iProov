
/* video_recording.js */

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

	setTimeout( () => tidyUp(interval), 10000)

	const video = document.querySelector('video')
	const width = video.offsetWidth
	const height = video.offsetHeight
	captureImage()
	const interval = setInterval(() => captureImage(), 500)
})

function handleSuccess(stream) {
	const video = document.querySelector('video')
	window.stream = stream
	video.srcObject = stream
}

// capture a single image
function captureImage() {
	const bg = colours.shift()
	const body = document.querySelector('body')
	if (bg === 1) body.classList.remove('black')
	if (bg === 0) body.classList.add('black')
	const canvas = document.querySelector('canvas')
	var context = canvas.getContext('2d')
	const video = document.querySelector('video')
	context.drawImage(video, 0, 0, 320, 240)
	const base64 = canvas.toDataURL()
	const img = document.createElement('img')
	img.src = base64
	document.querySelector('section').appendChild(img)
}

function tidyUp(interval) {
	clearInterval(interval)
	stream.getTracks().forEach( track => track.stop())
	document.querySelector('section').hidden = false
	document.querySelector('video').hidden = true
	document.querySelector('canvas').hidden = true
}