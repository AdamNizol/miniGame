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
  }
  loadGame(nodeArray, connectionPairs){
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

}
