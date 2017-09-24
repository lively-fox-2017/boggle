class Boggle {
    constructor() {
        this.board = [];
    }

    randomAlph() {
        // let text = '';
        let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
}

let huruf = new Boggle

console.log(huruf.randomAlph())