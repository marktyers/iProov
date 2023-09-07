
# iProov Web SDK Technical Evaluation

> September 2023, this works on Safari as well as Chrome

This is the first iteration of the solution. Needs more work to improve code quality and performance.

Proof of concept only.

Most of the help came from the Mozilla Developer Network website.

Getting a list of cameras and connecting. Displaying a live video feed.

Used a simple function to start the video stream.

Toggling the black/white background sequence defined in an array of numbers. 
Each loop removes the first index from this.

Capturing the images.

Already knew how to draw an image from the live feed inside a canvas. Not strictly required so 
decided to hide this element.

Canvas really powerful and simple to convert this into a data URL base64-encoded.

Final step to create an img element using this DataURL as its src and appending to the page.
Not supposed to be showing the images until the end of the script so hid this section.

## Repeating Action

Probably a more elegant approach but standard JS tools will suffice.

Using the standard `setInterval()` method will callback. Do an initial capture then repeat every 500ms.

Use a `setTimeout()` callback to cancel the `setInterval()`

At the end of the script we need to hide all the elements and show the 20 images.
