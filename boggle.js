const words = require('./data.js');
class Boggle {
  constructor(data) {
    this.boardSize = 0;
    this.boggleBoard = [];
    this.abjad = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.visitedIndex = [];
    this.firstLetterIndex = [];
    this.currentSearch = "";
    this.found = [];
    this.foundAt = [];
    this.data = data;
  }
  shake(num) {
    this.boardSize = num;
    this.boggleBoard = [];
    for (var i = 0; i < num; i++) {
      var temp = [];
      for (var j = 0; j < num; j++) {
        var random = Math.floor((Math.random() * (26 - 0)));
        temp.push(this.abjad[random]);
      }
      this.boggleBoard.push(temp);
    }
  }
  solve() {
    var result = [];
    for (var i = 0; i < this.data.length; i++) {
      this.findFirstLetter(this.data[i]);
      result.push(this.find());
    }
    return this.found;
  }
  find() {
    var temp = this.currentSearch.split('');
    temp.shift();
    for (var i = 0; i < this.firstLetterIndex.length; i++) {
      this.visitedIndex = [];
      if(this.findNextLetter(this.firstLetterIndex[i], temp.join(''))){
        this.found.push(this.currentSearch);
        this.foundAt.push(this.visitedIndex);
      }
    }
  }
  isVisited(index) {
    for (var i = 0; i < this.visitedIndex.length; i++) {
      if (index[0] === this.visitedIndex[i][0] && index[1] === this.visitedIndex[i][1]) {
        return true;
      }
    }
    return false;
  }
  testing() {
    this.boggleBoard = [
      ['D', 'G', 'H', 'I'],
      ['K', 'L', 'P', 'S'],
      ['Y', 'E', 'U', 'T'],
      ['E', 'A', 'P', 'N']
    ];
  }
  findFirstLetter(str) {
    this.currentSearch = str;
    var result = [];
    for (var i = 0; i < this.boardSize; i++) {
      for (var j = 0; j < this.boardSize; j++) {
        if (this.boggleBoard[i][j].toUpperCase() === str[0].toUpperCase()) {
          result.push([i, j])
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
    if (this.horizontalRight(index, search[0])) {
      var newIndex = [index[0], index[1]]
      newIndex[1] += 1
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if(this.findNextLetter(newIndex, searchMore)){
        return true;
      }
    }
    if (this.horizontalLeft(index, search[0])) {
      var newIndex = [index[0],index[1]];
      newIndex[1] -= 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if(this.findNextLetter(newIndex, searchMore)){
        return true;
      }
    }
    if (this.verticalUp(index, search[0])) {
      var newIndex = [index[0],index[1]];
      newIndex[0] -= 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if(this.findNextLetter(newIndex, searchMore)){
        return true;
      }
    }
    if (this.verticalDown(index, search[0])) {
      var newIndex = [index[0],index[1]]
      newIndex[0] += 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if(this.findNextLetter(newIndex, searchMore)){
        return true;
      }
    }
    if (this.diagonalDownLeft(index, search[0])) {
      var newIndex = [index[0],index[1]]
      newIndex[0] += 1;
      newIndex[1] -= 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if(this.findNextLetter(newIndex, searchMore)){
        return true;
      }
    }
    if (this.diagonalDownRight(index, search[0])) {
      var newIndex = [index[0],index[1]]
      newIndex[0] += 1;
      newIndex[1] += 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if(this.findNextLetter(newIndex, searchMore)){
        return true;
      }
    }
    if (this.diagonalUpLeft(index, search[0])) {
      var newIndex = [index[0],index[1]]
      newIndex[0] -= 1;
      newIndex[1] -= 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if(this.findNextLetter(newIndex, searchMore)){
        return true;
      }
    }
    if (this.diagonalUpRight(index, search[0])) {
      var newIndex = [index[0],index[1]]
      newIndex[0] -= 1;
      newIndex[1] += 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if(this.findNextLetter(newIndex, searchMore)){
        return true;
      }
    }
    this.visitedIndex.shift();
    return false;
  }
  horizontalRight(index, letter) {
    if (this.isVisited([index[0], index[1] + 1])) {
      return false;
    }
    if (this.boggleBoard[index[0]][index[1] + 1] === letter) {
      return true;
    }
    return false;
  }
  horizontalLeft(index, letter) {
    if (this.isVisited([index[0], index[1] - 1])) {
      return false;
    }
    if (this.boggleBoard[index[0]][index[1] - 1] === letter) {
      return true;
    }
    return false;
  }
  verticalUp(index, letter) {
    if (this.isVisited([index[0] - 1, [index[1]]])) {
      return false;
    }
    if (index[0] - 1 < 0) {
      return false
    }
    if (this.boggleBoard[index[0] - 1][index[1]] === letter) {
      return true;
    }
    return false;
  }
  verticalDown(index, letter) {
    if (this.isVisited([index[0] + 1, index[1]])) {
      return false;
    }
    if (index[0] + 1 > this.boardSize - 1) {
      return false;
    }
    if (this.boggleBoard[index[0] + 1][index[1]] === letter) {
      return true;
    }
    return false;
  }
  diagonalUpLeft(index, letter) {
    if (this.isVisited([index[0] - 1, index[1] - 1])) {
      return false;
    }
    if (index[0] - 1 < 0) {
      return false;
    }
    if (this.boggleBoard[index[0] - 1][index[1] - 1] === letter) {
      return true;
    }
    return false;
  }
  diagonalUpRight(index, letter) {
    if (this.isVisited([index[0] - 1, index[1] + 1])) {
      return false;
    }
    if (index[0] - 1 < 0) {
      return false;
    }
    if (this.boggleBoard[index[0] - 1][index[1] + 1] === letter) {
      return true;
    }
    return false;
  }
  diagonalDownLeft(index, letter) {
    if (this.isVisited([index[0] + 1, index[1] - 1])) {
      return false;
    }
    if (index[0] + 1 > this.boardSize - 1) {
      return false;
    }
    if (this.boggleBoard[index[0] + 1][index[1] - 1] === letter) {
      return true;
    }
    return false;
  }
  diagonalDownRight(index, letter) {
    if (this.isVisited([index[0] + 1, index[1] + 1])) {
      return false;
    }
    if (index[0] + 1 > this.boardSize - 1) {
      return false;
    }
    if (this.boggleBoard[index[0] + 1][index[1] + 1] === letter) {
      return true;
    }
    return false;
  }
}

var game = new Boggle(words);

game.shake(12);
console.log(game.boggleBoard);
var solved = game.solve();
var foundAt = game.foundAt.map( arr => arr.reverse());
console.log('\n ' + solved.length + ' words found in board');
for(var i =0;i<solved.length;i++){
  console.log(solved[i] + ' is found at position');
  console.log(foundAt[i]);
}
