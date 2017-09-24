
const Dict = require('./data');

class Boggle {
  constructor() {
    this.arr = [];

    // this.gameDummy = [['D', 'E', 'A', 'P'], ['G', 'B', 'S', 'Q'], ['P', 'E', 'G', 'B'], ['Q', 'V', 'T', 'O']];
    // this.wordsDummy = ['PET', 'DEA', 'TOB'];
    this.currentSearch = '';
    this.firstLetterIndex = [];
    this.visitedIndex = [];
  }

  shake(number) {
    this.boardSize = number;
    let words = 'abcdefghijklmnopqrstuvwxyz';
    for (let x = 0; x < number; x++) {
      this.arr[x] = [];
      for (let y = 0; y < number; y++) {
        this.arr[x][y] = (words.toUpperCase()[Math.floor(Math.random() * words.length)]);
      }
    }

    return this.arr;
  }

  solve() {
    let result = [];
    let hitung = [];
    for (var i = 0; i < dict.dictionary().length; i++) {
      this.found = 0;
      this.findFirstLetter(dict.dictionary()[i]);
      result.push(this.find());
    }

    for (var x = 0; x < result.length; x++) {
      if (result[x] !== false) {
        hitung.push(result[x]);
      }

    }

    return hitung.length + ' words found ' + hitung;

  }

  find() {
    let temp = this.currentSearch.split('');
    let hasil = [];
    temp.shift();
    for (var i = 0; i < this.firstLetterIndex.length; i++) {
      this.visitedIndex = [];
      if (this.findNextLetter(this.firstLetterIndex[i], temp.join(''))) {
        // console.log(this.visitedIndex);
        // return true;
        return this.currentSearch;
      }
    }

    return false;

  }

  isVisited(index) {
    for (var i = 0; i < this.visitedIndex.length; i++) {
      if (index[0] === this.visitedIndex[i][0] && index[1] === this.visitedIndex[i][1]) {
        return true;
      }
    }

    return false;
  }

  findFirstLetter(str) {
    this.currentSearch = str;
    var result = [];
    for (var i = 0; i < this.boardSize; i++) {
      for (var j = 0; j < this.boardSize; j++) {
        if (this.arr[i][j].toUpperCase() === str[0].toUpperCase()) {
          result.push([i, j]);
        }
      }
    }

    this.firstLetterIndex = result;
  }

  findNextLetter(index, search) {
    this.visitedIndex.unshift(index);
    if (this.visitedIndex.length === this.currentSearch.length) {
      return true;
    }

    if (this.eastRight(index, search[0])) {
      let newIndex = [index[0], index[1]];
      newIndex[1] += 1;
      let temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if (this.findNextLetter(newIndex, searchMore)) {
        return true;
      }
    }

    if (this.westLeft(index, search[0])) {
      var newIndex = [index[0], index[1]];
      newIndex[1] -= 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if (this.findNextLetter(newIndex, searchMore)) {
        return true;
      }
    }

    if (this.northUp(index, search[0])) {
      var newIndex = [index[0], index[1]];
      newIndex[0] -= 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if (this.findNextLetter(newIndex, searchMore)) {
        return true;
      }
    }

    if (this.southDown(index, search[0])) {
      var newIndex = [index[0], index[1]];
      newIndex[0] += 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if (this.findNextLetter(newIndex, searchMore)) {
        return true;
      }
    }

    if (this.southWest(index, search[0])) {
      var newIndex = [index[0], index[1]];
      newIndex[0] += 1;
      newIndex[1] -= 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if (this.findNextLetter(newIndex, searchMore)) {
        return true;
      }
    }

    if (this.southEast(index, search[0])) {
      var newIndex = [index[0], index[1]];
      newIndex[0] += 1;
      newIndex[1] += 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if (this.findNextLetter(newIndex, searchMore)) {
        return true;
      }
    }

    if (this.northWest(index, search[0])) {
      var newIndex = [index[0], index[1]];
      newIndex[0] -= 1;
      newIndex[1] -= 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if (this.findNextLetter(newIndex, searchMore)) {
        return true;
      }
    }

    if (this.northEast(index, search[0])) {
      var newIndex = [index[0], index[1]];
      newIndex[0] -= 1;
      newIndex[1] += 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if (this.findNextLetter(newIndex, searchMore)) {
        return true;
      }
    }

    this.visitedIndex.shift();
    return false;
  }

  eastRight(index, letter) {
    if (this.isVisited([index[0], index[1] + 1])) {
      return false;
    }

    if (this.arr[index[0]][index[1] + 1] === letter) {
      return true;
    }

    return false;
  }

  westLeft(index, letter) {
    if (this.isVisited([index[0] - 1, [index[1]]])) {
      return false;
    }

    if (this.arr[index[0]][index[1] - 1] === letter) {
      return true;
    }

    return false;
  }

  northUp(index, letter) {
    if (this.isVisited([index[0] - 1, [index[1]]])) {
      return false;
    }

    if (index[0] - 1 < 0) {
      return false;
    }

    if (this.arr[index[0] - 1][index[1]] === letter) {
      return true;
    }

    return false;
  }

  southDown(index, letter) {
    if (this.isVisited([index[0] + 1, index[1]])) {
      return false;
    }

    if (index[0] + 1 > this.boardSize - 1) {
      return false;
    }

    if (this.arr[index[0] + 1][index[1]] === letter) {
      return true;
    }

    return false;
  }

  northWest(index, letter) {
    if (this.isVisited([index[0] - 1, index[1] - 1])) {
      return false;
    }

    if (index[0] - 1 < 0) {
      return false;
    }

    if (this.arr[index[0] - 1][index[1] - 1] === letter) {
      return true;
    }

    return false;
  }

  northEast(index, letter) {
    if (this.isVisited([index[0] - 1, index[1] + 1])) {
      return false;
    }

    if (index[0] - 1 < 0) {
      return false;
    }

    if (this.arr[index[0] - 1][index[1] + 1] === letter) {
      return true;
    }

    return false;
  }

  southWest(index, letter) {
    if (this.isVisited([index[0] + 1, index[1] - 1])) {
      return false;
    }

    if (index[0] + 1 > this.boardSize - 1) {
      return false;
    }

    if (this.arr[index[0] + 1][index[1] - 1] === letter) {
      return true;
    }

    return false;
  }

  southEast(index, letter) {
    if (this.isVisited([index[0] + 1, index[1] + 1])) {
      return false;
    }

    if (index[0] + 1 > this.boardSize - 1) {
      return false;
    }

    if (this.arr[index[0] + 1][index[1] + 1] === letter) {
      return true;
    }

    return false;
  }
}

let boggleGame = new Boggle();
let dict = new Dict();

boggleGame.shake(4);
console.log(boggleGame.arr);
// console.log(boggleGame.gameDummy);
// console.log(boggleGame.wordsDummy);
// console.log(dict.dictionary().length);
console.log(boggleGame.solve());
