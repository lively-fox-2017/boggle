"use strict"

class Boggle {

  constructor(dictionary, boggleArr = []) {

    this.boggleArr  = boggleArr;
    this.dictionary = dictionary;
    this.visited    = [];

  }

  /**
   *
   * shake(size)
   *
   * Generates random chars and push it to
   * this.boggleArr
   *
   */

  shake(size) {

    // Generate boggle structure
    for (let i = 0; i < size; i++) {

      this.boggleArr.push([]);

      // Generate boggleArr from randomCharCode (65-90, A-Z)
      for (let j = 0; j < size; j++) {

        let randomCharCode = Math.floor(Math.random() * (90 - 65) + 65);

        this.boggleArr[i].push(String.fromCharCode(randomCharCode));

      }

    }

    return true;

  }

  /**
   *
   * finder(word)
   *
   * Find word in this.boggleArr
   *
   */

  finder(word, indexList = []) {

    if (word.length === 0) {
      return true;
    }

    let startFrom = word[0];
    let next = word[1] || null;
    let indexes = indexList;

    if (!indexes.length) {
      // Generate indexes of startFrom
      for (let row = 0; row < this.boggleArr.length; row++) {

        for (let col = 0; col < this.boggleArr.length; col++) {

          if (this.boggleArr[row][col] === startFrom) {

            indexes.push([row, col]);

          }

        }

      }
    }

    for (let i = 0; i < indexes.length; i++) {

      let row = indexes[i][0];
      let col = indexes[i][1];
      let surroundings = [];
      let top = this.boggleArr[row - 1];
      let right = this.boggleArr[row][col + 1];
      let bottom = this.boggleArr[row + 1];
      let left = this.boggleArr[row][col - 1];

      // If top exist
      if (top) {

        // Top
        surroundings.push(top[col]);

        // If left exist
        if (left)
          surroundings.push(top[col - 1]);

        // If right exist
        if (right)
          surroundings.push(top[col + 1]);

      }

      // If left exist
      if (left)
        surroundings.push(left);

      // If right exist
      if (right)
        surroundings.push(right);

      // If bottom exist
      if (bottom) {

        // Bottom
        surroundings.push(bottom[col]);

        // If left exist
        if (left)
          surroundings.push(bottom[col - 1]);

        // If right exist
        if (right)
          surroundings.push(bottom[col + 1]);

      }

      // If found in surroundings
      if (surroundings.indexOf(next) !== -1) {

        surroundings = [];

        return this.finder(word.slice(1), []);

      } else {

        surroundings = [];

        continue;

      }

    }

    return false;

  }

  /**
   *
   * solve()
   *
   * Solve the boggle, find words from
   * this.dictionary in this.boggleArr
   *
   */

  solve() {

    let counter = 0;
    let foundWords = [];

    for (let i = 0; i < this.dictionary.length; i++) {

      if (this.finder(this.dictionary[i])) {



      }

    }

  }

}

let dictionary = ['ABAD', 'ABADI', 'ABRASI', 'DASI'];

let staticBoggle = [

  ['A', 'B', 'Z', 'X'],
  ['R', 'A', 'A', 'T'],
  ['N', 'D', 'S', 'M'],
  ['P', 'X', 'I', 'V']

];

let game = new Boggle(dictionary);

game.shake(4);

console.log(game.boggleArr);
