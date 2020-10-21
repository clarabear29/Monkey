var PLAY=1;
var END=0;
var WIN=2;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground, invisibleGround, groundImage;
var background, backgroundImage;
var score, st;
var monkey_collided;
var song, songEnd;
var gameend, GameOver, gameWin, winner;
var jumpSound, bananaSound, gameWinSound;

function preload(){
  
  
  monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided=loadAnimation("sprite_0.png");
  
  groundImage=loadImage("ground2.png");
  backgroundImage=loadImage("jungle.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  gameend=loadImage("GameOver.png");
  winner=loadImage("youWin.png");
  
  song=loadSound("Music-01.mp3");
  songEnd=loadSound("GameOver.mp3");
  gameWinSound=loadSound("Victory.mp3");
  jumpSound=loadSound("Jump1.mp3");
  bananaSound=loadSound("Banana1.mp3");
 
}



function setup() {
  createCanvas(400,400);
  background=createSprite(200,200,400,400);
  background.addImage("background", backgroundImage);
  background.x=background.width/2;
  background.scale = 1.8;
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale=0.1;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  //monkey.debug = true;
  
  GameOver=createSprite(225,200,1,1);
  GameOver.addImage(gameend);
  GameOver.scale=0.7;
  GameOver.visible = false;
  
  gameWin=createSprite(200,200,1,1);
  gameWin.addImage(winner);
  gameWin.scale=0.6;
  gameWin.visible = false;
  
  ground=createSprite(400,355,400,20);
  ground.addImage("ground", groundImage);
  ground.x=ground.width/2;
  
 
  invisibleGround=createSprite(200,375,400,20);
  invisibleGround.visible=false;
  
  FoodGroup= createGroup();
  obstaclesGroup= createGroup();
  
  score=0;
  st=0;
  song.loop();
}


function draw() {
 
  monkey.collide(invisibleGround);
  monkey.depth=ground.depth;
  monkey.depth=monkey.depth+1;

  
 
  if(gameState === PLAY){
    st =Math.ceil(frameCount/frameRate());
    ground.velocityX=-(4+3*score/100);
    background.velocityX=ground.velocityX;
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    if(background.x<0){
      background.x=background.width/2;
      
                 
      
    }
  
     if(keyDown("space")&& monkey.y >= 150) {
       jumpSound.play(); 
       monkey.velocityY = -12;
     }
    
     monkey.velocityY = monkey.velocityY + 0.8
    

  

  
//spawns bananas
  B();
//spawns obsticles
  O();
    
   
    if(monkey.isTouching(FoodGroup)){
        bananaSound.play();
        banana.lifetime=0;
        score=score+1;       
     }
    
  if(monkey.isTouching(obstaclesGroup)){
      song.stop();
      songEnd.play();
      gameState=END;
  }
    if(score>29){
      song.stop();
      gameWinSound.play();
      gameState=WIN;
    }
    
  }
  
  if (gameState===WIN){
           monkey.changeAnimation("collided",monkey_collided);
    ground.velocityX=0;
    background.velocityX=0;
    monkey.velocityY = monkey.velocityY + 0.8
    gameWin.visible = true;
    
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    banana.lifetime=-1;
    if(mousePressedOver(gameWin)) {
      restart();

    banana.lifetime=-1;

  }
  } 
  else if(gameState===END){
    monkey.changeAnimation("collided",monkey_collided);
    ground.velocityX=0;
    background.velocityX=0;
    monkey.velocityY=0;

    GameOver.visible = true;
    
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    if(mousePressedOver(GameOver)) {
      restart();
  }
  }
  drawSprites();
  stroke("black");
  textSize(20);
  fill("black")
  text("Score: "+ score, 300,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: "+ st,100,50); 
}

function B(){
  if(World.frameCount%80===0){
   ty=Math.round(random(150,250))
    banana=createSprite(400,400,20,20);
    banana.y=ty;
    banana.setCollider("rectangle",0,0,banana.width, banana.height);//300,300);
   // banana.debug = true;
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifetime=300;
    FoodGroup.add(banana);
  }
}

function O(){
  if(World.frameCount% 250===0){
    obstacle=createSprite(400,325,20,20);
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-4;
    obstacle.lifetime=300;
    obstaclesGroup.add(obstacle);
    obstacle.setCollider("circle", -15, 0, 175);
  //  obstacle.debug = true;
    }
  }

 function restart(){
 gameState = PLAY;
 GameOver.visible = false;
 gameWin.visible = false;
  
 obstaclesGroup.destroyEach();
 FoodGroup.destroyEach();

 st = 0;
 score = 0;
 frameCount = 0;
   
 monkey.changeAnimation("moving", monkey_running);
 song.loop();
 }

