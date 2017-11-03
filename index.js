/* ============= index.js =========== */

// ------------ Global variables
var theJSCarousel = {};
var playing = 0;

// ------------ OnLoad function

function BodyOnLoad() {
  try {
    // Create the image url array
    var folderImg = "./Img/";
    var nbImg = 10;
    var urls = new Array();
    for (var iImg = 0; iImg < nbImg; iImg += 1) {
      var id = ("00" + iImg).slice(-3);
      urls[iImg] = folderImg + "/" + id + ".jpg";
    }
    // Create the JSCarousel entity
    var idParent = "divJSCarousel";
    var idJSCarousel = "divMyJSCarousel";
    var width = 800;
    var height = 512;
    var range = 2;
    var initImg = 0;
    var speed = 1;
    theJSCarousel = new JSCarousel(idJSCarousel, idParent, urls, nbImg, 
      width, height, range, initImg, speed);
    // Set the tick function
    tickInterval = 2000; // millisecond
    window.setInterval(function(){
      Tick();
    }, tickInterval);
  } catch (err) {
    console.log("BodyOnLoad " + err.stack);
  }
}

// ------------ Function to move to the previous image

function Prev() {
  try {
    theJSCarousel.SetTarget(theJSCarousel._tgtImg - 1);
  } catch (err) {
    console.log("Prev " + err.stack);
  }
}

// ------------ Function to move to the next image

function Next() {
  try {
    theJSCarousel.SetTarget(theJSCarousel._tgtImg + 1);
  } catch (err) {
    console.log("Next " + err.stack);
  }
}

// ------------ Function to change to perspective mode

function Perspective() {
  try {
    theJSCarousel.SetPerspectiveMode();
  } catch (err) {
    console.log("Perspective " + err.stack);
  }
}

// ------------ Function to change to cylinder mode

function Cylinder() {
  try {
    theJSCarousel.SetCylinderMode();
  } catch (err) {
    console.log("Cylinder " + err.stack);
  }
}

// ------------ Function to change to solid mode

function Solid() {
  try {
    theJSCarousel.SetSolidEffect();
  } catch (err) {
    console.log("Solid " + err.stack);
  }
}

// ------------ Function to change to darken mode

function Darken() {
  try {
    theJSCarousel.SetDarkenEffect();
  } catch (err) {
    console.log("Darken " + err.stack);
  }
}

// ------------ Function to change to opacity mode

function Opacity() {
  try {
    theJSCarousel.SetOpacityEffect();
  } catch (err) {
    console.log("Opacity " + err.stack);
  }
}

// ------------ Function to play automatically

function Play() {
  try {
    if (playing == 0) {
      playing = 1;
    } else {
      playing = 0;
    }
  } catch (err) {
    console.log("Play " + err.stack);
  }
}
function Tick() {
  try {
    if (playing == 1) {
      // If we haven't passed all the images
      // (go up to nbImg + range to slide til the last image disappears)
      if (theJSCarousel._tgtImg < 
        theJSCarousel._nbImg + theJSCarousel._range - 1) {
        // Move to next image
        Next();
      // Else, we have passed all the images
      } else {
        // Restart from beginning
        // (start at -range to put have the first image appearing from
        // null at next step)
        theJSCarousel._curImg = -1 * theJSCarousel._range;
        theJSCarousel._tgtImg = theJSCarousel._curImg + 1;
      }
    }
  } catch (err) {
    console.log("Tick " + err.stack);
  }
}
