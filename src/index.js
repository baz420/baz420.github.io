import * as a1lib from "@alt1/base"

const imgContainer = document.getElementById("img-container")
 var imageData = a1lib.capture(100,100,400,400);
 var imageBuffer = imageData.toImage();
 var imgCanvas = imageBuffer.show();

 imgContainer.appendChild(imgCanvas);

 



