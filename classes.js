class node{
  constructor(value =  0){
    this.val = value;
    this.connections = [];
  }
  setVal(value){
    this.val = value;
  }
  getVal(){
    return this.val;
  }
  addConnection(destination){
    this.connections.push(destination);
  }
  resetConnections(){
    this.connections = [];
  }
  getConnections(){
    return this.connections;
  }
}
class miniGame{
  constructor(){
    this.nodes = [];
    this.connections = [];
    this.difficulty = 1;
  }
  loadGame(nodeArray, connectionPairs){
    document.getElementById("victoryScreen").style.display = "none";
    this.nodes = [];
    this.connections = [];

    this.connections = connectionPairs;
    for(let i=0; i<nodeArray.length; i++){
      let temp = new node(nodeArray[i]);
      this.nodes.push(temp);
    }
    for(let i=0; i<connectionPairs.length;i++){
      this.nodes[connectionPairs[i][0]].addConnection(connectionPairs[i][1]);
      this.nodes[connectionPairs[i][1]].addConnection(connectionPairs[i][0]);
    }
  }
  give(index, amount = 1){
    let cons = this.nodes[index].getConnections();
    for(let i=0; i<cons.length;i++){
      this.nodes[cons[i]].setVal(this.nodes[cons[i]].getVal() + amount);
    }
    this.nodes[index].setVal(this.nodes[index].getVal() - cons.length*amount);
    draw();
    if(this.hasWon()){
      document.getElementById("victoryScreen").style.display = "block";
    }
  }
  take(index){
    this.give(index, -1);
  }

  clicked(pos,btn){
    //console.log("click");
    //console.log(pos);
    for(let i=0; i< this.nodes.length; i++){
      let a = pos.x-this.getPos(i).x;
      let b = pos.y-this.getPos(i).y;
      //console.log(pos.x.toString()+", "+pos.y.toString()+" | "+this.getPos(i).x.toString()+", "+this.getPos(i).y.toString())
      if(Math.sqrt(a*a + b*b) <= 25){
        //console.log("ouch");
        if(btn === LEFT){
          this.give(i);
        }else{
          this.take(i);
        }


        break;
      }
    }
  }
  getPos(index){
      let angle = index*2*PI/this.nodes.length;
      let result = {
        x: -250*Math.sin(angle),
        y: -250*Math.cos(angle)
      }
      return result;
    }
  draw(){
    push();
    for(let i=0;i<this.connections.length;i++){
      let p1 = this.getPos(this.connections[i][0]);
      let p2 = this.getPos(this.connections[i][1]);
      stroke(color(28, 21, 27));
      strokeWeight(5);
      line(p1.x, p1.y, p2.x, p2.y);
    }
    pop();

    push();
    for(let i=0;i<this.nodes.length;i++){
      stroke(color(28, 21, 27));
      strokeWeight(3);
      fill(color(40, 42, 50));
      let pos = this.getPos(i);
      ellipse(pos.x, pos.y, 60, 60);

      strokeWeight(1);
      stroke(color(0,0,0));
      fill(color(250,250,250));
      textSize(26);
      textAlign(CENTER, CENTER);
      text(this.nodes[i].getVal().toString(), pos.x, pos.y);
    }
    pop();
  }

  newGame(difficulty = this.difficulty){ //0-easy, 1-medium, 2-hard
    this.difficulty = difficulty;
    let nodes = [];
    let connections = [];
    let nodeNum = Math.ceil(Math.random()*4) + 3 + 3*difficulty;
    for(let i=0;i<nodeNum;i++){ nodes.push(0); }
    let connectionNum = Math.ceil(Math.ceil(Math.random()*nodeNum) + (nodeNum/2)*difficulty);
    if(connectionNum+nodeNum > (nodeNum*(nodeNum-1))/2){
      connectionNum = 0;
    }
    let spares = connectionNum;
    for(let i=0; i<nodeNum*5; i++){ //setups random values without changing sum
      nodes[Math.floor(Math.random()*nodeNum)]++;
      nodes[Math.floor(Math.random()*nodeNum)]--;
    }
    console.log("c: " + connectionNum.toString())
    console.log(nodeNum)
    console.log(spares)
    for(let i=0; i<spares; i++){ //adds spare values at random
      nodes[Math.floor(Math.random()*nodeNum)]++;
    }

    //makes a connected graph without any spare connections
    let connected = [(Math.floor(Math.random()*nodeNum))];
    for(let i=Math.floor(Math.random()*nodeNum); connected.length<nodeNum;i=Math.floor(Math.random()*nodeNum)){
      for(let j = 0; j< connected.length; j++){
        if(connected[j]==i){
          i=Math.floor(Math.random()*nodeNum);
          j = -1;
        }
      }
      connections.push([i,connected[Math.floor(Math.random()*connected.length)]])
      connected.push(i);
    }

    //adds spare connections
    for(let i=0;i<connectionNum; i++){
      let conn = [Math.floor(Math.random()*nodeNum),Math.floor(Math.random()*nodeNum)];
      for(let j = 0; j<connections.length; j++){
        if((conn[0] == connections[j][0] && conn[1] == connections[j][1]) || (conn[1] == connections[j][0] && conn[0] == connections[j][1]) || conn[0] == conn[1]){
          conn = [Math.floor(Math.random()*nodeNum),Math.floor(Math.random()*nodeNum)];
          j = -1;
        }
      }
      connections.push(conn);
    }

    this.loadGame(nodes, connections);
    draw();
  }

  hasWon(){
    for(let i=0; i<this.nodes.length; i++){
      if(this.nodes[i].getVal() < 0){
        return false;
      }
    }
    return true;
  }
}
