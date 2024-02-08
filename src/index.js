

import * as a1lib from "@alt1/base";

     



        var imgref = a1lib.capture(100,100,400,400);

// Retrieve our raw pixel data so we can directly read it
        var imagebuffer = imgref.toData();

// Show the image by adding it to the DOM (for debugging)
       
        imagebuffer.show();

    
    // pixelCompare(imageData, 0, 0, 900)



