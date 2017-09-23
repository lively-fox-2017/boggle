'use strict'
//const fs = require('fs');
const data = require('./data.js');
class Boogle {
  constructor(n) {
    //this.board = this.shake(n);
    this.board = [['D', 'G', 'H', 'I'],
                  ['K', 'L', 'P', 'S'],
                  ['Y', 'E', 'U', 'T'],
                  ['E', 'O', 'R', 'N']];
    this.words = ['APPLE', 'SIT', 'TRIP', 'TURN', 'SUPER', 'NUN', 'EROR']
    //this.words = data;
    this.result = [];
  }

  // retrieveWordsFromFile(namaFile){
  //   let data = fs.readFileSync(namaFile);
  //   console.log(data);
  //   return data;
  // }

  printBoard(){
    let board = '';
    board += '------------------------------\n';
    for(let baris of this.board){
      board += '| ';
      for(let huruf of baris){
        board += huruf;
        board += ' '
      }
      board += '|\n';
    }
    board += '------------------------------'
    console.log(board);
  }

  alphabetRandomizer(){// get random alphabet
    let rng = Math.round(Math.random()*(122-97))+97;
    let result = String.fromCharCode(rng);
    return result
  }

  shake(number){
    let board = [];
    for (let baris=0; baris<number; baris++){
      board.push([])
      for (let kolom=0; kolom<number; kolom++){
        board[baris].push(this.alphabetRandomizer());
      }
    }
    return board;
  }

  nextHurufCheckRight(kata, index, barisYangAkanDicek, kolomYangAkanDicek){
    //return boolean
    if(kata[index]==this.board[barisYangAkanDicek][kolomYangAkanDicek]){
      return true;
    }
    return false;
  }

  isVisitedCheck(stackVisited, nextBaris, nextKolom){
    console.log(stackVisited);
    for(let pos of stackVisited){
      //console.log(`pos = ${pos}`);
      if(pos[0]==nextBaris &&
        pos[1]==nextKolom){
          //console.log('ohayou');
          return true;
        }
    }
    return false;
  }

  isNextWall(nextBaris, nextKolom){
    if(nextBaris<0 ||
    nextBaris>this.board[0].length-1 ||
    nextKolom<0 ||
    nextKolom>this.board.length-1){
      return  true;
    }
    return false;
  }

  // trackKata(kata, indexYangAkanDicek, indexBaris, indexKolom, stackVisited){
  //   let checked = false;
  //   let nextKananBaris = indexBaris;
  //   let nextKananKolom = indexKolom+1;
  //
  //   let nextKiriBaris = indexBaris;
  //   let nextKiriKolom = indexKolom-1;
  //
  //   let nextAtasBaris = indexBaris-1;
  //   let nextAtasKolom = indexKolom;
  //
  //   let nextBawahBaris = indexBaris+1;
  //   let nextBawahKolom = indexKolom;
  //
  //   let nextAtasKananBaris = indexBaris-1;
  //   let nextAtasKananKolom = indexKolom+1;
  //
  //   console.log('baris iterasi ',indexBaris);
  //   console.log('kolom iterasi ',indexKolom);
  //
  //   //cek atas
  //   if(!this.isNextWall(nextAtasBaris, nextAtasKolom) &&
  //   this.nextHurufCheckRight(kata, indexYangAkanDicek, nextAtasBaris, nextAtasKolom) &&
  //   !checked&&
  //   !this.isVisitedCheck(stackVisited, indexBaris, indexKolom)
  //   ){
  //     //console.log('belok kanan  bos');
  //     //console.log(indexYangAkanDicek);
  //     if(indexYangAkanDicek==kata.length-1){
  //       console.log('we did it we did it hooray olisimos ',kata);
  //       return `dapet ${kata}`;
  //     }else{
  //       stackVisited.push([[indexBaris],[indexKolom]])
  //       checked=true;
  //       if(this.trackKata(kata, indexYangAkanDicek+1, nextAtasBaris, nextAtasKolom, stackVisited)==false){
  //         checked=false;
  //       };
  //     }
  //   }
  //   //cek kana
  //   if(!this.isNextWall(nextKananBaris, nextKananKolom) &&
  //   this.nextHurufCheckRight(kata, indexYangAkanDicek, nextKananBaris, nextKananKolom) &&
  //   !checked&&
  //   !this.isVisitedCheck(stackVisited, indexBaris, indexKolom)
  //   ){
  //     //console.log('belok kanan  bos');
  //     console.log(indexYangAkanDicek);
  //     if(indexYangAkanDicek==kata.length-1){
  //       console.log('we did it we did it hooray olisimos ',kata);
  //       return `dapet ${kata}`;
  //     }else{
  //       stackVisited.push([[indexBaris],[indexKolom]])
  //       checked=true;
  //       if(this.trackKata(kata, indexYangAkanDicek+1, nextKananBaris, nextKananKolom, stackVisited)==false){
  //         checked=false;
  //       };
  //     }
  //   }
  //   //cek bawah
  //   if(!this.isNextWall(nextBawahBaris, nextBawahKolom) &&
  //   this.nextHurufCheckRight(kata, indexYangAkanDicek, nextBawahBaris, nextBawahKolom) &&
  //   !checked&&
  //   !this.isVisitedCheck(stackVisited, indexBaris, indexKolom)
  //   ){
  //     //console.log('belok kanan  bos');
  //     console.log(indexYangAkanDicek);
  //     if(indexYangAkanDicek==kata.length-1){
  //       console.log('we did it we did it hooray olisimos ',kata);
  //       return `dapet ${kata}`;
  //     }else{
  //       stackVisited.push([[indexBaris],[indexKolom]])
  //       checked=true;
  //       if(this.trackKata(kata, indexYangAkanDicek+1, nextBawahBaris, nextBawahKolom, stackVisited)==false){
  //         checked=false;
  //       };
  //     }
  //   }
  //   //cek kiri
  //   if(!this.isNextWall(nextKiriBaris, nextKiriKolom) &&
  //   this.nextHurufCheckRight(kata, indexYangAkanDicek, nextKiriBaris, nextKiriKolom) &&
  //   !checked&&
  //   !this.isVisitedCheck(stackVisited, indexBaris, indexKolom)
  //   ){
  //     //console.log('belok kanan  bos');
  //     console.log(indexYangAkanDicek);
  //     if(indexYangAkanDicek==kata.length-1){
  //       console.log('we did it we did it hooray olisimos ',kata);
  //       return `dapet ${kata}`;
  //     }else{
  //       stackVisited.push([[indexBaris],[indexKolom]])
  //       checked=true;
  //       if(this.trackKata(kata, indexYangAkanDicek+1, nextKiriBaris, nextKiriKolom, stackVisited)==false){
  //         checked=false;
  //       };
  //     }
  //   }
  //
  //   //pindahin return false ke kemungkinan terakhir
  //   if (checked==false){
  //     return false;
  //   }
  //   if (checked == true){
  //     return true;
  //   }
  // }



  trackKata(kata, indexYangAkanDicek, indexBaris, indexKolom, stackVisited){
    let checked = false;
    let nextKananBaris = indexBaris;
    let nextKananKolom = indexKolom+1;

    let nextKiriBaris = indexBaris;
    let nextKiriKolom = indexKolom-1;

    let nextAtasBaris = indexBaris-1;
    let nextAtasKolom = indexKolom;

    let nextBawahBaris = indexBaris+1;
    let nextBawahKolom = indexKolom;

    let nextAtasKananBaris = indexBaris-1;
    let nextAtasKananKolom = indexKolom+1;

    let nextBawahKananBaris = indexBaris+1;
    let nextBawahKananKolom = indexKolom+1;

    let nextAtasKiriBaris = indexBaris-1;
    let nextAtasKiriKolom = indexKolom-1;

    let nextBawahKiriBaris = indexBaris+1;
    let nextBawahKiriKolom = indexKolom-1;

    //console.log('baris iterasi ',indexBaris);
    //console.log('kolom iterasi ',indexKolom);

    if(!this.isNextWall(nextAtasKananBaris, nextAtasKananKolom) &&
    this.nextHurufCheckRight(kata, indexYangAkanDicek, nextAtasKananBaris, nextAtasKananKolom) &&
    !checked&&
    !this.isVisitedCheck(stackVisited, indexBaris, indexKolom)
    ){
      //console.log('belok kanan  bos');
      //console.log(indexYangAkanDicek);
      if(indexYangAkanDicek==kata.length){
        //console.log('we did it we did it hooray olisimos ',kata);
        return `dapet ${kata}`;
      }else{
        stackVisited.push([indexBaris,indexKolom])
        checked=true;
        if(this.trackKata(kata, indexYangAkanDicek+1, nextAtasKananBaris, nextAtasKananKolom, stackVisited)==false){
          checked=false;
        };
      }
    }

    if(!this.isNextWall(nextBawahKananBaris, nextBawahKananKolom) &&
    this.nextHurufCheckRight(kata, indexYangAkanDicek, nextBawahKananBaris, nextBawahKananKolom) &&
    !checked&&
    !this.isVisitedCheck(stackVisited, indexBaris, indexKolom)
    ){
      //console.log('belok kanan  bos');
      //console.log(indexYangAkanDicek);
      if(indexYangAkanDicek==kata.length){
        //console.log('we did it we did it hooray olisimos ',kata);
        return `dapet ${kata}`;
      }else{
        stackVisited.push([indexBaris,indexKolom])
        checked=true;
        if(this.trackKata(kata, indexYangAkanDicek+1, nextBawahKananBaris, nextBawahKananKolom, stackVisited)==false){
          checked=false;
        };
      }
    }

    if(!this.isNextWall(nextAtasKiriBaris, nextAtasKiriKolom) &&
    this.nextHurufCheckRight(kata, indexYangAkanDicek, nextAtasKiriBaris, nextAtasKiriKolom) &&
    !checked&&
    !this.isVisitedCheck(stackVisited, indexBaris, indexKolom)
    ){
      //console.log('belok kanan  bos');
      //console.log(indexYangAkanDicek);
      if(indexYangAkanDicek==kata.length){
        //console.log('we did it we did it hooray olisimos ',kata);
        return `dapet ${kata}`;
      }else{
        stackVisited.push([indexBaris,indexKolom])
        checked=true;
        if(this.trackKata(kata, indexYangAkanDicek+1, nextAtasKiriBaris, nextAtasKiriKolom, stackVisited)==false){
          checked=false;
        };
      }
    }

    if(!this.isNextWall(nextBawahKiriBaris, nextBawahKiriKolom) &&
    this.nextHurufCheckRight(kata, indexYangAkanDicek, nextBawahKiriBaris, nextBawahKiriKolom) &&
    !checked&&
    !this.isVisitedCheck(stackVisited, indexBaris, indexKolom)
    ){
      //console.log('belok kanan  bos');
      //console.log(indexYangAkanDicek);
      if(indexYangAkanDicek==kata.length){
        //console.log('we did it we did it hooray olisimos ',kata);
        return `dapet ${kata}`;
      }else{
        stackVisited.push([indexBaris,indexKolom])
        checked=true;
        if(this.trackKata(kata, indexYangAkanDicek+1, nextBawahKiriBaris, nextBawahKiriKolom, stackVisited)==false){
          checked=false;
        };
      }
    }

    //cek atas
    if(!this.isNextWall(nextAtasBaris, nextAtasKolom) &&
    this.nextHurufCheckRight(kata, indexYangAkanDicek, nextAtasBaris, nextAtasKolom) &&
    !checked&&
    !this.isVisitedCheck(stackVisited, indexBaris, indexKolom)
    ){
      //console.log('belok kanan  bos');
      //console.log(indexYangAkanDicek);
      if(indexYangAkanDicek==kata.length){
        //console.log('we did it we did it hooray olisimos ',kata);
        return `dapet ${kata}`;
      }else{
        stackVisited.push([indexBaris,indexKolom])
        checked=true;
        if(this.trackKata(kata, indexYangAkanDicek+1, nextAtasBaris, nextAtasKolom, stackVisited)==false){
          checked=false;
        };
      }
    }
    //cek kana
    if(!this.isNextWall(nextKananBaris, nextKananKolom) &&
    this.nextHurufCheckRight(kata, indexYangAkanDicek, nextKananBaris, nextKananKolom) &&
    !checked&&
    !this.isVisitedCheck(stackVisited, indexBaris, indexKolom)
    ){
      //console.log('belok kanan  bos');
      //console.log(indexYangAkanDicek);
      if(indexYangAkanDicek==kata.length){
        //console.log('we did it we did it hooray olisimos ',kata);
        return `dapet ${kata}`;
      }else{
        stackVisited.push([indexBaris,indexKolom])
        checked=true;
        if(this.trackKata(kata, indexYangAkanDicek+1, nextKananBaris, nextKananKolom, stackVisited)==false){
          checked=false;
        };
      }
    }
    //cek bawah
    if(!this.isNextWall(nextBawahBaris, nextBawahKolom) &&
    this.nextHurufCheckRight(kata, indexYangAkanDicek, nextBawahBaris, nextBawahKolom) &&
    !checked&&
    !this.isVisitedCheck(stackVisited, indexBaris, indexKolom)
    ){
      //console.log('belok kanan  bos');
      //console.log(indexYangAkanDicek);
      if(indexYangAkanDicek==kata.length){
        //console.log('we did it we did it hooray olisimos ',kata);
        return `dapet ${kata}`;
      }else{
        stackVisited.push([indexBaris,indexKolom])
        checked=true;
        if(this.trackKata(kata, indexYangAkanDicek+1, nextBawahBaris, nextBawahKolom, stackVisited)==false){
          checked=false;
        };
      }
    }
    //cek kiri
    if(!this.isNextWall(nextKiriBaris, nextKiriKolom) &&
    this.nextHurufCheckRight(kata, indexYangAkanDicek, nextKiriBaris, nextKiriKolom) &&
    !checked&&
    !this.isVisitedCheck(stackVisited, indexBaris, indexKolom)
    ){
      //console.log('belok kanan  bos');
      //console.log(indexYangAkanDicek);
      if(indexYangAkanDicek==kata.length){
        //console.log('we did it we did it hooray olisimos ',kata);
        return `dapet ${kata}`;
      }else{
        stackVisited.push([indexBaris,indexKolom])
        checked=true;
        if(this.trackKata(kata, indexYangAkanDicek+1, nextKiriBaris, nextKiriKolom, stackVisited)==false){
          checked=false;
        };
      }
    }

    //pindahin return false ke kemungkinan terakhir
    if (checked==false){
      return false;
    }
    if (checked == true){
      return true;
    }
  }

  printResult(){
    console.log(`${this.result.length} words found`);
    for (let kata of this.result){
      console.log(kata);
    }
  }

  solve(){
    //untuk setiap kata lakukan backtrack;
    //
    //this.trackKata('sit',0, 0,0,[]);
    for(let kata of this.words){
      for(let baris=0; baris<this.board.length; baris++){
        for (let kolom = 0; kolom<this.board.length; kolom++){
          if (this.board[baris][kolom]==kata[0]){
            if(this.trackKata(kata, 0,baris-1,kolom-1,[])){
              this.result.push(kata);
              break;
            }
          }
        }
      }
      //this.trackKata(kata, 0,0,0,[]);
    }

  }

}

let boogle = new Boogle(4);
boogle.printBoard();
boogle.solve()
boogle.printResult()
//boogle.retrieveWordsFromFile('data.js')
//console.log(boogle.board);
