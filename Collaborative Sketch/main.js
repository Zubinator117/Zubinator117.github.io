  var config = {
    apiKey: "AIzaSyBxkPLOVlls-x55ZlMrNentYGGnwqkTLo8",
    authDomain: "collaborative-sketch-b57f3.firebaseapp.com",
    databaseURL: "https://collaborative-sketch-b57f3.firebaseio.com",
    storageBucket: "collaborative-sketch-b57f3.appspot.com",
    messagingSenderId: "587511570810"
  };
firebase.initializeApp(config);

var pointsData = firebase.database().ref();

var points = [];

function setup() 
{
  var canvas = createCanvas(400, 400);
  background(255);
  fill(0);
  pointsData.on("child_added", function (point) {
    points.push(point.val());
  });
    pointsData.on("child_removed", function () {
    points = [];
  });
  
  canvas.mousePressed(drawPoint);
  canvas.mouseMoved(drawPointIfMousePressed);
}

function draw() 
{
    for (var i = 0; i < points.length; i++)
    {
        var point = points[i];
        ellipse(point.x, point.y, 5, 5);
    }
}

function drawPoint()
{
    pointsData.push({x: mouseX, y: mouseY});
}

function drawPointIfMousePressed() {
  if (mouseIsPressed) {
    drawPoint();
  }
}

$("#saveDrawing").on("click", saveDrawing);

function saveDrawing() {
}

$("#clearDrawing").on("click", clearDrawing);

function clearDrawing() {
}

function saveDrawing()
{
    saveCanvas();
}

function clearDrawing() {
  pointsData.remove();
  points = [];
}