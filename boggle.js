const words = require('./dummy.js');
class Boggle {
  constructor(num) {
    this.boardSize = num;
    this.boggleBoard = [];
    this.abjad = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.visitedIndex = [];
    this.firstLetterIndex = [];
    this.currentSearch = "";
    this.found = 0;
  }
  shake(num) {
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
      this.findNextLetter(this.firstLetterIndex[i], temp.join(''));
      if (this.found > 0) {
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
      ['E', 'R', 'U', 'T'],
      ['E', 'A', 'R', 'N']
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
    var tes = [index[0], index[1]];
    this.visitedIndex.unshift(tes);
    console.log(this.visitedIndex);
    if (this.visitedIndex.length === this.currentSearch.length) {
      this.found++;
      return true;
    }
    console.log(search[0],'right');
    if (this.horizontalRight(index, search[0])) {
      console.log('y');
      var tes2 = [index[0], index[1]]
      tes2[1] += 1
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if(this.findNextLetter(tes2, searchMore)){
        console.log('a');
        return true;
      }
      console.log('b');
    }
    console.log(search[0],'left');
    if (this.horizontalLeft(index, search[0])) {
      console.log('y');
      var tes2 = [index[0],index[1]];
      tes2[1] -= 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if(this.findNextLetter(tes2, searchMore)){
        console.log('a');
        return true;
      }
      console.log('b');
    }
    console.log(search[0],'up');
    if (this.verticalUp(index, search[0])) {
      console.log('y');
      var tes2 = [index[0],index[1]];
      tes2[0] -= 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if(this.findNextLetter(tes2, searchMore)){
        console.log('a');
        return true;
      }
      console.log('b');
    }
    console.log(search[0],'down');
    if (this.verticalDown(index, search[0])) {
      console.log('y');
      var tes2 = [index[0],index[1]]
      tes2[0] += 1;
      var temp = search.split('');
      temp.shift();
      var searchMore = temp.join('');
      if(this.findNextLetter(tes2, searchMore)){
        console.log('a');
        return true;
      }
      console.log('b');
    }
    // if (this.diagonalDownLeft(index, search[0])) {
    //   index[0] += 1;
    //   index[1] -= 1;
    //   var temp = search.split('');
    //   temp.shift();
    //   search = temp.join('');
    //   this.findNextLetter(index, search);
    // }
    // if (this.diagonalDownRight(index, search[0])) {
    //   index[0] += 1;
    //   index[0] += 1;
    //   var temp = search.split('');
    //   temp.shift();
    //   search = temp.join('');
    //   this.findNextLetter(index, search);
    // }
    // if (this.diagonalUpLeft(index, search[0])) {
    //   index[0] -= 1;
    //   index[0] -= 1;
    //   var temp = search.split('');
    //   temp.shift();
    //   search = temp.join('');
    //   this.findNextLetter(index, search);
    // }
    // if (this.diagonalUpRight(index, search[0])) {
    //   index[0] -= 1;
    //   index[0] += 1;
    //   var temp = search.split('');
    //   temp.shift();
    //   search = temp.join('');
    //   this.findNextLetter(index, search);
    // }
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
    if (index[0] + 1 > 3 || index[0] - 1 < 0) {
      return false;
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
    if (index[0] + 1 > 3 || index[0] - 1 < 0) {
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
    if (index[0] + 1 > 3 || index[0] - 1 < 0) {
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
    if (index[0] + 1 > 3 || index[0] - 1 < 0) {
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
    if (index[0] + 1 > 3 || index[0] - 1 < 0) {
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
    if (index[0] + 1 > 3 || index[0] - 1 < 0) {
      return false;
    }
    if (this.boggleBoard[index[0] + 1][index[1] + 1] === letter) {
      return true;
    }
    return false;
  }
}

var game = new Boggle(4);

game.testing()
console.log(game.boggleBoard);
console.log(game.solve());
