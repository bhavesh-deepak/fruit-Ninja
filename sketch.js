var sword,swordImg,monster,monsterImg,swordGroup,knifeSound,gameOverSound;
//GameStates
var PLAY = 1;
var END = 0;
var gameState = 1;
var fruitGroup,enemyGroup,score,gameOver,gameOverImg;
var fruit1,fruit2,fruit3,fruit4,position;

function preload(){
  monsterImg = loadAnimation("alien1.png","alien2.png");
  swordImg = loadImage("sword.png");
  gameOverImg = loadImage("gameover.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  knifeSound =  loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
  
}
  
function setup(){
  createCanvas(600,500);
  score = 0;
  sword = createSprite(400,400,30,30);
  sword.addImage("sword",swordImg)
  sword.scale = 0.8;
  fruitsGroup =  createGroup();
  enemyGroup = createGroup();
  sword .setCollider("rectangle",0,0,40,40)
 gameOver = createSprite(250,250,50,50);  
  gameOver.scale = 2;
  gameOver.addImage(gameOverImg); 
  gameOver.visible = false;
}

function draw(){
  background("white");
  
  //displasing score
  text("Score:"+ score,500,50);
   
  if(gameState === PLAY){
    //move sword with mouse
    sword.y = World.mouseY;
    sword.x = World.mouseX;
     if(fruitsGroup.isTouching(sword)){
      fruitsGroup.destroyEach();
     score = score + 2;
    knifeSound.play()  
       
    } 
    
     fruits();
  Enemy();
  } 
  if(enemyGroup.isTouching(sword)){
    enemyGroup.destroyEach();
    fruitsGroup.destroyEach();
    fruitsGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    gameOver.addImage(gameOverImg); 
     gameOver.visible = true;
    gameOverSound.play()
    gameState = END;
    sword.x = 200;
    sword.y = 200;
    sword.visible = false;
    
  }
  
 drawSprites();
}
  //creating user defind function
  function fruits (){
   if(World.frameCount%80===0) {
     fruit=createSprite(600,200,20,20);
     fruit.scale = 0.2;
     //fruit. debug = true;
     r = Math.round(random(1,4))
     if (r == 1){
       fruit.addImage("fruits",fruit1);
     } else if (r == 2){
       fruit.addImage("fruits",fruit2);
     } else if (r == 3){
       fruit.addImage("fruits",fruit3);
     } else if (r == 4){
       fruit.addImage ("fruits",fruit4);
     }
    position = Math.round(random(1,2));
     if(position==1) { 
      fruit.x=400; 
       fruit.velocityX=-(7+(score/4));

     } 
     else { if(position==2){ 
       fruit.x=0; fruit.velocityX= (7+(score/4)); 
     }
    }
     
    
     fruit.setLifetime = 200;
     fruitsGroup.add(fruit);
    /* position = Math.round(random(1,2));
     if(position  == 1){
       fruit.x = 600;
       fruit.velocityX = -(7+(score/4))
     }
     else if (position == 2){
       fruit.x = 0;
     }*/
   }
  }
    function Enemy() {
    if (World.frameCount%200 === 0){
      monster = createSprite(600,200,20,20);
      monster.addAnimation("moving",monsterImg);
      monster.y = Math.round(random(100,300));
      monster.velocityX = -(8+2* score/10);
      monster.setLifetime = 200;
    //  swordGroup.add(sword);
    enemyGroup.add(monster);
    }
    }



