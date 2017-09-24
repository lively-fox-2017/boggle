const data = require('./data');

class Boggle {
  constructor() {
    this.boardElement = [];
    this.solutionMark = [];
  }

  shake(size) {
    for (let i = 0; i < size; i++) {
      let row = [];
      let rowSolution = [];
      for (let j = 0; j < size; j++) {
        row.push(String.fromCharCode(65 + Math.floor(Math.random() * 26)));
        rowSolution.push(0);
      }
      this.solutionMark.push(rowSolution);
      this.boardElement.push(row);
    }
  }

  searchTheWord(word) {
    // Cari dengan titik awal setiap elemen yang ada
    for (let i = 0; i < this.boardElement.length; i++) {
      for (let j = 0; j < this.boardElement.length; j++) {
        if (this.neighboorCheck(word, i, j, 0))
          return true;
      }
    }
    return false;
  }

  neighboorCheck(word, baris, kolom, index) {
    // Apakah elemen ini sudah dicek? Apakah elemen ini adalah huruf yang dicari?
    if (this.solutionMark[baris][kolom] === 1 || word[index] !== this.boardElement[baris][kolom]) {
      return false;
    }

    if (index === word.length - 1) {
      // Kalo indexnya suda mencapai panjang kata yang dicari, kata KETEMU
      this.solutionMark[baris][kolom] = 1;
      return true;
    }

    // Tandain elemen ini sudah dicek
    this.solutionMark[baris][kolom] = 1;

    // Cek tetangganya
    if (baris + 1 < this.boardElement.length && this.neighboorCheck(word, baris + 1, kolom, index + 1))
      // Cek Elemen di bawahnya
      return true;
    if (baris - 1 >= 0 && this.neighboorCheck(word, baris - 1, kolom, index + 1))
      // Cek elemen di atasnya
      return true;
    if (kolom + 1 < this.boardElement.length && this.neighboorCheck(word, baris, kolom + 1, index + 1))
      // Cek elemen di kanannya
      return true;
    if (kolom - 1 >= 0 && this.boardElement.length && this.neighboorCheck(word, baris, kolom - 1, index + 1))
      // Cek elemen di kirinya
      return true;
    if (baris + 1 < this.boardElement.length && kolom + 1 < this.boardElement.length && this.neighboorCheck(word, baris + 1, kolom + 1, index + 1))
      // Cek elemen serong kanan atas
      return true;
    if (baris + 1 < this.boardElement.length && kolom - 1 >= 0 && this.neighboorCheck(word, baris + 1, kolom - 1, index + 1))
      // Cek elemen serong kiri atas
      return true;
    if (baris - 1 >= 0 && kolom + 1 < this.boardElement.length && this.neighboorCheck(word, baris - 1, kolom + 1, index + 1))
      // Cek elemen serong kanan bawah
      return true;
    if (baris - 1 >= 0 && kolom - 1 >= 0 && this.neighboorCheck(word, baris - 1, kolom - 1, index + 1))
      // Cek elemen serong kiri bawah
      return true;

    // Kalo disemua elemen diatas tidak ada, berarti bukan dimulai dari elemen sini
    this.solutionMark[baris][kolom] = 0;
    return false;
  }

  printBoard() {
    let str = '';
    let rowLength = 0;
    for (let i = 0; i < this.boardElement.length; i++) {
      for (let j = 0; j < this.boardElement.length; j++) {
        if (j !== this.boardElement.length - 1) {
          str += ' ' + this.boardElement[i][j] + ' | ';
        } else {
          str += ' ' + this.boardElement[i][j] + ' ';
        }
      }
      if (i === 0)
        rowLength = str.length;
      str += "\n";
      str += "-".repeat(rowLength) + "\n";
    }
    str = "-".repeat(rowLength) + "\n" + str;
    return str;
  }

  solve(words) {
    let result = [];
    let strResult = '';
    for (let i = 0; i < words.length; i++) {
      if (this.searchTheWord(words[i]))
        result.push(words[i])
    }
    if (result.length > 1) {
      strResult += result.length.toString() + ' words found : \n'
    } else {
      strResult += result.length.toString() + ' word found : \n'
    }

    for (let i = 0; i < result.length; i++) {
      strResult += result[i] + '\n';
    }
    return strResult;
  }
}

let game = new Boggle();
game.shake(10);
console.log(game.printBoard());
console.log(game.solve(data));
