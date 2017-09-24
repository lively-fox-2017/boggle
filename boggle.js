class Boggle {
    constructor() {
        this.board = [];
    }

    randomAlph() {
        // ini fungsi untuk memberikan huruf secara random
        // jumlah hurufnya satu
        let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    shake(num) {
        let arr = [];
        for (let i = 0; i < num; i++) {
            let temp = [];
            for (let j = 0; j < num; j++) {
                temp.push(this.randomAlph());
            }
            arr.push(temp);
        }
        this.board = arr
        // console.log(this.board)
        // return this.board;
        return this.board
    }
}

let huruf = new Boggle

console.log(huruf.shake(4))