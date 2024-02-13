import * as a1lib from "@alt1/base"

import "./index.html";
import "./index.css"
import "./appconfig.json";

// const imgContainer = document.getElementById("img-container");
//  var imageData = a1lib.capture(100,100,400,400);
//  var imageBuffer = imageData.toImage();
//  var imgCanvas = imageBuffer.show();

//  imgContainer.appendChild(imgCanvas);
const myOutput = document.getElementById("myOutput");
const worldText = document.getElementById("worldText");
const mousePositionText = document.getElementById("mousePositionText")







const printWorld = () => {
	worldText.textContent = `World: ${alt1.lastWorldHop}`
}

const printMousePosition = () => {
	let mousePos = a1lib.getMousePosition();
	mousePositionText.textContent = `Mouse X: ${mousePos.x}, Y: ${mousePos.y}`;
	
	
}

const flashText = (paragraph) => {
	paragraph.style.color = `hsl(${Math.floor(Math.random() * 359)},100%,30%)`;
}


setInterval(printWorld, 1);
setInterval(printMousePosition, 1);


setInterval(() => flashText(worldText), 100)

 
var output = document.getElementById("output");

// loads all images as raw pixel data async, images have to be saved as *.data.png
// this also takes care of metadata headers in the image that make browser load the image
// with slightly wrong colors
// this function is async, so you cant acccess the images instantly but generally takes <20ms
// use `await imgs.promise` if you want to use the images as soon as they are loaded
// var imgs = a1lib.webpackImages({
// 	homeport: require("./homebutton.data.png")
// });

// listen for pasted (ctrl-v) images, usually used in the browser version of an app
a1lib.PasteInput.listen(img => {
	findHomeport(img);
}, (err, errid) => {
	output.insertAdjacentHTML("beforeend", `<div><b>${errid}</b>  ${err}</div>`);
});

// You can reach exports on window.TestApp because of
// library:{type:"umd",name:"TestApp"} in webpack.config.ts
export function capture() {
	if (!window.alt1) {
		output.insertAdjacentHTML("beforeend", `<div>You need to run this page in alt1 to capture the screen</div>`);
		return;
	}
	if (!alt1.permissionPixel) {
		output.insertAdjacentHTML("beforeend", `<div>Page is not installed as app or capture permission is not enabled</div>`);
		return;
	}
	var img = a1lib.captureHoldFullRs();
	findHomeport(img);
}

function findHomeport(img) {
	var loc = img.findSubimage(imgs.homeport);
	for (let match of loc) {
		output.insertAdjacentHTML("beforeend", `<div>match at: ${match.x}, ${match.y}</div>`);

		//get the pixel data around the matched area and show them in the output
		let pixels = img.toData(match.x - 20, match.y - 20, imgs.homeport.width + 40, imgs.homeport.height + 40);
		output.insertAdjacentElement("beforeend", pixels.toImage());

		//overlay a rectangle around it on screen if we're running in alt1
		if (window.alt1) {
			alt1.overLayRect(a1lib.mixColor(255, 255, 255), match.x, match.y, imgs.homeport.width, imgs.homeport.height, 2000, 3);
		}
	}
	if (loc.length == 0 && window.alt1) {
		alt1.overLayTextEx("Couldn't find homeport button", a1lib.mixColor(255, 255, 255), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}
}

//check if we are running inside alt1 by checking if the alt1 global exists
if (window.alt1) {
	//tell alt1 about the app
	//this makes alt1 show the add app button when running inside the embedded browser
	//also updates app settings if they are changed
	alt1.identifyAppUrl("./appconfig.json");
} else {
	let addappurl = `alt1://addapp/${new URL("./appconfig.json", document.location.href).href}`;
	output.insertAdjacentHTML("beforeend", `
		Alt1 not detected, click <a href='${addappurl}'>here</a> to add this app to Alt1
	`);
}

//also the worst possible example of how to use global exposed exports as described in webpack.config.js
output.insertAdjacentHTML("beforeend", `
	<div>paste an image of rs with homeport button (or not)</div>
	<div onclick='TestApp.capture()'>Click to capture if on alt1</div>`
);
 



