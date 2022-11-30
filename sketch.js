var bg, bgimage
var player, shooterImg, shootingImg
var heart_1Img, heart_2Img, heart_3Img;
var zombie, zombieImg
var heart1, heart2, heart3
var bullets = 70;
var score = 0;
var life = 3;
var gameState = "fight"
var lose, winning, explosion
function preload() {
  bgimage = loadImage("assets/bg.jpeg");
  shooterImg = loadImage("assets/shooter_1.png");
  shootingImg = loadImage("assets/shooter_3.png");
  heart_1Img = loadImage("assets/heart_1.png");
  heart_2Img = loadImage("assets/heart_2.png");
  heart_3Img = loadImage("assets/heart_3.png");
  zombieImg = loadImage("assets/zombie.png");
  explosionSound = loadSound("assets/explosion.mp3");
  winning = loadSound("assets/win.mp3");
  lose = loadSound("assets/lose.mp3");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20);
  bg.addImage(bgimage);
  bg.scale = 1.5
  player = createSprite(displayWidth - 1150, displayHeight - 300, 20, 40);
  player.addImage(shooterImg);
  
  player.scale = 0.5;

  // creating sprites to depict lives remaining 
  heart1 = createSprite(displayWidth - 150, 40, 20, 20)
  heart1.visible = false;
  heart1.addImage("heart1", heart_1Img);
  heart1.scale = 0.5;

  heart2 = createSprite(displayWidth - 100, 40, 20, 20)
  heart2.visible = false;
  heart2.addImage("heart2", heart_2Img);
  heart2.scale = 0.5;

  heart3 = createSprite(displayWidth - 200, 40, 20, 20)
  heart3.addImage("heart3", heart_3Img);
  heart3.scale = 0.5;

  // creating groups for zombies and bullets
  bulletGroup = new Group();
  zombieGroup = new Group();
}






function draw() {
  background(0)
  if(gameState === "fight"){
    if(life === 3){
      heart3.visible = true;
      heart2.visible = false;
      heart1.visible = false;
    }
    if(life === 2){
      heart3.visible = false;
      heart2.visible = true;
      heart1.visible = false;
    }
    if(life === 1){
      heart3.visible = false;
      heart2.visible = false;
      heart1.visible = true;
    }
    if(life === 0){
      gameState = "lost";
    }
    if(score == 100){
      gameState = "won";
      winning.play();
    }
    if (keyDown("UP_ARROW") || touches.length > 0) {
      player.y = player.y - 30
    }
    if (keyDown("DOWN_ARROW") || touches.length > 0) {
      player.y = player.y + 30
    }
    if (keyDown("RIGHT_ARROW")) {
      player.x = player.x + 30
    }
    if (keyDown("LEFT_ARROW")) {
      player.x = player.x - 30
    }
  if(keyWentDown("SPACE")){
   bullet=createSprite(displayWidth-1150,player.y-30,20,10);
   bullet.velocityX=20;
   bulletGroup.add(bullet);
   player.depth = bullet.depth;
   player.depth = player.depth + 2;
   player.addImage(shooterImg);
  bullets = bullets-1;
  explosionSound.play();
  } else if(keyWentUp("SPACE")){
   player.addImage(shootingImg)
  }
  if(bullets == 0){
    gameState = "bullet";
    lose.play()
  }
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i = 0; i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
        explosionSound.play();
        score = score + 2;
      }
    }
  }
  if(zombieGroup.isTouching(player)){
    lose.play();
    for(var i = 0; i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy();
        life = life - 1;
      }
    }
  }
  enemy();
  }
  
  // calling the function to spawn zombies
  drawSprites();
  textSize(20)
 fill ("white");
 text("Bullets =" + bullets,displayWidth - 210, displayHeight/2-250)
 text("score =" + score,displayWidth - 200, displayHeight/2-220)
 text("lives =" + life,displayWidth - 200, displayHeight/2-280)
if(gameState == "lost"){
  textSize(100);
  fill("red");
  text("You Lost",400,400)
  player.destroy();
  zombieGroup.destroyEach();
}
else if(gameState == "won"){
  textSize(100);
  fill("yellow");
  text("You Won",400,400)
  player.destroy();
  zombieGroup.destroyEach();
}
else if(gameState == "bullet"){
  textSize(50);
  fill("yellow");
  text("You Ran Out Of Bullets",470,410);
  player.destroy();
  zombieGroup.destroyEach();
  bulletGroup.destroyEach();
}
}

// creating function to spawn zombies
function enemy() {
  if (frameCount % 90 === 0) {

    // giving random x and y positions for zombies to appear
    zombie = createSprite(random(1400,displayWidth+100), random(200, displayHeight-100), 40, 40);

    zombie.addImage("zombie", zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -3;
    zombie.debug = true;
    zombie.setCollider("rectangle", 0, 0, 400, 400);

    zombie.lifetime = 400;
    zombieGroup.add(zombie);


  }
}


function bullets(){

if(keyDown("SPACE")){
  
}
}