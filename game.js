let displayTimeout = false;
let game = new miniGame();
document.addEventListener('contextmenu', event => event.preventDefault());

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  window.addEventListener('resize', function(){ resizeCanvas(window.innerWidth,window.innerHeight)} );
  noLoop();
  let nodes = [5, 2, -3, 3, -1, 4, -3, 4, -6];
  let connections = [
    [0,1],
    [1,2],
    [2,0],
    [5,0],
    [4,3],
    [8,2],
    [7,3],
    [6,8],
    [1,5],
    [2,4],
    [5,8],
    [0,4],
    [3,6]
  ]
  game.loadGame(nodes, connections);
}
function draw() {
  push();
  background(79, 85, 98);
  translate(width/2, height/2);
  scale(1);

  game.draw();
  pop();
}

function mousePressed() {
  let cc = {
    x: mouseX-width/2,
    y: mouseY-height/2
  }
  console.log("click");
  game.clicked(cc, mouseButton);
}

function updateScreen(){
  if(!displayTimeout){
    draw();
    displayTimeout = true;
    setTimeout(function(){
      displayTimeout = false;
      updateScreen();
    }, 10);
  }
}
