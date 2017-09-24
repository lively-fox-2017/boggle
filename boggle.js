var data = ["ABA","ABAD","ABADI","ABAH","ABAI","ABAL","ABANG","ABANGAN","ABDI","ABDIKASI","ABDOMEN","ABDOMINAL","ABDUKSI"]
// Release 0
class boggle {
    constructor() {
        this.board = [];
        this.saver =  this.shake(this.ukuran);
    }

    acakHuruf() {
        var text = '';
        var huruf = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < 1; i++) {
            text = huruf.charAt(Math.floor(Math.random() * huruf.length));
        }
        return text;
    }

    shake(num){
        let array = [];
        for (let i = 0; i < num; i++) {
            let temp = [];
            for (let j = 0 ; j < num ; j++) {
                temp.push(this.acakHuruf());
            }
            array.push(temp);
        }
        this.board = array
        return this.board;
    }

    checkarea (row, col, value) {
        var rowcorner = 0;
        var rowcorner = 0;
        var colcorner = 0;

        while (row >= rowcorner + 3) {
            rowcorner++;
        }
        while (col >= colcorner + 3) {
            colcorner++;
        }
        for (var i = 0; i < rowcorner; i++) {
            for (var j = 0; j < colcorner; j++) {
                if (board[i][j] == value) {
                    return true;
                }
            }
        }
        return false;
    }
}
var game = new boggle();
console.log(game.shake(4));
