var dog,dogImg,dog2,dog3;
var database,value;
var foods;
var feed;
var milk;

function preload(){
dogImg = loadImage("Dog.png");
dog2 = loadImage("happydog.png");
dog3 = loadImage("cry.png");
milk = loadImage("milk.png");
}
	

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1000,500);

  feed = createButton('feed dog');
  feed.position(750,90);

  for(var i=50;i<500;i++){
    foods = createSprite(i,250,10,10);
  }
  milk.scale=0.0001;

  foods.addImage(milk);

  dog=createSprite(750,250,20,20);
  dog.scale = 0.2;
  dog.addImage(dogImg);

  var Food = database.ref('food/value');
   Food.on("value",readStock);
}


function draw() {  
background(46,139,87);

fill("white");
text("remaining Stock : "+foods,750,150);


if(feed.mousePressed()){
  dog.addImage(dog2);
  dog.scale = 0.2;
  
}

if(frameCount%5000===0 && foods>0){
  fill("black");
  dog.scale=0.5;
  text("bow!! bow!! ..",100,100);
  dog.addImage(dog3);
}

  drawSprites();
  
}


//Function to read values from DB
 function readStock(data){
    food=data.val();
   }
    //Function to write values in DB
 function writeStock(x){
    if(x<=0){ 
      x=0;
     }
     else{
        x=x-1;
       } 
       database.ref('/').update({
          food:x 
        }) }