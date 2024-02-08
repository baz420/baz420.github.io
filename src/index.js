import * as a1lib from "@alt1/base"

const imgContainer = document.getElementById("img-container")
 const imageData = a1lib.capture(100,100,400,400);
 const imageBuffer = imageData.toDrawableData();
 const imgCanvas = imageBuffer.show();

 imgContainer.appendChild(imgCanvas);

 



