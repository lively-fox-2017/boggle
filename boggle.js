const words = require('./data.js');
const small_dict = ['ADD', 'ALL', 'AM', 'APP', 'CHALK', 'DARK', 'SACK', 'SAD', 'BAD', 'BALL'];
const mockBoard = [
					['A', 'C', 'V', 'O'],
					['R', 'S', 'L', 'M'],
					['E', 'D', 'A', 'L'],
					['N', 'H', 'C', 'K'],
				]

class Boggle {
	constructor(dict, rowXcol) {
		this.dict = dict;
		this.dictLen = dict.length;
		this.rowXcol = rowXcol;
		this.board = null;
		this.finalResults = [];
	}

	shake() {
		let board = [];

		for (let i = 0; i < this.rowXcol; i++) {
			let row = [];

			for (let j = 0; j < this.rowXcol; j++) {
				const randomChar = String.fromCharCode(Math.round(Math.random() * (90 - 65) + 65));
				row.push(randomChar);
			}

			board.push(row);
		}

		this.board = board;
	}

	printBoard() {
		console.log(this.board);
	}

	search(substr) {
		const partialSearch = (string) => {
			for (let i = 0; i < substr.length; i++) {
				if (substr[i] !== string[i]) return false;
			}
			return string;
		}

		for (let i = 0; i < this.dictLen; i++) {
			let searchResult = partialSearch(this.dict[i]);
			if (searchResult && substr === searchResult) return substr;//this.finalResults.push(substr);
			if (searchResult) return true;
		}

		return false;
	}

	lookClockwise(row, col, foundPos, prevWord, start) {
		const safetyCheck = (row, col) => {
			const isRowClear = row >= 0 && row < this.rowXcol;
			const isColClear = col >= 0 && col < this.rowXcol;
			const posClear = (() => {
				for (let i = 0; i < foundPos.length; i++) {
					if (row === foundPos[i][0] && col === foundPos[i][1]) {
						
						return false;
					}
				}
				return true;
			})();

			return isRowClear && isColClear && posClear ? true : false;
		}

		const lookN = () => {
			if (safetyCheck(row - 1, col)) {
				return [row - 1, col]
			}
			return false;
		};
		const lookNE = () => {
			if (safetyCheck(row - 1, col + 1)) {
				return [row - 1, col + 1]
			}
			return false; 
		}
		const lookE = ()  => {
			if(safetyCheck(row, col + 1)) {
				return [row, col + 1]
			}
			return false; 
		}
		const lookSE = () => {
			if (safetyCheck(row + 1, col + 1)) {
				return [row + 1, col + 1]
			}
			return false;
		}
		const lookS = () => {
			if(safetyCheck(row + 1, col)) {
				return [row + 1, col]
			}
			return false;
		}
		const lookSW = () => {
			if (safetyCheck(row + 1, col - 1)) {
				return [row + 1, col - 1]
			}
			return false;
		}
		const lookW = () => {
			if (safetyCheck(row, col - 1)) {
				return [row, col - 1]
			}
			return false;
		}
		const lookNW = () => {
			if (safetyCheck(row - 1, col - 1)) {
				return [row - 1, col - 1]
			}
			return false;
		}

		const points = [lookN, lookNE, lookE, lookSE, lookS, lookSW, lookW, lookNW];

		for (let i = start; i < points.length; i++) {
			let safePoint = points[i](); 
			if (safePoint) {
				let foundChar = this.board[safePoint[0]][safePoint[1]]
				let isInDictionary = this.search(prevWord + foundChar);
				if (isInDictionary && typeof isInDictionary === 'string') {
					return {
						char: foundChar,
						pos: safePoint,
						pointPos: i,
						found: isInDictionary
					}
				} else if (isInDictionary) {
					return {
						char: foundChar,
						pos: safePoint,
						pointPos: i,
						found: false
					}
				} 
			}
		}

		return false;
	}

	findWord(startingPos) {
		let startPoint = 0;
		let foundPos = [startingPos];
		let chars = [this.board[startingPos[0]][startingPos[1]]];
		let prevPoints = [startPoint];

		while (true) {
			if (foundPos.length < 1) return false;

			let currentPos = foundPos.slice(-1)[0];
			let word = chars.join('');
			let nextChar = this.lookClockwise(currentPos[0], currentPos[1], foundPos, word, startPoint);

			if (nextChar.found && 
				this.finalResults.indexOf(nextChar.found) === -1){
				this.finalResults.push(nextChar.found);
			} 

			if (nextChar) {
				foundPos.push(nextChar.pos);
				chars.push(nextChar.char);
				prevPoints.push(nextChar.pointPos);

				startPoint = 0;
			} else {
				let prevPos = foundPos.splice(-1)[0];
				let prevChar = chars.splice(-1)[0];

				startPoint = prevPoints.splice(-1)[0] + 1;
			}
		}
	}

	findAllWords() {
		for (let i = 0; i < this.rowXcol; i++) {
			for (let j = 0; j < this.rowXcol; j++) {
				this.findWord([i, j]);
			}
		}
		this.finish();
	}

	finish() {
		console.log('SOLVED');
		let resultLen = this.finalResults.length;
		if (resultLen === 1) {
			console.log(resultLen + ' word found:');
		} else if (resultLen > 1) {
			console.log(resultLen + ' words found:');
		} else {
			console.log('No word found');
		}
		this.finalResults.forEach(word => console.log(word));
	}

}

let game = new Boggle(words, 6);

game.shake();
game.printBoard();
game.findAllWords();












