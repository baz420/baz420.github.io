

import * as a1lib from "@alt1/base";


     const pageTitleEl = document.querySelector("#title")
    // const val = a1lib.getMousePosition()
    const imgEl = document.getElementById("img-el");

    // pageTitleEl.textContent = `X: ${val.x}, Y: ${val.y}`
     

 
     var mainImgref = a1lib.capture(alt1.screenX,alt1.screenY,1000, 1000);

    // var imagebuffer = imgref.toDrawableData()


    
    // imagebuffer.show()

    const doThings = async() => {
        const imageData = await a1lib.ImageDetect.imageDataFromUrl("./yo.png")
        const x = await mainImgref.pixelCompare(imageData, 0, 0, 900)
        console.log(x)
    }


    
        var imgref = a1lib.capture(100,100,400,400);

// Retrieve our raw pixel data so we can directly read it
        var imagebuffer = imgref.toData();

// Show the image by adding it to the DOM (for debugging)
       
        imagebuffer.show();

    
    // pixelCompare(imageData, 0, 0, 900)



