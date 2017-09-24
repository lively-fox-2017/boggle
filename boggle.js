class Boggle {
    constructor() {
        this.board = [];
        this.history = [];
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
        return [['Z', 'B', 'O', 'Q'], ['A', 'C', 'E', 'Y'], ['K', 'L', 'U', 'B'], ['V', 'A', 'T', 'X']]
    }

    cekIndex(idx1, idx2) {
        if (Math.abs(idx1[0] - idx2[0]) === 1 || Math.abs(idx1[1] - idx2[1]) === 1) {
            return true
        } else {
            return false
        }
    }

    cekKata() {
        // perlu membuat yang namanya history
    }
}

let huruf = new Boggle

console.log(huruf.shake(4))
console.log(huruf.cekIndex([1,1], [1,1]))
console.log(huruf.cekIndex([1, 1], [1, 2]))
console.log(huruf.cekIndex([1, 2], [1, 3]))
console.log(huruf.cekIndex([0, 1], [1, 2]))