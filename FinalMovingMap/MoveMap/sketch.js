let zoomFactor = 85;
let terrainColor;
let isInside = false;
let fence;

// navigator.geolocation.watchPosition(dothething);
  
// function dothething(pos) {
//     position = {
//       latitude: pos.coords.latitude,
//       longitude: pos.coords.longitude,
//     }
// }

// Source - https://stackoverflow.com/q
// Posted by user2112613, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-10, License - CC BY-SA 3.0

function startGeolocation() {
 var options;
 navigator.geolocation.watchPosition(geoSuccess, geoFail, options);
 setTimeout(startGeolocation, 3000);
}

function geoSuccess(position) {
  var gpsPosition = position;
  var coordinates = gpsPosition.coords;
  myLat = coordinates.latitude;
  myLong = coordinates.longitude;
}

function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(640, 480);
  background(220);
  //noLoop();
  
  fence = new geoFenceCircle( 41.880444, -87.624639, 0.01, insideTheFence,  outsideTheFence, "mi");
  
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight)
// }

function draw() {
  
  for(x = 0; x < width; x++){
    for(y = 0; y < height; y++){
      const noiseValue = noise(x / zoomFactor,y / zoomFactor, frameCount/100)
      
       if(noiseValue < 0.37){
        terrainColor = color(0, 0, 150)
      }else if(noiseValue > 0.4 && noiseValue < 0.45){
         terrainColor = color(0, 0, 255)
      }else if(noiseValue > 0.45 && noiseValue < 0.5){
          terrainColor = color(255, 220, 200) 
      }else if(noiseValue > 0.5 && noiseValue < 0.53){
            terrainColor = color(0, 255, 0)
      }else if(noiseValue > 0.53 && noiseValue < 0.63){
          terrainColor = color(0, 150, 150)
      }else if(noiseValue > 0.63 && noiseValue < 0.7){
          terrainColor = color(150, 150, 150)
      }else if(noiseValue > 0.7){
          terrainColor = color(255, 255, 255)
      }
         set(x, y, color(terrainColor)) 
      }
    
    }
   updatePixels();
  
  let circlex = width/2
  let circley = height/2
  
  
  
  circle(circlex, circley, 50);

  if(isInside){
    fill(255, 0, 0, 127.5)
    stroke(255, 0, 0)
   // circle(width/2, height/1.5, 200)
  }else{
    fill(100, 100, 100, 127.5)
    stroke(100, 100, 100)
   // circle(width/2, height/1.5, 200)
    

  }
   
  }


function insideTheFence(position) {
  textSize(20)
  text("INlat: " + position.latitude, 255, width/10, height/10);
  text("INlong: " + position.longitude, 255, width/10, height/9);
  text("user is inside the fence", 255, width/10, height/8);
  isInside = true
}

function outsideTheFence(position) {
  textSize(20)
  text("OUTlat: " + position.latitude, 255, width/10, height/10);
  text("OUTlong: " + position.longitude, 255, width/10, height/9);
  text("user is outside the fence", 255, width/10, height/8);
  isInside = false

}

function mousePressed() {
  fence.clear();
}

  
