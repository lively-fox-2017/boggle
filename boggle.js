



const kamus = require('./data.js');
class GameBoggle {
    constructor(dictionary) {
        this.dictionary = dictionary,
        this.board = [],
        this.koordinat = [],
        this.result = [],
        this. abjad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    }
    printBoard() {
       
       
        let r = 0
        for (var i = 0; i < 4; i++) {
            this.board.push([])
        }
            for (var j = 0; j < 16; j++) {
                let index = Math.floor(Math.random() * this.abjad.length);
                this.board[r].push(this.abjad[index]);
                if(r < 3){
                    r++
                }else{
                    r=0;
                }
            }       
        return this.board
    }

    solve (){
         
        console.log(this.dictionary.length)
        for(var i = 0; i < this.dictionary.length;i++){
           
            let status = false;
            for(var j = 0; j < this.board.length;j++){
                for(var k =0; k < this.board[j].length;k++){
                  if(this.dictionary[i][0]===this.board[j][k]){
                      this.koordinat=[[j,k]];
                      //debugger
                      if(this.cekHurufPertama(this.dictionary[i])===true){
                          this.result.push(this.dictionary[i])
                          status = true;
                          break;
                      }
                  }
            }
            if(status==true){
                break;
            }
        }
    }
    if(this.result.length === 0){
        console.log('Booooooooooo!! ---NOT FOUND!!!---')
    }else{
    console.log(`Yeaay!!!! ${this.result.length} kata ditemukan:`)
    return this.result.join();
    }
}


    cekHurufPertama (kata){
        debugger
       //let boo = kata.split('')
        for(var i = 1; i < kata.length; i++){
             this.cekArea(this.koordinat[this.koordinat.length-1][0],this.koordinat[this.koordinat.length-1][1],kata[i])
        }
            if(this.koordinat.length === kata.length){
                return true;
            }else {
                return false;
            }
        
     }

    cekArea (col, row, value){
        let grid = this.board
        for(var i =0; i < 8; i++){
          
         //cek atas
         if(i == 0 && row-1 > -1){
            if(grid[col][row-1] == value&& this.cekHistori(col+1,row-1)==true){return this.koordinat.push([col,row-1])}
        }
         //cek kanan atas
         if(i==1 && col+1 < grid && row-1 > -1){
            if(grid[col+1][row-1] == value && this.cekHistori(col+1,row-1)==true){return this.koordinat.push([col+1,row-1])}             
        }
         //cek kanan
         if(i==2 && col+1 < grid){
            if(grid[col+1][row] == value && this.cekHistori(col+1,row)==true){return this.koordinat.push([col+1,row])}   
        }
        //cek kanan bawah
        if(i==3 && col+1 < grid && row+1<grid){
            if(grid[col+1][row+1] == value && this.cekHistori(col+1,row+1)==true){return this.koordinat.push([col+1,row+1])}   
        }
         //cek bawah
        if(i==4 && row+1<grid){
            if(grid[col][row+1] === value && this.cekHistori(col,row+1)==true){return this.koordinat.push([col,row+1])}
        }
        //cek kiri bawah
        if(i==5 && col-1>-1 && row+1 < grid){
            if(grid[col-1][row+1] == value && this.cekHistori(col-1,row+1)==true){return this.koordinat.push([col-1,row+1])}
          }
        // cek kiri
        if(i == 6 && col-1 >-1){
            if(grid[col-1][row] == value && this.cekHistori(col-1,row)==true){return this.koordinat.push([col-1,row])}
          }
        
        // cek kiri atas
        if(i == 7 && col-1 > -1 && row-1 > -1){
            if(grid[col-1][row-1] == value && this.cekHistori(col-1,row-1== true)){return this.koordinat.push([col-1,row-1])}
          }    
       
      }
        return this.koordinat;
    }
    
    cekHistori (col, row) {
        for(let i = 0; i < this.koordinat.length; i++){
            if( this.koordinat[i][0] == col  && this.koordinat[i][1] == row ){
                return false
            }
        }
        return true;
    }
 

}


let Boggle = new GameBoggle(kamus);

console.log(Boggle.printBoard())
//console.log(Boggle.isWord("ABADI"))
 
// console.log(Boggle.cekArea())
//console.log(Boggle.cekHistori())
console.log(Boggle.solve())