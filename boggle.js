/*
1. buat class dengan nama boggle dengan inputan array data yang dicari
2. buat constructors kata=kata,board=[],hasil=[], koordinat[[0,0]], buat constant aplhabet sbnyak 16
3. buat method shake untuk mengacak alphabet dan membuat board
4. method shake => step 1
    let r=0
    lakukan perulangan dimulai dari 0 sebanyak 4 (i)
      board.push([])

    lakukan perulangan dimulai dari 0 sebanyak aplhabet.length (i)
      board[r].push(alphabet[i])
      if (r<4) maka r++ else r=0

5. solved() => step 2
  perulangan sebnyak jumlah aray this.kata yang dicari i
    siapkan variabel flag=false
    lakukan perulangan sebanyak panjang board j
      lakukan perulangan sebnyak panjang board[j] k
        cek jika this.kata[i][0]===this.boad[j][k]
          koordinat=[[j,k]] asign koordinat awal
          cek jika cekKata(this.kata[i])===true
            hasil.push(this.kata[i])
            flag=true;
            break k
    jika flag===true break

6. cekKata(kata) => step 3
    split kata target
    lakukan perulangan dimulai dari 1 sebanyak panjang kata target (i)
      jalankan ceksquare(koordinat[kordinat.length-1][0],koordinat[kordinat.length-1][1],kata[i])
    if (koordinat.length===kata.length) return true else return false

7. ceksquare(col,row,value)  => step 4
    lakukan perulangan sebanyak 8 i
      jika i==1 && row-1>-1 ==> cek atas
        cek jika board[col][row-1]==value && cekhistory(col,row-1)==true
          return kordinat.push[col,row-1]
      jika i==2 && col+1<board.length && row-1>-1 ==> cek kanan atas
        cek jika board[col+1][row-1]==value && cekhistory(col+1,row-1)==true
          return kordinat.push[col+1,row-1]
      jika i==3 && col+1<board.length ==> cek kanan
        cek jika board[col+1][row]==value && cekhistory(col+1,row)==true
          return kordinat.push[col+1,row]
      jika i==4 && col+1<board.length && row+1<board.length ==> cek kanan bawah
        cek jika board[col+1][row+1]==value && cekhistory(col+1,row+1)==true
          return kordinat.push[col+1,row+1]
      jika i==5 && row+1<board.length ==> cek bawah
        cek jika board[col][row+1]==value && cekhistory(col,row+1)==true
          return kordinat.push[col,row+1]
      jika i==6 && col-1>-1 && row+1<board.length ==> cek kiri bawah
        cek jika board[col-1][row+1]==value && cekhistory(col-1,row+1)==true
          return kordinat.push[col-1,row+1]
      jika i==7 && col-1>-1 ==> cek kiri
        cek jika board[col-1][row]==value && cekhistory(col-1,row)==true
          return kordinat.push[col-1,row]
      jika i==8 && col-1>-1 && row-1>-1 ==> cek kiri atas
        cek jika board[col-1][row-1]==value && cekhistory(col-1,row-1)==true
          return kordinat.push[col-1,row-1]

8. cekhistory(col,row) => step 5
    lakukan perulangan sebanyak koordinat.length i
      cek jika col==koordinat[i][0] && row==koordinat[i][1]
        return false
    return true
*/

const data=require('./data');
// var sourceFile = require('./sourceFile');
class Boggle {
  constructor(kata) {
    this.kata=kata,
    this.board=[],
    this.hasil=[],
    this.koordinat=[],
    // this.alphabet='EBCDEFGHIJKLMNOP';
    this.alphabet='ABCDEFGHIJKLMNOPQRSTUVXXYZ';
  }

  shake(){
    let r=0;
    for (var i = 0; i < 4; i++) {
      this.board.push([]);
    }
    // for (var i = 0; i < this.alphabet.length; i++) { //console.log('r='+r);
    //   this.board[r].push(this.alphabet[i]);
    //   if (r<3) {
    //     r++;
    //   } else {
    //     r=0;
    //   }
    // }
    for (var i = 0; i < 16; i++) { //console.log('r='+r);
      this.board[r].push(this.alphabet.charAt(Math.floor(Math.random()*this.alphabet.length)));
      if (r<3) {
        r++;
      } else {
        r=0;
      }
    }
    //console.log(this.board);
    return this.board;
  }

  solved(){
    // this.shake();
    for (var i = 0; i < this.kata.length; i++) {
      let flag=false; //console.log(kata[i]);
      for (var j = 0; j < this.board.length; j++) {
        for (var k = 0; k < this.board[j].length; k++) {
          if (this.kata[i][0]===this.board[j][k]){
            this.koordinat=[[j,k]];
            //console.log('arr koordinat='+this.koordinat);
            // console.log('cek kata='+this.cekKata(kata[i]));
            if (this.cekKata(this.kata[i])===true) {
              this.hasil.push([this.kata[i]]); //console.log('kata='+[]);
              flag=true;
              break;
            }
          }
        }
        if (flag==true) {
          break;
        }
      }
    }
    console.log(`${this.hasil.length} words founded:`);
    return this.hasil.join();
  }

  cekKata(kata){
    for (var i = 1; i < kata.length; i++) { //console.log(kata[i]);
      //console.log('kolom='+this.koordinat[this.koordinat.length-1][0]+' row='+this.koordinat[this.koordinat.length-1][1]+' '+kata[i]);
      this.cekSquare(this.koordinat[this.koordinat.length-1][0],this.koordinat[this.koordinat.length-1][1],kata[i]);
      // console.log('panjang koordinat='+this.koordinat.length+' '+kata.length);
    }
    if (this.koordinat.length==kata.length) {
      return true;
    } else {
      return false;
    }

  }

  cekSquare(col,row,value){//console.log('---------------------col='+col+' row='+row+' value='+value);
    for (var i = 0; i <8; i++) {
      //console.log('---------------------col='+col+' row='+row+' value='+value);
      if (i==0 && row-1>-1) {//cek atas
        if (this.board[col][row-1]==value && this.cekHistory(col,row-1)==true) {
          return this.koordinat.push([col,row-1]);
        }
      }
      if (i==1 && col+1<this.board.length && row-1>-1) {//cek kanan atas
        if (this.board[col+1][row-1]==value && this.cekHistory(col+1,row-1)==true) {
          return this.koordinat.push([col+1,row-1]);
        }
      }
      if (i==2 && col+1<this.board.length) {//cek kanan
        if (this.board[col+1][row]==value && this.cekHistory(col+1,row)==true) {//console.log('========kanan');
          return this.koordinat.push([col+1,row]);
        }
      }
      if (i==3 && col+1<this.board.length && row+1<this.board.length ) {//cek kanan bawah
        if (this.board[col+1][row+1]==value && this.cekHistory(col+1,row+1)==true) {
          return this.koordinat.push([col+1,row+1]);
        }
      }
      if (i==4 && row+1<this.board.length ) {//cek bawah
        if (this.board[col][row+1]==value && this.cekHistory(col,row+1)==true) {
          return this.koordinat.push([col,row+1]);
        }
      }
      if (i==5 && col-1>-1 && row+1<this.board.length ) {//cek kiri bawah
        if (this.board[col-1][row+1]==value && this.cekHistory(col-1,row+1)==true) {
          return this.koordinat.push([col-1,row+1]);
        }
      }
      if (i==6 && col-1>-1) {//cek kiri
        if (this.board[col-1][row]==value && this.cekHistory(col-1,row)==true) {
          return this.koordinat.push([col-1,row]);
        }
      }
      if (i==7 && col-1>-1 && row-1>-1) {//cek kiri atas
        if (this.board[col-1][row-1]==value && this.cekHistory(col-1,row-1)==true) {
          return this.koordinat.push([col-1,row-1]);
        }
      }//console.log('======== i='+i+' col='+col+' row='+row+' isi board='+this.board[col+1][row]);
    }
  }
  cekHistory(col,row){
    for (var i = 0; i < this.koordinat.length; i++) {
      if (this.koordinat[i][0]==col && this.koordinat[i][1]==row){
        return false;
      }
    }
    return true;
  }
}

// console.log(sourceFile.variableName);
let boggle1 = new Boggle(data.words);
console.log(boggle1.shake());
console.log(`Count of data searched:${data.words.length}`);
// console.log(`The words searched: ${data.words}`);
console.log(boggle1.solved());
// console.log(boggle1.solved(['EIM','FKP','BHK']));
//console.log(boggle1.cekKata('EIM'));
