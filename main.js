img="";
status="";
objects=[];
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML="status: Detecting Objects";
}

function modelLoaded () {
    console.log("ModelLoaded!")
    status=true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error,results) {
    if(error) {
        console.log(error);
    }
    console.log(results);

    object = results;
}


function preload() {
img=loadImage('dog_cat.jpg');
}

function draw() {
    image (video,0,0,380,380);
if (status != "" )
{
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResults);
    for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHtml = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHtml = "Number of objects detected are " + objects.length;
        fill(r,g,b);
        percent = floor(objects[i].confidence*100);
    text(objects[i].label + ""+ percent + "%", objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height);

    }
}

}