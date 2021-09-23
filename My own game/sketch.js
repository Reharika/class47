var rulesimg
var room1_img
var playerimg
var play
var gameState= "rules"
var level1_start=1
var score=0
var life= 3
function preload(){
   rulesimg=loadImage("rulesimg.jpg");
    room1_img=loadImage("room1img.jpg")
    playerimg_running=loadAnimation("walk1.png","walk2.png","walk3.png","walk4.png","walk5.png")
    playerimg_mirror=loadAnimation("walk1_mirror.png","walk2_mirror.png","walk3_mirror.png","walk4_mirror.png","walk5_mirror.png")
    player_standing=loadAnimation("walk3.png")
    coin_img=loadImage("coin_img.png");
    bomb_img=loadAnimation("b1.png")
   bomb_explotion=loadAnimation("b1.png","b2.png","b3.png","b4.png");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  play = createButton("PLAY")
  play.position(width/2,height-200);
  play.mousePressed(() => {
    gameState="level1"
    play.hide()
  });

  player= createSprite(400,200);
  player.addAnimation("standing",player_standing);
  player.addAnimation("running",playerimg_running);
  player.addAnimation("leftrun",playerimg_mirror);
  player.visible= false
  player.scale =0.09;
 player.debug=true;
  coinGroup=new Group()
  bombGroup=new Group()
  

  
}

function draw() {
  background(255,255,255);
  if(gameState==="rules"){
    image(rulesimg,0,0,width,height);
  }
  if(gameState==="level1"){
    if(level1_start){
      spawnCoins()
      spawnBomb();
      level1_start =0

    }
    image(room1_img,0,0,width,height);
    player.visible= true

    for(i=0;i<coinGroup.length;i++){
      temp = coinGroup.get(i)
       if(player.isTouching(temp)){
         score = score +1
         temp.destroy();
       }
       
    }
    for(i=0;i<bombGroup.length;i++){
      tempbomb = bombGroup.get(i)
       if(player.isTouching(tempbomb)){
        player.x = width/2
         console.log("touch")
         life=life-1
         tempbomb.addAnimation("explotion",bomb_explotion);
         tempbomb.changeAnimation("explotion",bomb_explotion);
         setTimeout(() => {tempbomb.destroy()}, 2000);
       

       }
       
    }
    
    
  if(keyIsDown(UP_ARROW)){
    player.y-=4
  }
  if(keyIsDown(LEFT_ARROW)){
    player.x-=4
    player.changeAnimation("leftrun",playerimg_mirror);
  }
  if(keyIsDown(RIGHT_ARROW)){
    player.changeAnimation("running",playerimg_running);
    player.x+=4
  }
  if(keyIsDown(DOWN_ARROW)){
    player.y+=4
  }
  }
 
    drawSprites();
}
function spawnCoins(){
  for(var i = 0;i<5;i++){
    x=random(20,width-50)
    y=random(20,height-50);
    coin=createSprite(x,y);
    coin.addImage(coin_img)
    coin.scale=0.05
    coinGroup.add(coin);
  }

}
function spawnBomb(){
  for(var i = 0;i<5;i++){
    x=random(20,width-50)
    y=random(20,height-50);
    bomb=createSprite(x,y);
    bomb.debug = true
    bomb.addAnimation("still",bomb_img)
    bomb.scale=0.5
    bombGroup.add(bomb);
  }
}
function mydestroy(temp){
  console.log("hello")
  temp.destroy()
}