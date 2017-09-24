'use strict'

class Boggle{
	constructor(words){
		this.arrBoard = [];
		// this.arrBoard = [
						// [['Q',true],['R',true],['A',true],['S',true]], 
						// [['Z',true],['M',true],['R',true],['T',true]], 
						// [['R',true],['A',true],['A',true],['A',true]], 
						// [['X',true],['Q',true],['T',true],['E',true]]
						// ];
		this.alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-";
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
				arrTemp.push([this.alpha[Math.floor(Math.random() * 27)]]);
			}
			
			this.arrBoard.push(arrTemp);
		}
		
		console.log(this.arrBoard);
	}
	
	pushTrue(){
		for (let j = 0; j < this.arrBoard.length; j++) {
			for (let k = 0; k < this.arrBoard.length; k++){
				this.arrBoard[j][k].push(true);
			}
		}
	}
	
	solve(){
		this.upperCase();
		this.pushTrue();
		// Perulangan untuk kata dalam kamus
		for (let i = 0; i < this.words.length; i++) {
			let num = 0; // variable untuk menampung indeks kata
			let arrTemp = []; // variable untuk menampung backtrack / pengecekan kebelakang
			let arrWordsTemp = []; // variable untuk menampung tiap huruf yang sama dengan huruf pada kata dalam kamus
			let end = false; // variable untuk kondisi bila kata dalam board suda sesuai dengan kata pada kamus / membatasi biar huruf terakhir yang sama pada board tidak terinput
			// perulangan untuk pengecekan baris board
			for (let row = 0; row < this.arrBoard.length; row++) {
				let col = 0;
				// perulangan untuk pengecekan kolom board
				while (col < this.arrBoard.length) {
					// kondisi untuk huruf pada board yang sama dengan huruf pada kata dalam kamus
					if (this.arrBoard[row][col][0] === this.words[i][num] && end === false) {
						arrTemp.push([row, col, num]);
						arrWordsTemp.push(this.arrBoard[row][col][0]);
						this.arrBoard[row][col][1] = false;
						if (num < this.words[i].length - 1) {
							num++;
							// pengecekan huruf selanjutnya ke kanan
							if (col !== this.arrBoard.length - 1 && this.arrBoard[row][col + 1][0] === this.words[i][num] && this.arrBoard[row][col + 1][1]) {
								col++;
							} 
							// pengecekan huruf selanjutnya ke kanan bawah
							else if (col !== this.arrBoard.length - 1 && row !== this.arrBoard.length - 1 && this.arrBoard[row + 1][col + 1][0] === this.words[i][num] && this.arrBoard[row + 1][col + 1][1]) {
								col++;
								row++;
							} 
							// pengecekan huruf selanjutnya ke bawah
							else if (row !== this.arrBoard.length - 1 && this.arrBoard[row + 1][col][0] === this.words[i][num] && this.arrBoard[row + 1][col][1]) {
								// ban = "atas";
								row++;
							} 
							// pengecekan huruf selanjutnya ke kiri bawah
							else if (row !== this.arrBoard.length - 1 && col !== 0 && this.arrBoard[row + 1][col - 1][0] === this.words[i][num] && this.arrBoard[row + 1][col - 1][1]) {
								col--;
								row++;
							} 
							// pengecekan huruf selanjutnya ke kiri
							else if (col !== 0 && this.arrBoard[row][col - 1][0] === this.words[i][num] && this.arrBoard[row][col - 1][1]) {
								col--;
							} 
							// pengecekan huruf selanjutnya ke kiri atas
							else if (row !== 0 && col !== 0 && this.arrBoard[row - 1][col - 1][0] === this.words[i][num] && this.arrBoard[row - 1][col - 1][1]) {
								col--;
								row--;
							} 
							// pengecekan huruf selanjutnya ke atas
							else if (row !== 0 && this.arrBoard[row - 1][col][0] === this.words[i][num] && this.arrBoard[row - 1][col][1]) {
								row--;
							} 
							// pengecekan huruf selanjutnya ke kanan atas
							else if (row !==0 && col !== this.arrBoard.length - 1 && this.arrBoard[row - 1][col + 1][0] === this.words[i][num] && this.arrBoard[row - 1][col + 1][1]) {
								col++;
								row--;
							} 
							// jika tidak ada huruf berikutnya di semua arah
							else {
								arrTemp.pop();
								arrWordsTemp.pop();
								// kondisi jika variable penampung pengecekan kebelakang tidak kosong
								if (arrTemp.length !== 0) {
									row = arrTemp[arrTemp.length - 1][0];
									col = arrTemp[arrTemp.length - 1][1];
									num = arrTemp[arrTemp.length - 1][2];
									arrTemp.pop();
									arrWordsTemp.pop();
								} else {
									num = 0;
									col++;
									for (let j = 0; j < this.arrBoard.length; j++) {
										for (let k = 0; k < this.arrBoard.length; k++){
											if (!this.arrBoard[j][k][1]) {
												this.arrBoard[j][k][1] = true;
											}
										}
									}
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
			// Untuk mereset semua menjadi true jika kata sudah / tidak di temukan
			for (let j = 0; j < this.arrBoard.length; j++) {
				for (let k = 0; k < this.arrBoard.length; k++){
					if (!this.arrBoard[j][k][1]) {	
						this.arrBoard[j][k][1] = true;
					}
				}
			}
		}
		
		if (this.result.length < 1) {
			console.log("\nNo Word Found");
		} else if (this.result.length > 1) {
			console.log("\n"+this.result.length +" Words Found : \n");
			console.log(this.result.join("\n"));
		} else {
			console.log("\n"+this.result.length +" Word Found : \n");
			console.log(this.result.join(""));
		}
	}
}

let words = require('./data');
  
let game = new Boggle(words);

game.shake(5);
game.solve();