const words = require('./data.js');
class Boggle {
  constructor(num) {
    this.boardSize = num;
    this.boggleBoard = [];
    this.abjad = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.visitedIndex = [];
    this.firstLetterIndex = [];
    this.currentSearch = "";
  }
  shake(num) {
    num = this.boardSize;
    this.boggleBoard = [];
    for (var i = 0; i < num; i++) {
      var temp = [];
      for (var j = 0; j < num; j++) {
        var random = Math.floor((Math.random() * (0 - 25) + 25));
        temp.push(this.abjad[random]);
      }
      this.boggleBoard.push(temp);
    }
  }
  solve() {
    var result = [];
    for (var i = 0; i < words.length; i++) {
      this.found = 0;
      this.findFirstLetter(words[i]);
      result.push(this.find());
    }
    return result;
  }
  find() {
    var temp = this.currentSearch.split('');
    temp.shift();
    for (var i = 0; i < this.firstLetterIndex.length; i++) {
      this.visitedIndex = [];
      if(this.findNextLetter(this.firstLetterIndex[i], temp.join(''))){
        console.log(this.visitedIndex);
        return this.currentSearch + " is found";
      }
    }
    return this.currentSearch + " is not found";
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

var game = new Boggle(12);

game.shake(12);
console.log(game.boggleBoard);
console.log(game.solve());
