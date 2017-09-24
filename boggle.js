class boggle {
  constructor(){
    this.papan=[];
    this.data=["ABA","ABAD"]

  }

  shake(col, row){
    let abjad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for(let i=0; i<col; i++){
      this.papan.push([])
      for (let j=0; j<row; j++) {
        let huruf= abjad[Math.floor(Math.random() * abjad.length)]
        this.papan[i].push(huruf)
      }
    }
    return this.papan
  }

  cekHuruf(str){
    for (var i = 0; i < this.papan.length; i++) {
      for (var j = 0; j < this.papan[i].length; j++) {
        if (this.papan[i][j]===str) {
          return true
        }
      }
    }
    return false
  }

  cekKata(kata){
    for (var i = 0; i < kata.length; i++) {
      if (this.cekHuruf(kata[i])===true) {
        return true
      }
    }
    return false
  }
}

//const boggle() = require('./data.js');
//console.log(boggle().data[0])
let game = new boggle()

console.log(game.shake(4, 4));
console.log(game.cekHuruf('DASE'));
