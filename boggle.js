let data = require('./data.js').words
class Boggle {
    constructor(input) {
        // this.shook = [];
        this.hasil = [];
        this.coordinate = [];
        this.shook = this.shuffler();
        this.data = input

    }

    shuffler () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        let temp = [];

        for (let i=0; i<4; i++) {
            let temp2 = [];
            for (let j=0; j<4; j++) {
                let text = possible.charAt(Math.floor(Math.random() * possible.length));
                temp2.push(text)
            }
            temp.push(temp2)
        }
       return temp
    }

    solved () {
        for(var i = 0; i < this.data.length ; i++) {
            let flag = false
            for (var j = 0; j < this.shook.length; j++) {
                for (var k = 0; k < this.shook[j].length; k++) {
                    if (this.data[i][0] === this.shook[j][k]) {
                        this.coordinate = [[j,k]]
                        if(this.checkWord(this.data[i]) === true) {
                            this.hasil.push(this.data[i]);
                            flag = true
                            break
                        }
                    }
                }
                if(flag === true) {
                    break;
                }
            }
        }
        return this.hasil.join()
    }

    checkBox(col,row,value) {
        for(var i = 0; i < 8; i++) {
            if(i == 1 && row - 1 > -1) {
                if(this.shook[col][row-1] == value && this.checkHistory(col,row - 1) == true) {
                    return this.coordinate.push([col,row-1]);
                }
            }

            if(i == 2 && row - 1 > -1 && col+1 < this.shook.length) {
                if(this.shook[col + 1][row - 1] == value && this.checkHistory(col + 1,row-1) == true) {
                    return this.coordinate.push([col,row-1]);
                }
            }

            if(i == 3 && col + 1 > this.shook.length ) {
                if(this.shook[col + 1][row] == value && this.checkHistory(col + 1,row) == true) {
                    return this.coordinate.push([col + 1,row]);
                }
            }

            if(i == 4 && row + 1 > this.shook.length && col+1 < this.shook.length) {
                if(this.shook[col + 1][row + 1] == value && this.checkHistory(col + 1,row + 1) == true) {
                    return this.coordinate.push([col + 1,row + 1]);
                }
            }

            if(i == 5 && row + 1 > this.shook.length) {
                if(this.shook[col][row + 1] == value && this.checkHistory(col,row + 1) == true) {
                    return this.coordinate.push([col,row + 1]);
                }
            }

            if(i == 6 && col - 1 > -1 && row+1 < this.shook.length) {
                if(this.shook[col - 1][row + 1] == value && this.checkHistory(col - 1,row + 1) == true) {
                    return this.coordinate.push([col - 1,row + 1]);
                }
            }

            if(i == 7 && col - 1 > -1) {
                if(this.shook[col - 1][row] == value && this.checkHistory(col - 1,row) == true) {
                    return this.coordinate.push([col - 1,row]);
                }
            }

            if(i == 8 && col - 1 > -1 && row - 1 > -1) {
                if(this.shook[col - 1][row - 1] == value && this.checkHistory(col - 1,row - 1) == true) {
                    return this.coordinate.push([col - 1,row - 1]);
                }
            }
        }
    }

    checkHistory(col,row) {
        for(var i = 0; i < this.coordinate.length; i++) {
            if (col == this.coordinate[i][0] && row == this.coordinate[i][1]) {
                return false
            }
            return true
        }
    }

    checkWord(word) {
        for (var i=1; i<word.length; i++) {
            this.checkBox(this.coordinate[this.coordinate.length-1][0],this.coordinate[this.coordinate.length-1][1],word[i]);
          }
          if (this.coordinate.length === word.length) {
            return true;
          } else {
            return false;
          }
    }

    print() {
        console.log(this.hasil)
    }
}
let game = new Boggle(data)
// console.log(game.shuffler())
console.log(game.shook)
// game.shuffler()
game.solved()
game.print()