var Player;
var Rocks = [];
var Drop;
var i=0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  Player = new Player();

  Drop1=new Drop('magenta');

  Drop2=new Drop('red');

  Drop3=new Drop('yellow');

  Drop4=new Drop('blue');


}

function draw() {
  background(40);
  Player.render();
  Player.turn();
  Player.update();
  Player.edges();
  Drop1.fall();
  Drop1.show();
  Drop2.fall();
  Drop2.show();
  Drop3.fall();
  Drop3.show();
  Drop4.fall();
  Drop4.show();

  if(Player.hits(Drop1)){
    Player.score=Player.score+1;
    // console.log("yes");
  } else if(Player.hits(Drop2)){
    Player.score=Player.score+1;
  }
  else if(Player.hits(Drop3)){
    Player.score=Player.score+1;
  }
  else if(Player.hits(Drop4)){
    if (confirm("GAME OVER\nWant To Play Again?????") == true) {
      location.reload();
    } else {
      window.close();
    }

  }
  textSize(40);
  fill(35, 134, 244);

  text("SCORE", 1150, 45)
  text(Player.score, 1199, 90)
}

function keyReleased() {
  Player.setRotation(0);
  Player.accelerating(false);
}

function keyPressed() {
  if (keyIsDown(RIGHT_ARROW)) {
    // Player.setRotation(0);

  } else if (keyIsDown(LEFT_ARROW)) {
    // Player.setRotation(0);
  } else if (keyIsDown(UP_ARROW)) {
    Player.accelerating(true, 1);
  } else if (keyIsDown(DOWN_ARROW)) {
    Player.accelerating(true, 0);
  }
}



function Player() {
  this.pos = createVector(width / 2, height - 50);
  this.lives = 5;
  this.score = 0;
  this.r = 25;
  this.heading = 0;
  this.rotation = 0;
  this.color = 'magenta';
  this.colcount = 0;
  this.vel = createVector(0, 0);

  this.update = function() {
    if (this.isaccelerating && this.res == 1) {
      this.thrust();
      this.pos.add(this.vel);
      this.vel.mult(0.98);
    } else if (this.isaccelerating && this.res == 0) {
      this.thrust();
      this.pos.sub(this.vel);
      this.vel.mult(0.98);
    }
    this.vel.mult(0.98);
  }
  this.hits = function(Rock) {
    var l=(Rock.color==this.color);
    if (Rock.y>this.pos.y && ((this.pos.x>Rock.x && this.pos.x<Rock.wid)||(this.pos.x<Rock.x && this.pos.x>Rock.wid))) {
      if(Rock.color=="blue")
        return true;
      else if(l)
        return true;
    } else {
      return false;
    }
  }

  this.thrust = function() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.5);
    this.vel.add(force);
  }
  this.res = 3;
  this.isaccelerating = false;
  this.accelerating = function(b, c) {
    this.isaccelerating = b;
    this.res = c;
  }
  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(this.color);
    stroke(255);
    rotate(this.heading);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r+10);
    pop();
  }
  this.edges = function() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
  this.setRotation = function(a) {
    this.rotation = a;
    if (this.colcount == 0) {
      this.color = 'red';
      this.colcount++;
    } else if(this.colcount==1){
      this.color='yellow';
      this.colcount++;
    } else if(this.colcount==2){
      this.color='magenta';
      this.colcount++;
    }
    else if(this.colcount==3){
      this.color='blue';
      this.colcount=0;
    }
  }
  this.turn = function(angle) {
    this.heading += this.rotation;
  }
}


function Drop(color) {
  this.color=color;
  this.x = random(width);
  this.y = random(-500, -50);
  this.z = random(0, 20);
  this.len = 10;
  this.wid=this.x+this.len*20;
  this.yspeed = 1.5;

  this.fall = function() {
    this.y = this.y + this.yspeed;

    if (this.y > height) {
      this.y = random(-200, -100);
      this.x=random(width);

    }
  }

  this.show = function() {
    push();
    strokeWeight(10);

    stroke(color);

    line(this.x, this.y, this.wid, this.y);
    pop();
  }
}
