let mousePos;
let speed;
// let myDot;
let flares = [];
let particleSystems = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  //myDot = new Dot();
  //console.log(myDot);
}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}


function draw() {
  background(0, 0, 50, 40);
  //   myDot.update();
  //   myDot.drawDot();

  for (let i = 0; i < flares.length; i++) {
    let f = flares[i];
    f.update();
    f.drawFlare();
    f.checkBoom();
  }

  for (let i = 0; i < particleSystems.length; i++) {
    let ps = particleSystems[i];

    ps.update();
  }
}

class Flare {
  constructor(xPos, yPos) {
    this.mousePos = createVector(xPos, yPos);
    this.posR = createVector(random(width), random(height));
    this.pos = this.posR;
    this.gravity = random(0.01, 0.1);
    this.acc = createVector(0, this.gravity);
    this.speed = createVector(0, -1);
    this.size = random(4, 30);
    this.lerpAmt = this.speed;
    this.lerpFrames = 40; // duration in frames
    this.lerpProgress = 0;
    this.ignited = false;
    this.alive = true;
    //this.color = color(random(255), random(255), random(255))
    this.color = [random(255), random(255), random(255), 255];
  }

  drawFlare() {
    fill(this.color);
    noStroke();
    circle(this.pos.x, this.pos.y, this.size);
  }
  update() {
    //this.speed.add(this.acc)
    //this.mousePos.add(this.speed);
    this.lerpAmt = map(this.lerpProgress, 0, this.lerpFrames, 1, 0, true);
    this.pos = p5.Vector.lerp(this.mousePos, this.posR, this.lerpAmt);

    if (this.lerpProgress <= this.lerpFrames && this.ignited == false) {
      this.lerpProgress++;
    } else {
      if (this.ignited == false) {
        particleSystems.push(
          new ParticleSystem(
            this.mousePos.x,
            this.mousePos.y,
            this.gravity,
            this.color,
            this.size
          )
        );
        this.ignited = true;
      }
    }
    if (this.alive == false) {
      flares.splice(0, 1);
    }
  }

  checkBoom() {
    if (this.ignited == true) {
      this.alive = false;
    }
  }
}

class ParticleSystem {
  constructor(xPos, yPos, gravity, color, size) {
    this.numParticles = random(50, 200);
    this.pos = createVector(xPos, yPos);
    //this.gravity = gravity;
    //this.color = color(random(255),    random(255), random(255));
    this.particles = [];

    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push(
        new Particle(this.pos.x, this.pos.y, gravity, color, size)
      );
    }
  }

  update() {
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];

      //for(let )
      p.update();
      p.draw();

      if (p.alive == false) {
        this.particles.splice(0, 1);
      }
    }
  }
}

class Particle {
  constructor(xPos, yPos, gravity, color, size) {
    this.pos = createVector(xPos, yPos);
    this.vel = createVector(random(-5, 5), random(-5, 5));
    this.acc = createVector(0, gravity);
    this.size = size;
    this.color = color;
    this.alive = true;
    this.age = 300;
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc); // add the "gravity" from the parent particle system
    this.checkWalls();
    this.color[3] = this.age;
    this.age -= 2;

    if (this.age <= 0) {
      this.alive = false;
    }
  }

  draw() {
    fill(this.color);
    noStroke();
    circle(this.pos.x, this.pos.y, this.size);
  }

  checkWalls() {
    if (
      this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y < 0 ||
      this.pos.y > height
    ) {
      this.alive = false;
    }
  }
}

function mousePressed() {
  flares.push(new Flare(mouseX, mouseY));
}
