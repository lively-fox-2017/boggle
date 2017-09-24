const data = require('./data');
const words = ["ABA","ABAD","BADAN", "BECAK"]
class Boggle {
    constructor(kata, num = 4) {
        this.kata = kata;
        this.num = num;
        this.board = this.shake(this.num)
        this.hasil = [];
        this.koordinat = [];
    }

    randomAlph() {
        // ini fungsi untuk memberikan huruf secara random
        // jumlah hurufnya satu
        let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    shake() {
        let arr = [];
        for (let i = 0; i < this.num; i++) {
            let temp = [];
            for (let j = 0; j < this.num; j++) {
                temp.push(this.randomAlph());
            }
            arr.push(temp);
        }
        this.board = arr
        // console.log(this.board)
        // return this.board;
        return this.board
    }

    cekHistory(col, row) {
        //  fungsi untuk mengecek apakah ada koordinat yang sama dengan yang sebelumnya
        // karena untuk menentukan ada atau tidaknya itu harus satu kali jalan gak boleh bolak balik
        for (var i = 0; i < this.koordinat.length; i++) {
            if (this.koordinat[i][0] == col && this.koordinat[i][1] == row) {
                return false;
            }
        }
        return true;
    }

    solved() {
       
    }

    cekArea(col, row, value) {
        for (var i = 0; i < 8; i++) {
            // looping ini berguna untuk pengecekkan kanan, kiri, atas, bawah dan diagonal
            // tiap indeksnya diasumsikan mewakili arah yang sedang dicek
            
            if (i == 0 && row - 1 > -1) {
                // ini kondisi ngecek atas, trus handle klo yang dicek itu gak ada koordinat
                //cek atas
                if (this.board[col][row - 1] == value && this.cekHistory(col, row - 1) == true) {
                    return this.koordinat.push([col, row - 1]);
                }
            }

            if (i == 1 && col + 1 < this.board.length && row - 1 > -1) {
                // ini kondisi ngecek kanan atas, trus handle klo yang dicek itu gak ada koordinat
                //cek kanan atas
                if (this.board[col + 1][row - 1] == value && this.cekHistory(col + 1, row - 1) == true) {
                    return this.koordinat.push([col + 1, row - 1]);
                }
            }

            if (i == 2 && col + 1 < this.board.length) {
                // ini kondisi ngecek kanan, trus handle klo yang dicek itu gak ada koordinat
                //cek kanan
                if (this.board[col + 1][row] == value && this.cekHistory(col + 1, row) == true) {
                    return this.koordinat.push([col + 1, row]);
                }
            }

            if (i == 3 && col + 1 < this.board.length && row + 1 < this.board.length) {
            // ini kondisi ngecek kanan bawah, trus handle klo yang dicek itu gak ada koordinat
            //cek kanan bawah
                if (this.board[col + 1][row + 1] == value && this.cekHistory(col + 1, row + 1) == true) {
                    return this.koordinat.push([col + 1, row + 1]);
                }
            }

            if (i == 4 && row + 1 < this.board.length) {
                // ini kondisi ngecek bawah, trus handle klo yang dicek itu gak ada koordinat
                //cek bawah
                if (this.board[col][row + 1] == value && this.cekHistory(col, row + 1) == true) {
                    return this.koordinat.push([col, row + 1]);
                }
            }

            if (i == 5 && col - 1 > -1 && row + 1 < this.board.length) {
                // ini kondisi ngecek kiri bawah, trus handle klo yang dicek itu gak ada koordinat
                //cek kiri bawah
                if (this.board[col - 1][row + 1] == value && this.cekHistory(col - 1, row + 1) == true) {
                    return this.koordinat.push([col - 1, row + 1]);
                }
            }

            if (i == 6 && col - 1 > -1) {
                // ini kondisi ngecek kiri, trus handle klo yang dicek itu gak ada koordinat
                //cek kiri
                if (this.board[col - 1][row] == value && this.cekHistory(col - 1, row) == true) {
                    return this.koordinat.push([col - 1, row]);
                }
            }

            if (i == 7 && col - 1 > -1 && row - 1 > -1) {
                // ini kondisi ngecek kiri atas, trus handle klo yang dicek itu gak ada koordinat
                //cek kiri atas
                if (this.board[col - 1][row - 1] == value && this.cekHistory(col - 1, row - 1) == true) {
                    return this.koordinat.push([col - 1, row - 1]);
                }
            }
        }
    }


}

let boggle1 = new Boggle(data, 5);
console.log(boggle1.shake());
// console.log(data)