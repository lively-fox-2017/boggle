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

	// generate boggle board. row and col equal to rowXcol
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

	// print board to console
	printBoard() {
		console.log(this.board);
	}

	// find substring and word in dictionary
	// probably should add another method to built a proper data structur for dictionary
	// for faster searching
	search(substr) {
		// is substr have any match with 
		// first few letters of some words in dictionary?
		const partialSearch = (string) => {
			for (let i = 0; i < substr.length; i++) {
				if (substr[i] !== string[i]) return false;
			}
			return string;
		}

		// iterate every words in dictionary and find matching word
		// will return true if the substr is part of some words in dictionary
		// will return the word if the substr is a whole word that is available in dictionary
		for (let i = 0; i < this.dictLen; i++) {
			let searchResult = partialSearch(this.dict[i]);
			if (searchResult && substr === searchResult) return substr;//this.finalResults.push(substr);
			if (searchResult) return true;
		}

		return false;
	}

	// look for char next to current processed char 
	// vertically, horizontally, and diagonally
	// and check if the next position is not out of the boggle box
	// or has been found before
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

		// look on every direction, 
		// return the next position's coordinate if it is safe
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
			// look every direction, return [row, col]
			let safePoint = points[i](); 

			if (safePoint) {
				// if next position is safe, store the char in foundChar
				let foundChar = this.board[safePoint[0]][safePoint[1]]
				// search in the dictionary
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

	// backtrack implemetiation using loop to solve boggle
	findWord(startingPos) {
		let startPoint = 0;
		let foundPos = [startingPos];
		let chars = [this.board[startingPos[0]][startingPos[1]]];
		let prevPoints = [startPoint];

		while (true) {
			// base case to break the loop
			// if the search goes back to the first position, return false;
			if (foundPos.length < 1) return false;

			// currently processed char
			// use for searching the next char in every direction from it's position
			let currentPos = foundPos.slice(-1)[0];
			// stringify the array of char for dictionary search
			let word = chars.join('');
			// will return and object with information of the next char found
			let nextChar = this.lookClockwise(currentPos[0], currentPos[1], foundPos, word, startPoint);
			
			if (nextChar.found && 
				this.finalResults.indexOf(nextChar.found) === -1){
				// if currently processed char found it's neighbor
				// that if we string them together with previous found char
				// will match a word in dictionary
				// push to results
				this.finalResults.push(nextChar.found);
			} 
			if (nextChar) {
				// if currently processed char found it's neighbor that
				// if we string them together with previous found char
				// will match with a substring of a word in dictionary
				// store the char, position, and point (clock point)
				foundPos.push(nextChar.pos);
				chars.push(nextChar.char);
				prevPoints.push(nextChar.pointPos);

				startPoint = 0;
			} else {
				// if not, go back a step
				// start again with point + 1;
				let prevPos = foundPos.splice(-1)[0];
				let prevChar = chars.splice(-1)[0];

				startPoint = prevPoints.splice(-1)[0] + 1;
			}
		}
	}

	// find all the words! starting with one char at a time
	// iterate the board, every char will be the starting point
	// for findWord() function
	findAllWords() {
		for (let i = 0; i < this.rowXcol; i++) {
			for (let j = 0; j < this.rowXcol; j++) {
				this.findWord([i, j]);
			}
		}
		// call finish if the iteration is done
		this.finish();
	}

	// print result to console
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












