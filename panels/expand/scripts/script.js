var lastModified = "2017-08-02";
var lastUploaded = "2017-08-02";
var templateVersion = "2.0.24";

var clickthroughButton;
var sdkData;
var adId, rnd, uid;
var isMRAID;
var clips

function checkIfAdKitReady(event) {
	adkit.onReady(initializeCreative);
}

function initializeCreative(event) {
	try { //try/catch just in case localPreview.js is not included
		if (window.localPreview) {
			window.initializeLocalPreview(); //in localPreview.js
		}
	}
	catch (e) {}
	//Workaround (from QB6573) for Async EB Load where Modernizr isn't properly initialized
	typeof Modernizr === "object" && (Modernizr.touch = Modernizr.touch || "ontouchstart" in window);

	window.registerInteraction = function() {}; //overwrite rI function because it will never actually be called
	initializeGlobalVariables();
	addEventListeners();
	buttonSelector()

	EB.Comm.callWhenConnected(["header", "sky_izq", "sky_der"], "changeBackground")
	EB.Comm.setName("header");
}

function initializeGlobalVariables() {
	adId = EB._adConfig.adId;
	rnd = EB._adConfig.rnd;
	uid = EB._adConfig.uid;
	
	clickthroughButton = document.getElementById("clickthroughButton-Header");
	clips = document.getElementsByClassName('clip')

	if (!isMRAID) {
		sdkData = EB.getSDKData();
		isMRAID = sdkData !== null && sdkData.SDKType === "MRAID";
	}
}

function addEventListeners() {
	clickthroughButton.addEventListener("click", handleClickthroughButtonClick);
}

function buttonSelector(){
	var clipsArray = Array.from(clips)
	clipsArray.forEach(element => {
		element.addEventListener('click', function(e){
			EB.userActionCounter(`changeToColor_${e.target.id}`);
			syncHandler(e.target.id)
		})
	}); 
}

function syncHandler(image){
	EB.Comm.broadcast("changeBackground", image);
}

function changeBackground(e){
	document.getElementById("header").setAttribute("style", "background-image: url('images/"+ e +".jpg');")
}

function handleClickthroughButtonClick() {
	EB.clickthrough();
}

function getCustomVar(cv) {
	cv = EB.API.getCustomVar(cv);
	if (typeof(cv) != "undefined") {
		return cv;
	}
	else {
		return "noVarFound";
	}
}
window.addEventListener("load", checkIfAdKitReady);