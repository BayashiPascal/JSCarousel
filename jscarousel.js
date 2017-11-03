/* ============= jscarousel.js =========== */

// ------------ Constant

var JSCarouselModePerspective = 0;
var JSCarouselModeCylinder = 1;

var JSCarouselEffectSolid = 0;
var JSCarouselEffectDarken = 1;
var JSCarouselEffectOpacity = 2;

// ------------ JSCarousel

function JSCarousel(idJSCarousel, idParent, imgUrls, nbImg, 
  width, height, range, initImg, speed) {
  try {
    // Memorize the parameters
    this._idJSCarousel = idJSCarousel;
    this._idParent = idParent;
    this._nbImg = nbImg;
    this._width = width;
    this._height = height;
    this._range = range; // control the number of displayed images:
                         // one image plus (rnage - 1) neighbours
                         // on each side
    this._initImg = initImg;
    this._speed = speed; // second, delay from one image to the next
    // Initialize the properties
    this._img = new Array();
    this._tickInterval = 40; // millisecond, 25 frames/second
    this._mode = JSCarouselModePerspective;
    this._effect = JSCarouselEffectSolid;
    this._heightImg = height - 10; // Substract 10 pixel to create
                                   // space for the box-shadow
    // Upload the images
    for (var iImg = 0; iImg < nbImg; iImg += 1) {
      this._img[iImg] = document.createElement("img");
      this._img[iImg].id = "img" + this._idJSCarousel + iImg;
      this._img[iImg].src = imgUrls[iImg];
      this._img[iImg].className = "imgJSCarousel";
      // The aspect ratio of the iimage is unknown yet, set it to 0.0
      // to hide the image until its loaded
      this._img[iImg]._aspectRatio = 0.0;
      // And update it when the image will be loaded
      $(this._img[iImg]).load(function() {
          console.log("JSCarousel loaded: " + this.src);
          this._aspectRatio = this.naturalWidth / this.naturalHeight;
        });
    }
    // Create the carousel board
    this._board = document.createElement("div");
    this._board.id = this._idJSCarousel;
    this._board.className = "divJSCarouselBoard";
    this._board.style.width = this._width + "px";
    this._board.style.height = this._height + "px";
    // Add the board to the parent block
    document.getElementById(idParent).appendChild(this._board);
    // Add the images to the board
    for (var iImg = 0; iImg < nbImg; iImg += 1) {
      this._board.appendChild(this._img[iImg]);
    }
    // Initialize the first current image
    this._curImg = this._initImg;
    // Initialize the target image to the current image
    this._tgtImg = this._curImg;
    // Initialize the step for transition between images
    this._stepImg = this._tickInterval * 0.001 / this._speed;
    // Set the tick function
    var that = this;
    window.setInterval(function(){
      that.Tick();
    }, this._tickInterval);
  } catch (err) {
    console.log("JSCarousel " + err.stack);
  }
}

// Tick method for the carousel
JSCarousel.prototype.Tick = function() {
  try {
    // If the target image is different from the current image
    if (Math.abs(this._tgtImg - this._curImg) > 0.0001) {
      // Slide the curImg index toward the tgtImg
      if (this._tgtImg > this._curImg) {
        this._curImg += 
          Math.min(this._stepImg, this._tgtImg - this._curImg);
      } else if (this._tgtImg < this._curImg) {
        this._curImg -= 
          Math.min(this._stepImg, this._curImg - this._tgtImg);
      }
    } else {
      // To avoid numerical imprecision
      this._curImg = this._tgtImg;
    }
    // Update the size and position of the images
    this.UpdateImg();
  } catch (err) {
    console.log("JSCarousel.Tick " + err.stack);
  }
}

// Update size and pos of images in the carousel
JSCarousel.prototype.UpdateImg = function() {
  try {
    for (var iImg = 0; iImg < this._nbImg; iImg += 1) {
      var paramImg = this.GetParamImg(iImg);
      this._img[iImg].style.width = paramImg[0] + "px";
      this._img[iImg].style.height = paramImg[1] + "px";
      this._img[iImg].style.left = paramImg[2] + "px";
      this._img[iImg].style.top = paramImg[3] + "px";
      this._img[iImg].style.zIndex = paramImg[4];
      this._img[iImg].style.filter = "brightness(" + paramImg[5] + "%)";
      this._img[iImg].style.opacity = paramImg[6];
    }
  } catch (err) {
    console.log("JSCarousel.UpdateImg " + err.stack);
  }
}

// Method to get the current parameters (position, size, ...) of 
// the iImg-th image in the carousel
JSCarousel.prototype.GetParamImg = function(iImg) {
  try {
    // Calculate the relative position of the image
    var pRel = iImg - this._curImg;
    // Declare a variable to memorize the result
    var param = new Array();
    // If the image is displayed
    if (Math.abs(pRel) < this._range) {
      // Calculate the height and width of the image
      var height = this._heightImg;
      var width = height * this._img[iImg]._aspectRatio;
      if (this._mode == JSCarouselModePerspective) {
        height = this._heightImg * 
          Math.cos(pRel * 90.0 / this._range * 0.01745);
        width = height * this._img[iImg]._aspectRatio;
      } else if (this._mode == JSCarouselModeCylinder) {
        height = this._heightImg * 
          (0.5 + 0.5 * Math.cos(pRel * 90.0 / this._range * 0.01745));
        width = this._heightImg * this._img[iImg]._aspectRatio * 
          Math.cos(pRel * 90.0 / this._range * 0.01745);
      }
      // Ensure landscape pictures are as wide as portrait pictures
      // are tall
      if (width > height) {
        var r = height / width;
        width = height;
        height *= r;
      }
      // Calculate the left position
      var left = 
        0.5 * ((1.0 + pRel / this._range) * this._width - width);
      // Calculate the top position
      var top = 0.5 * (this._heightImg - height);
      // Calculate the darkness and opacity
      var brightness = 100;
      var opacity = 1.0;
      if (this._effect == JSCarouselEffectSolid) {
        brightness = 100;
        opacity = 1.0;
      } else if (this._effect == JSCarouselEffectDarken) {
        brightness = 100 * Math.cos(pRel * 90.0 / this._range * 0.01745);
        opacity = 1.0;
      } else if (this._effect == JSCarouselEffectOpacity) {
        brightness = 100;
        opacity = Math.cos(pRel * 90.0 / this._range * 0.01745);
      }
      // Calculate the zIndex
      var zindex = Math.round(this._range - Math.abs(pRel));
      // Set the return values
      param[0] = width;
      param[1] = height;
      param[2] = left;
      param[3] = top;
      param[4] = zindex;
      param[5] = brightness;
      param[6] = opacity;
    // Else, the image is not displayed
    } else {
      param[0] = 0;
      param[1] = 0;
      param[2] = 0;
      param[3] = 0;
      param[4] = 0;
      param[5] = 0;
      param[6] = 0;
    }
    // Return the result
    return param;
  } catch (err) {
    console.log("JSCarousel.GetParamImg " + err.stack);
  }
}

// Method to request the slide of the carousel to the iImg-th image
JSCarousel.prototype.SetTarget = function(iImg) {
  try {
    this._tgtImg = iImg;
  } catch (err) {
    console.log("JSCarousel.SetTarget " + err.stack);
  }
}

// Method to set the carousel to perspective mode
JSCarousel.prototype.SetPerspectiveMode = function() {
  try {
    this._mode = JSCarouselModePerspective;
  } catch (err) {
    console.log("JSCarousel.SetPerspectiveMode " + err.stack);
  }
}

// Method to set the carousel to cylinder mode
JSCarousel.prototype.SetCylinderMode = function() {
  try {
    this._mode = JSCarouselModeCylinder;
  } catch (err) {
    console.log("JSCarousel.SetCylinderMode " + err.stack);
  }
}

// Method to set the carousel to solid effect
JSCarousel.prototype.SetSolidEffect = function() {
  try {
    this._effect = JSCarouselEffectSolid;
  } catch (err) {
    console.log("JSCarousel.SetSolidEffect " + err.stack);
  }
}

// Method to set the carousel to darken effect
JSCarousel.prototype.SetDarkenEffect = function() {
  try {
    this._effect = JSCarouselEffectDarken;
  } catch (err) {
    console.log("JSCarousel.SetDarkenEffect " + err.stack);
  }
}

// Method to set the carousel to opacity effect
JSCarousel.prototype.SetOpacityEffect = function() {
  try {
    this._effect = JSCarouselEffectOpacity;
  } catch (err) {
    console.log("JSCarousel.SetOpacityEffect " + err.stack);
  }
}

