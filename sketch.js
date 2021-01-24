//gamestates
var play=1;
var end=0;
var gameState=1;
//sprites
var sword, fruit, enemy;
//images
var swordI, fruit1, fruit2, fruit3, fruit4, alien1, gameOverI;
//groups
var fruitGroup, enemyGroup;

var score;

var swordSound, gameOverSound;

function preload(){
  swordI=loadImage("sword.png");
  fruit1=loadImage("fruit1.png"); 
  fruit2=loadImage("fruit2.png"); 
  fruit3=loadImage("fruit3.png"); 
  fruit4=loadImage("fruit4.png"); 
  alien1=loadAnimation("alien1.png", "alien2.png");
  gameOverI=loadImage("gameover.png");
  swordSound=loadSound("mixkit-metal-hit-woosh-1485.wav");
  gameOverSound=loadSound("mixkit-arcade-retro-game-over-213.wav");
}

function setup(){
  createCanvas(600, 500);
  
  //create sword
  sword=createSprite(300, 350, 20, 20);
  sword.addImage(swordI);
  sword.scale=0.75;
  
  //score and groups
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
  //set collider
  sword.setCollider("rectangle", 0, 0, 40, 40);
  
}

function draw(){
background("lightBlue");
  
  //functions
  fruits();
  enemies();
  
  //move sword
  sword.x=mouseX;
  sword.y=mouseY;
   
  if (sword.isTouching(fruitGroup)){
  score=score+1;
  swordSound.play();
  fruitGroup.destroyEach();
  }
  
  if (sword.isTouching(enemyGroup)){
    gameState=end;
    gameOverSound.play();
  }
  if (gameState==end){  
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    sword.velocityX=0;
    sword.velocityy=0;
    sword.addImage(gameOverI);
    sword.x=300;
    sword.y=250;
    textSize(25);
    text("Press space to Start", 200, 60);
  }
  
  //reset game
  if (keyDown("space")){
    gameState=play;
    score=0; 
  }
  
  if (gameState==play){
    sword.addImage(swordI);
  }
  
  if (score==20){
    
  }
  drawSprites();
  //score
  text("Score : "+score, 250, 30);
}

function fruits(){
 if (frameCount % 60 === 0){
   var fruit = createSprite(600,Math.round(random(25, 340)),10,40);
   fruit.velocityX = -(7+score/5);
   
    r=Math.round(random(1, 2));
   if(r==1){
     fruit.x=600;
     fruit.velocityX=-(7+score/5);
   } else if(r==2){
     fruit.x=0;
     fruit.velocityX=7+score/5;
   }else if(r==3){
     fruit.x=Math.round(random(100, 500));
     fruit.y=0;
     fruit.velocityY=7+score/5;
   } else{
     fruit.x=Math.round(random(100, 500));
     fruit.y=600;
     fruit.velocityY=-(7+score/5);
   }
   
    //generate random obstacles
    r = Math.round(random(1,4));
    if(r==1) {
      fruit.addImage(fruit1);
    } else if(r==2){
      fruit.addImage(fruit2);
    } else if(r==3){ 
      fruit.addImage(fruit3);
    } else{ 
      fruit.addImage(fruit4);
    }
   
   fruit.scale = 0.2;
   fruit.lifetime = 100;
   fruitGroup.add(fruit);
 }
} 

function enemies(){
  if (frameCount % 50 === 0){
   var enemy = createSprite(600,Math.round(random(25, 340)),10,40);
   enemy.velocityX = -(10+score/5); 
   
      r=Math.round(random(1, 4));
   if(r==1){
     enemy.x=600;
     enemy.velocityX=-(10+score/5);
   } else if(r==2){
     enemy.x=0;
     enemy.velocityX=10+score/5;
   } else if(r==3){
     enemy.x=Math.round(random(100, 500));
     enemy.y=0;
     enemy.velocityY=10+score/5;
   } else{
     enemy.x=Math.round(random(100, 500));
     enemy.y=600;
     enemy.velocityY=-(10+score/5);
   }
    
  enemy.addAnimation("moving", alien1);
   enemy.lifetime = 80;
   enemyGroup.add(enemy);
} 
}