img = "";
status = "";
object = [];

function preload(){
    img = loadImage("fan.jpeg");
    
    if(status != ""){
        for(i = 0; i<object.length;i++){
            document.getElementById("status").innerHTML = "Status : object detected";
            fill("blue");
            percent = floor(object[i].confidence * 100);
            noFill();
            stroke("blue");
            text(object[i].label + " " + percent + " % " , object[i].x + 15 , object[i].y + 15);
            rect(object[i].x , object[i].y , object[i].width , object[i].height);
            
        }
    }
}

function draw(){
    image(img,0,0,600,420);
}

function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status: detectiong object";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;

    objectDetector.detect(img , gotResults);
}


function gotResults(error , results){
    if(error){
        console.error(error);
    }

    else{
        console.log(results);
        object = results;
    }
}