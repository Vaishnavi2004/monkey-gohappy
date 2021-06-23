var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(1200, 650);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(1200,350,200,10);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  console.log(ground.x)
  
  score = 0;
}


function draw() {
background("blue");
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,40);
  
  stroke("black")
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 50,30);
  

  
  if (gameState===PLAY){
   score = score + Math.round(getFrameRate()/60);
    if(score >= 0){
      ground.velocityX = -6;
    }else{
      ground.velocityX = -(6 + 3*score/100);
    }
  
    if(keyDown("space") && monkey.y >= 139) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(ground);
    
    spawnBanana();
    spawnObstacles();
  
   
    }
  
  else if (gameState === END ) {
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    if(obstacles.isTouching(monkey)){
        gameState = END;
    } 
  }
}

function spawnBanana() {
  
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     
    banana.lifetime = 200;
    
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacles = createSprite(600,165,10,40);    
    obstacles.addImage(obstacleImage);
             
    
        
    obstacle.velocityX = -(6 + 3*score/100);
    
              
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
    
  }
}


