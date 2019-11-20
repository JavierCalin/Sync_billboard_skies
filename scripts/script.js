/*******************
VARIABLES
*******************/
var creativeId = "Banner"; //Use anything that uniquely identifies this creative
var creativeVersion = "1.0.1"; //0.0.1 during initial dev, 1.0.0 on release, x.x.x once released and receives updates
var lastModified = "2017-08-02";
var lastUploaded = "2017-08-02";
var templateVersion = "2.0.24";

var adId, rnd, uid;
var bannerDiv;
var expandButton;
var sdkData;
var isMRAID;
var useCustomClose;

/*******************
INITIALIZATION
*******************/
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
	expandPanels();

	EB.Comm.setName("base");
}

function expandPanels(){
	adkit.expand({
		panelName: "Header",
		actionType: adkit.ActionType.AUTO,
		useCustomClose: true
	});
	adkit.expand({
		panelName: "Sky_Izq",
		actionType: adkit.ActionType.AUTO,
		useCustomClose: true
	});
	adkit.expand({
		panelName: "Sky_Der",
		actionType: adkit.ActionType.AUTO,
		useCustomClose: true
	});
}

function initializeGlobalVariables() {
	adId = EB._adConfig.adId;
	rnd = EB._adConfig.rnd;
	uid = EB._adConfig.uid;
	
	bannerDiv = document.getElementById("banner");
	
	if (!isMRAID) {
		sdkData = EB.getSDKData();
		isMRAID = sdkData !== null && sdkData.SDKType === "MRAID";
	}
}


window.addEventListener("load", checkIfAdKitReady);