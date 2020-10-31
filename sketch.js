var backImage,backgr;
var girl, girl_falling;
var ground,ground_img;

var witchGroup, witchImage;
var pumpkinGroup, pumpkin_img;
var coinGroup, coin_img;
var gameOver,gameOverImage;
var restart,restartImage;
var dracula_img,dracula_running,dracula_catching;
var dracula;
var score=0;


function preload(){
  backImage=loadImage("ground.jpg");
  girl = loadImage("girl2.png");
  girl_falling=loadImage("girl fall.jpg")
  

  witchImage = loadImage("witch.png");
  pumpkin_img = loadImage("pumpkin.png"); 
  coin_img= loadImage("coin.jpg");
   dracula_img=loadImage("dracula.jpg");
    gameOverImage=loadImage("gameover.jpg");
restartImage=loadImage("restart.jpg");
dracula_catching=loadImage("gracula 2.jpg");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  girl = createSprite(100,340,20,50);
  girl.addAnimation("walking",girl_walking);
 girl.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;

 dracula=createSprite(50,410,600,10);
  dracula.addAnimation("dracula_running",dracula_img);
  dracula.addAnimation("dracula_attack",dracula_catching);
  dracula.scale=0.2;
 dracula.debug=false;
 
  
  invisible_ground=createSprite(300,470,600,10);
  invisible_ground.visible=false;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,180);
  restart.addImage(restartImage);
  
  coinGroup = new Group();
    pumpkinGroup = new Group();
    witchGroup = new Group();
  
  

}

function draw() {
  
  background("black");
  
  // console.log(girl.y);
    //Gravity
 girl.velocityY = girl.velocityY + 0.8;
 girl.collide(invisible_ground); 
   
    //Gravity
 dracula.velocityY = dracula.velocityY + 0.8;
 dracula.collide(invisible_ground); 
   
   
    if (gameState===PLAY){
     gameOver.visible=false;
   restart.visible=false;
    score = score + Math.round(getFrameRate()/60);
  
     
    if (pumpkinGroup.isTouching(dracula)){
      dracula.velocityY=-12;
    }
  ground.velocityX = -(4 + 3* score/100);
      
    if (ground.x < 0){
       ground.x = ground.width/2;
     }
  
     
  if((keyDown("space")&& girl.y >= 220)) {
    girl.velocityY = -12;
     
   }  
   
   if (girl.isTouching(obstaclesGroup)){
     gameState=END;
      
   }
  }
 else if ( gameState===END) {
   gameOver.visible=true;
   restart.visible=true;
   ground.velocityX = 0;
      girl.velocityY = 0
     girl.changeImage("girlfall",girlImage);
  dracula.changeAnimation("dracula_attack",dracula_catching);
      zombie.x=girl.x;
   if (zombie.isTouching(girl)) {
     girl.changeImage("girl_falling",girl_falling);
    dracula.changeImage("dracula_catching",dracula_catching);
   }
       
   //set lifetime of the game objects so that they are never destroyed
     pumpkinGroup.setLifetimeEach(-1);
    pumpkinGroup.setVelocityXEach(0);
   
     if(mousePressedOver(restart)) {
       reset();
     }
    }
    
   drawSprites();
   fill("lightpink");
   textSize(20);
    text("Score: "+ score, 500,50);
 }
 
 function reset(){
   gameState=PLAY;
 gameOver.visible=false;
 restart.visible=false;
 girl.changeAnimation("girl_running",girl_running);
   pumpkinGroup.destroyEach();
   score=0;
  dracula.x=50;
 }
 
 
    

function spawnCoin() {
  
  if (frameCount % 80 === 0) {
    var coin = createSprite(600,250,40,10);
    coin.y = random(120,200);    
    coin.addImage(coin_img);
    coin.scale = 0.05;
    coin.velocityX = -5;
     //assign lifetime to the variable
    coin.lifetime = 300;
    girl.depth = coin.depth + 1;
    
   
   coinGroup.add(coin);
  }
}

function spawnPumpkin() {
  if(frameCount % 200 === 0) {
    var pumpkin= createSprite(800,350,10,40);
    pumpkin.velocityX = -6;
    pumpkin.addImage(pumpkin_img);
    
    //assign scale and lifetime to the obstacle     
    pumpkin.scale = 0.2;
    pumpkin.lifetime = 300;
    
  
    pumpkinGroup.add(pumpkin);
  }
}
function spawnWitch() {
  if(frameCount % 300 === 0) {
    var witch = createSprite(800,350,10,40);
    witch.velocityX = -6;
    witch.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    witch.scale = 0.2;
    witch.lifetime = 300;
    
   
    witchGroup.add(witch);
  }
}

  
