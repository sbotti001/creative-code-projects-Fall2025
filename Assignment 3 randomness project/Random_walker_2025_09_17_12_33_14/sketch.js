let walker = []



function setup() {
  createCanvas(800, 400);
  background(50)
}

function draw() {
  
  for (let i = 0; i < walker.length; i++) {
    walker[i].show();
    walker[i].move();
  }
}

function mousePressed(){
  let newWalker = new Walker(mouseX, mouseY);
  walker.push(newWalker)
  
  // walker.show()
  // walker.move()
  
}
  class Walker {
    constructor() {
      this.x = mouseX
      this.y = mouseY
    }
    
    show() {
      stroke(random(255), random(255), random(255))
      point(this.x, this.y)
    }
    move() {
      let choice = floor(random(4));
      
      if(choice === 0) {
        this.x++;
      }else if(choice ===1) {
        this.x--;
      }else if(choice ===2) {
        this.y++;
      }else if(choice ===3) {
        this.y--;
      }  
    }
  
}


