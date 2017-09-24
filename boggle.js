"use strict"

const Data = require('./data.js');

class boggle {
  constructor() {
    this._abjad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this._huruf  = '';
    this._random = 0;
  }

  shake() {
    this._random = Math.floor(Math.random()*26);
  }

  board(baris,kolom){
    let newbaris = [];
    for (let i = 0; i < baris; i++){
      let newkolom = [];
      for (let j = 0; j < kolom; j++){
        this.shake();
        this._huruf = this._abjad.charAt(this._random);
        newkolom.push(this._huruf);
      }
      newbaris.push(newkolom);
    }
    return newbaris;
  }

  kamus(){
    const words = Data;
    return words;
  }

}


let gametes = new boggle();
console.log(gametes.board(4,4));
console.log(gametes.kamus());
