'use strict'
const data=require('./data');
class Boggle{
	constructor(row,col){
		this.col=col;
		this.row=row;
		this.arr_board=[];
		this.str='';
		this.arr_huruf=[];
		this.arr_pos=[];
		this.hasil=[];
	}
	shake(){
		let huruf='ABCDEFGHIJKLMNOPQRSTU';
		let huruf_acak=huruf.charAt(Math.floor(Math.random()*huruf.length));
		return huruf_acak;
	}
	solve(){
		var kata_ditemukan=0;
		var lib=data;
		var panjang_lib=lib.length;
		var index=[];
		for(let i=0;i<panjang_lib;i++){
			let kata=lib[i];
			this.cek_kata(kata);
		}
		let len_hasil=this.hasil.length;
		if(len_hasil!=0){
			console.log("\nBuggle : "+this.row+" X "+this.col);
			console.log("solve()");
			console.log(len_hasil+" found :");
			for(let i=0;i<len_hasil;i++){
				console.log("- "+this.hasil[i]);
			}
		}
	}
	board(){
		let count=0;
		for(let row=0;row<this.row;row++){
			this.arr_board.push([]);
			for(let col=0;col<this.col;col++){
				this.arr_board[row].push(this.shake());
			}
		}
		// console.log(data.join(', ')+"\n");
		return this.arr_board;
	}
	cek_kata(kata){
		for(let row=0;row<this.row;row++){
			for(let col=0;col<this.col;col++){
				if(kata[0]==this.arr_board[row][col]){
					let len=kata.length;
					let count=0;
					let pos=row+''+col;
					this.arr_pos.push(row+''+col);
					this.cek_huruf(kata,len,count);
				}
			}
		}
	}
	cek_huruf(kata,len,count){
		if(count==len){
			return 0;
		}else{
			var pos=this.arr_pos[this.arr_pos.length-1];
			var row=parseInt(pos[0]);
			var col=parseInt(pos[1]);

			var huruf_selanjutnya=kata[count+1];
			var huruf_depan=this.arr_board[row][col+1];
			var huruf_belakang=this.arr_board[row][col-1];
			if((row+1) > this.row-1){
				var huruf_bawah=undefined;
			}else{
				var huruf_bawah=this.arr_board[row+1][col];
				var huruf_belakang_bawah=this.arr_board[row+1][col-1];
				var huruf_depan_bawah=this.arr_board[row+1][col+1];
			}
			if((row-1) < 0){
				var huruf_atas=undefined;
			}else{
				var huruf_atas=this.arr_board[row-1][col];
				var huruf_belakang_atas=this.arr_board[row-1][col-1];
				var huruf_depan_atas=this.arr_board[row-1][col+1];
			}
			if(huruf_belakang!=undefined && huruf_belakang_bawah!=undefined && huruf_belakang_atas!=undefined && huruf_depan!=undefined && huruf_atas!=undefined && huruf_bawah!=undefined && huruf_depan_atas!=undefined && huruf_depan_bawah!=undefined){
				if(huruf_selanjutnya==huruf_depan){
					let pos=row+''+(col+1);
					if(this.arr_pos.indexOf(pos)==-1){
						this.arr_pos.push(pos);
					}
					if(this.arr_pos.length==kata.length){
						var str=''
						for(let i=0;i<this.arr_pos.length;i++){
							let pos=this.arr_pos[i];
							let row=pos[0];
							let col=pos[1];
							str+=this.arr_board[row][col];
						}
						if(str==kata){
							this.hasil.push(str);
						}
					}
					return this.cek_huruf(kata,len,count+1);
				}else if(huruf_selanjutnya==huruf_depan_atas){
					let pos=(row-1)+''+(col+1);
					if(this.arr_pos.indexOf(pos)==-1){
						this.arr_pos.push(pos);
					}
					if(this.arr_pos.length==kata.length){
						var str=''
						for(let i=0;i<this.arr_pos.length;i++){
							let pos=this.arr_pos[i];
							let row=pos[0];
							let col=pos[1];
							str+=this.arr_board[row][col];
						}
						if(str==kata){
							this.hasil.push(str);
						}
					}
					return this.cek_huruf(kata,len,count+1);
				}else if(huruf_selanjutnya==huruf_depan_bawah){
					let pos=(row+1)+''+(col+1);
					if(this.arr_pos.indexOf(pos)==-1){
						this.arr_pos.push(pos);
					}
					if(this.arr_pos.length==kata.length){
						var str=''
						for(let i=0;i<this.arr_pos.length;i++){
							let pos=this.arr_pos[i];
							let row=pos[0];
							let col=pos[1];
							str+=this.arr_board[row][col];
						}
						if(str==kata){
							this.hasil.push(str);
						}
					}
					return this.cek_huruf(kata,len,count+1);
				}else if(huruf_selanjutnya==huruf_bawah){
					let pos=(row+1)+''+col;
					if(this.arr_pos.indexOf(pos)==-1){
						this.arr_pos.push(pos);
					}
					if(this.arr_pos.length==kata.length){
						var str=''
						for(let i=0;i<this.arr_pos.length;i++){
							let pos=this.arr_pos[i];
							let row=pos[0];
							let col=pos[1];
							str+=this.arr_board[row][col];
						}
						if(str==kata){
							this.hasil.push(str);
						}
					}
					return this.cek_huruf(kata,len,count+1);
				}else if(huruf_selanjutnya==huruf_atas){
					let pos=(row-1)+''+col;
					if(this.arr_pos.indexOf(pos)==-1){
						this.arr_pos.push(pos);
					}
					if(this.arr_pos.length==kata.length){
						var str=''
						for(let i=0;i<this.arr_pos.length;i++){
							let pos=this.arr_pos[i];
							let row=pos[0];
							let col=pos[1];
							str+=this.arr_board[row][col];
						}
						if(str==kata){
							this.hasil.push(str);
						}
					}
					return this.cek_huruf(kata,len,count+1);
				}else if(huruf_selanjutnya==huruf_belakang){
					let pos=row+''+(col-1);
					if(this.arr_pos.indexOf(pos)==-1){
						this.arr_pos.push(pos);
					}
					if(this.arr_pos.length==kata.length){
						var str=''
						for(let i=0;i<this.arr_pos.length;i++){
							let pos=this.arr_pos[i];
							let row=pos[0];
							let col=pos[1];
							str+=this.arr_board[row][col];
						}
						if(str==kata){
							this.hasil.push(str);
						}
					}
					return this.cek_huruf(kata,len,count+1);
				}else if(huruf_selanjutnya==huruf_belakang_atas){
					let pos=(row-1)+''+(col-1);
					if(this.arr_pos.indexOf(pos)==-1){
						this.arr_pos.push(pos);
					}
					if(this.arr_pos.length==kata.length){
						var str=''
						for(let i=0;i<this.arr_pos.length;i++){
							let pos=this.arr_pos[i];
							let row=pos[0];
							let col=pos[1];
							str+=this.arr_board[row][col];
						}
						if(str==kata){
							this.hasil.push(str);
						}
					}
					return this.cek_huruf(kata,len,count+1);
				}else if(huruf_selanjutnya==huruf_belakang_bawah){
					let pos=(row+1)+''+(col-1);
					if(this.arr_pos.indexOf(pos)==-1){
						this.arr_pos.push(pos);
					}
					if(this.arr_pos.length==kata.length){
						var str=''
						for(let i=0;i<this.arr_pos.length;i++){
							let pos=this.arr_pos[i];
							let row=pos[0];
							let col=pos[1];
							str+=this.arr_board[row][col];
						}
						if(str==kata){
							this.hasil.push(str);
						}
					}
					return this.cek_huruf(kata,len,count+1);
				}else{
					this.arr_pos=[];
				}
			}
		}
	}
}
var boggle=new Boggle(4,4);
console.log(boggle.board());
boggle.solve();
// module.exports = boggle;