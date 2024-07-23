
var path,pathImg;
var player1,player2,player3;
var mainPlayerImg,mainCyclist;
var ObstacleImg,Obstacle,ObstacleImg2,ObstacleImg3,ObstacleImg4,ObstacleImg5,ObstacleImg6;
var gameState= "Start"
var GameOver, GameOverImg;
var bellSound;

function preload()
{
 pathImg = loadImage("Road.png")
 mainPlayerImg = loadAnimation("mainPlayer1.png","mainPlayer2.png")
 mainPlayerImg2 = loadAnimation("mainPlayer3.png")

 ObstacleImg= loadImage("obstacle1.png")
 ObstacleImg2= loadImage("obstacle2.png")
 ObstacleImg3= loadImage("obstacle3.png")
 ObstacleImg4= loadAnimation("opponent1.png","opponent2.png")
 ObstacleImg5= loadAnimation("opponent5.png","opponent4.png")
 ObstacleImg6= loadAnimation("opponent7.png","opponent8.png")
 GameOverImg= loadImage( "gameOver.png");
 bellSound = loadSound("bell.mp3")
 

}

function setup()
{
  createCanvas(1200,300)

  path = createSprite(100,150)
  path.addImage(pathImg)
  path.velocityX = -5
  
  GameOver = createSprite(550,100)
  GameOver.addImage(GameOverImg)
  GameOver.visible = false;
  GameOver.debug = true

  mainCyclist = createSprite(70,150)
  mainCyclist.addAnimation("Running",mainPlayerImg)
  mainCyclist.scale = 0.08
  
  pinkGroup=new Group()
  yellowGroup = new Group()
  redGroup = new Group()


    
  mainCyclist.debug= false
  mainCyclist.setCollider("rectangle",0,0,40,40)
}

function draw()
{
  background("white")

  if(path.x<0)
  {
    path.x = path.width/2
  }

  if(gameState == "Start")
  {
    mainCyclist.y = World.mouseY
    
    var randomno = Math.round(random(1,3))
    if(frameCount%150 == 0){
      if(randomno==1){
        pinkCyclist()
      }
    else if(randomno==2){
      yellowCyclist()
    }
    else{
      redCyclist()
    }

    if(keyDown("space"))
    {
      console.log("spacebar")
      playSound(bellSound,false)
    }
  }

  if(mainCyclist.isTouching(pinkGroup) || mainCyclist.isTouching(yellowGroup) || mainCyclist.isTouching(redGroup))
  {
      mainCyclist.addAnimation("Running",mainPlayerImg2)
      
      
      gameState = "over"
  }
 
  }


  else if(gameState =="over"){
   
    GameOver.visible = true
    background("white")
    textSize(20);
    fill("red");
    text("Press Up Arrow to Restart the game!", 500,250);

    mainCyclist.velocityX =0 
    pinkGroup.destroyEach()
    redGroup.destroyEach(100)
    yellowGroup.destroyEach(100)
    path.velocityX = 0

    if(keyDown("UP_ARROW")) {
      reset();
    }

    
   


  }

drawSprites()

}

function pinkCyclist(){
  cyclist1 = createSprite(1100,Math.round(random(50,250)))
  cyclist1.addAnimation("obstacle1",ObstacleImg4)
  cyclist1.scale = 0.08
  cyclist1.velocityX = -6
  pinkGroup.add(cyclist1)
}

function yellowCyclist(){
  cyclist2 = createSprite(1100,Math.round(random(50,250)))
  cyclist2.addAnimation("obstacle2",ObstacleImg5)
  cyclist2.scale = 0.08
  cyclist2.velocityX = - 6
  yellowGroup.add(cyclist2)
}

function redCyclist(){
  cyclist3= createSprite(1100,Math.round(random(50,250)))
  cyclist3.addAnimation("obstacle3",ObstacleImg6)
  cyclist3.scale = 0.08
  cyclist3.velocityX = -6
  redGroup.add(cyclist3)
}

function reset(){
  gameState = "Start";
  GameOver.visible = false;
  mainCyclist.addAnimation("Running",mainPlayerImg)
  
  pinkGroup.destroyEach();
  yellowGroup.destroyEach();
  redGroup.destroyEach();
  
  path.velocityX = -5;
  
}