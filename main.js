objects = [];
song = "";

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects"; 
}

img = "";
status = "";

function modelloaded(){
    console.log("modelloaded");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function preload(){
  song = loadSound("song.mp3");
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("object").innerHTML = "number of objects detected are : "+ objects.length;
    fill(r, g, b);
    percent = floor(objects[i].confidence * 100);

    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke(r, g, b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

    if(objects[i].label == "person"){
      document.getElementById("object").innerHTML = "Baby found";
      song.stop();
    }
    else{
      document.getElementById("object").innerHTML = "Baby not found";
      song.play();
    }
        }
        if(objects.length == 0){
          document.getElementById("object").innerHTML = "Baby not found";
          song.play();
        }
    }
}

function start(){

}