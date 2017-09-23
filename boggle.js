class Boggle{
	constructor(words){
		this.arrBoard = [];
		// this.arrBoard = [['A','K','Z','T'], ['A','R','S','S'], ['S','S','S','A'], ['A','A','S','S']];
		this.alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		this.words = words;
		this.result = [];
	}
	// Untuk memastikan bahwa inputan yang terbaca itu huruf kapital semua
	upperCase(){
		for (let i = 0; i < this.words.length; i++) {
			this.words[i].toUpperCase();
		}
	}
	// Untuk membuat Board dengan huruf acak
	shake(dimensi){
		for (let row = 0; row < dimensi; row++) {
			let arrTemp = [];
			for (let col = 0; col < dimensi; col++) {
				arrTemp.push(this.alpha[Math.floor(Math.random() * 26)]);
			}
			
			this.arrBoard.push(arrTemp);
		}
		
		console.log(this.arrBoard);
	}
	
	solve(){
		this.upperCase();
		// Perulangan untuk kata dalam kamus
		for (let i = 0; i < this.words.length; i++) {
			let num = 0; // variable untuk menampung indeks kata
			let arrTemp = []; // variable untuk menampung backtrack / pengecekan kebelakang
			let arrWordsTemp = []; // variable untuk menampung tiap huruf yang sama dengan huruf pada kata dalam kamus
			let arrTampungHuruf = []; // variable untuk menampung huruf yang di ubah menjadi 0
			let end = false; // variable untuk kondisi bila kata dalam board suda sesuai dengan kata pada kamus / membatasi biar huruf terakhir yang sama pada board tidak terinput
			// perulangan untuk pengecekan baris board
			for (let row = 0; row < this.arrBoard.length; row++) {
				let col = 0;
				let ban = "";
				// perulangan untuk pengecekan kolom board
				while (col < this.arrBoard.length) {
					// kondisi untuk huruf pada board yang sama dengan huruf pada kata dalam kamus
					if (this.arrBoard[row][col] === this.words[i][num] && end === false) {
						arrTemp.push([row, col, num, ban]);
						arrWordsTemp.push(this.arrBoard[row][col]);
						if (num < this.words[i].length - 1) {
							num++;
							// pengecekan huruf selanjutnya ke kanan
							if (col !== this.arrBoard.length - 1 && this.arrBoard[row][col + 1] === this.words[i][num] && arrTemp[arrTemp.length - 1][3] !== "kanan") {
								ban = "kiri";
								col++;
							} 
							// pengecekan huruf selanjutnya ke kanan bawah
							else if (col !== this.arrBoard.length - 1 && row !== this.arrBoard.length - 1 && this.arrBoard[row + 1][col + 1] === this.words[i][num] && arrTemp[arrTemp.length - 1][3] !== "kananbawah") {
								ban = "kiriatas";
								col++;
								row++;
							} 
							// pengecekan huruf selanjutnya ke bawah
							else if (row !== this.arrBoard.length - 1 && this.arrBoard[row + 1][col] === this.words[i][num] && arrTemp[arrTemp.length - 1][3] !== "bawah") {
								ban = "atas";
								row++;
							} 
							// pengecekan huruf selanjutnya ke kiri bawah
							else if (row !== this.arrBoard.length - 1 && col !== 0 && this.arrBoard[row + 1][col - 1] === this.words[i][num] && arrTemp[arrTemp.length - 1][3] !== "kiribawah") {
								ban = "kananatas";
								col--;
								row++;
							} 
							// pengecekan huruf selanjutnya ke kiri
							else if (col !== 0 && this.arrBoard[row][col - 1] === this.words[i][num] && arrTemp[arrTemp.length - 1][3] !== "kiri") {
								ban = "kanan";
								col--;
							} 
							// pengecekan huruf selanjutnya ke kiri atas
							else if (row !== 0 && col !== 0 && this.arrBoard[row - 1][col - 1] === this.words[i][num] && arrTemp[arrTemp.length - 1][3] !== "kiriatas") {
								ban = "kananbawah";
								col--;
								row--;
							} 
							// pengecekan huruf selanjutnya ke atas
							else if (row !== 0 && this.arrBoard[row - 1][col] === this.words[i][num] && arrTemp[arrTemp.length - 1][3] !== "atas") {
								ban = "bawah";
								row--;
							} 
							// pengecekan huruf selanjutnya ke kanan atas
							else if (row !==0 && col !== this.arrBoard.length - 1 && this.arrBoard[row - 1][col + 1] === this.words[i][num] && arrTemp[arrTemp.length - 1][3] !== "kananatas") {
								ban = "kiribawah";
								col++;
								row--;
							} 
							// jika tidak ada huruf berikutnya di semua arah
							else {
								arrTampungHuruf.push([arrTemp[arrTemp.length - 1][0], arrTemp[arrTemp.length - 1][1], this.arrBoard[arrTemp[arrTemp.length - 1][0]][arrTemp[arrTemp.length - 1][1]]]);
								this.arrBoard[arrTemp[arrTemp.length - 1][0]][arrTemp[arrTemp.length - 1][1]] = "0";
								arrTemp.pop();
								arrWordsTemp.pop();
								// kondisi jika variable penampung pengecekan kebelakang tidak kosong
								if (arrTemp.length !== 0) {
									row = arrTemp[arrTemp.length - 1][0];
									col = arrTemp[arrTemp.length - 1][1];
									num = arrTemp[arrTemp.length - 1][2];
									ban = arrTemp[arrTemp.length - 1][3];
									arrTemp.pop();
									arrWordsTemp.pop();
								} else {
									num = 0;
								}
							}
						} else {
							end = true;
							col++;
						}
					} else {
						col++;
					}
				}
			}
			
			if (arrWordsTemp.length !== 0) {
				arrWordsTemp = arrWordsTemp.join("");
				this.result.push(arrWordsTemp);
			}
			
			if (arrTampungHuruf.length !== 0) {
				for (let t = 0; t < arrTampungHuruf.length; t++) {
					this.arrBoard[arrTampungHuruf[t][0]][arrTampungHuruf[t][1]] = arrTampungHuruf[t][2];
				}
			}
		}
		
		if (this.result.length < 1) {
			console.log("No Word Found");
		} else if (this.result.length > 1) {
			console.log("\n"+this.result.length +" Words Found : \n");
			console.log(this.result.join("\n"));
		} else {
			console.log("\n"+this.result.length +" Word Found : \n");
			console.log(this.result.join(""));
		}
	}
}

// var words = require('./data');
let words = ["ABA","ABADI","ABAH","AKA","JOB","GET","BOBO","ZEBRA"];
  
let game = new Boggle(words);

game.shake(6);
game.solve();