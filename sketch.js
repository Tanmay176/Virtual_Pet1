//Create variables here
var dog,happydog,food,foodStock;
var database;

function preload()
{
	//load images here
  dogImg=loadImage("images/Dog.png")
  dog2Img=loadImage("images/happydog.png")
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(250,300)
  dog.addImage(dogImg)
  dog.scale=0.2

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(dog2Img);
  }

  drawSprites();
  //add styles here
  strokeWeight(2)
  stroke("black");
  fill("red")
  textSize(30)
  textFont("Agency FB")
  text("Food Remaining:" + food, 170,50);
  text("Note:Click Up_Arrow to feed the dog",100,480)
}

function readStock(data){
  food=data.val();
}

function writeStock (x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food : x 
  })
}



