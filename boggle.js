class Boggle {
  constructor(kata){
    this.huruf = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    this.tampung = []
    this.kata = []
    this.papan = []
    this.koordinat = []
  }

  board() {
  let count = 0;
  let temp = []
  for (var i = 0; i < 4; i++) {
    temp.push([])
  }
    for (var j = 0; j < 16; j++) {
      temp[count].push(this.huruf.charAt(Math.floor(Math.random() * this.huruf.length)))
      if (count < 3) {
        count++;
      } else {
        count = 0
      }
    }
  this.papan = temp
  return this.papan
  }

  cekArea(row,col,value){
    for (var i = 0; i < 8; i++) {
      //atas
      if(i==0 && row -1 > -1 && this.papan[col][row-1]==value){
        return this.koordinat.push([row-1,col])
      }
      //kanan atas
      if(i==1 && row-1>-1 && col+1<this.papan.length && this.papan[row-1][col+1]==value){
        return this.koordinat.push([row-1,col+1])
      }
      //kanan
      if(i==2 && col+1<this.papan.length && this.papan[row][col+1]==value){
        return this.koordinat.push([row,col+1])
      }
      //kanan bawah
      if(i==3 && col+1 < this.papan.length && row+1 < this.papan.length && this.papan[row+1][col+1]==value){
        return this.koordinat.push([row+1,col+1])
      }
      //bawah
      if(i==4 && row+1 < this.papan.length && [row+1][col]==value){
        return this.koordinat.push([row+1,col])
      }
      //kiri bawah
      if(i==5 && row+1 < this.papan.length && col -1 > -1 && this.papan[row+1][col-1]==value){
        return this.koordinat.push([row+1,col-1])
      }
      //kiri
      if(i==6 && col-1 < -1 && this.papan[row][col-1]==value){
        return this.koordinat.push(row,col-1)
      }
      //kiri atas
      if(i==7 && row-1 < -1 && col - 1 < -1 && this.papan[row-1][col-1]==value){
        return this.koordinat.push(row-1,col-1)
      }
    }
  }

  cekValue(row,col){
    for (var i = 0; i < this.koordinat.length; i++) {
      if (this.koordinat[i][1]==row && this.koordinat[i][0]==col ){
        return false;
      }
    }
    return true;
  }




}
var fs = require('fs');
const data = require('./data')
var test = new Boggle(data)
console.log(test.board());
console.log(test.cekArea(1,2,'H'));
