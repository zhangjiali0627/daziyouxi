// var ks=document.getElementsByTagName("img")[0];
// animate(ks,{opacity:1});
// ks.onclick=function(){
//     animate(ks,{opacity:0},function(){
//         game();
//     });
// };
var ht=document.getElementsByClassName("height");
function game(scene){
	this.scene=scene;
	this.letter=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.letterArr=[];
	this.speed=3;
	this.num=4;
	this.leve=1;
	this.score=0;
	this.live=10;
	// this.cw=document.documentElement.clientWidth;
	// // console.log(this.cw);
	// this.ch=document.documentElement.clientHeight;
	// // console.log(this.ch);
	this.getLetter(4);
	this.play();
	this.key();
	

}
game.prototype.getLetter=function(num){
	var cw=document.documentElement.clientWidth;
	for(var i=0;i<num;i++){
		var img = document.createElement("img");
		var let=this.letter[Math.floor(Math.random()*this.letter.length)];
		// console.log(let);
		img.src="images/"+let+".png";
		img.className=let;
		// console.log(this.cw)
		img.style.cssText="position:absolute;left:"+((cw-150)*Math.random()+50)+"px;top:"+(-200*Math.random()-50)+"px";
		this.scene.appendChild(img);
		this.letterArr.push(let);
	}
}
game.prototype.play=function(){
	var that= this;
	setInterval(function(){
		// if(that.num>that.letterArr.length){
		// 	that.getLetter(that.num-that.letterArr.length);
		// }
		var ch=document.documentElement.clientHeight-100;
		var letters=document.getElementsByTagName('img');
		for(var i=0;i<letters.length;i++){
			var ltops=letters[i].offsetTop;
			letters[i].style.top=ltops+that.speed+"px";
			if(ltops>ch){
				var ln=letters[i].className;
				for(var j=0;j<that.letterArr.length;j++){
					if(that.letterArr[j]==ln){
						that.letterArr=that.letterArr.splice(j,1);
						
					}
				}
				that.scene.removeChild(letters[i]);
				that.getLetter(1);
				// console.log(letters[i]);
				letters[i]=null;
				that.live--;
				ht[1].innerHTML=that.live;
				if(that.live<=0){
					alert("GAME OVER");
					location.reload();
				}
			}
			console.log(that.letterArr.length);
		}
	},50);
}
game.prototype.key=function(){
	var that = this;
	document.onkeydown=function(e){
		var ev = e || window.event;
		var kc=String.fromCharCode(ev.keyCode);
		var now = that.scene.getElementsByClassName(kc);
		if(now.length>0){
			that.scene.removeChild(now[0]);
			now[0]=null;
			that.getLetter(1);
			for(var i=0;i<that.letterArr.length;i++){
				if(that.letterArr[i]==kc){
					that.letterArr=that.letterArr.splice(i,1);
				}
			}
			that.score++;
			ht[0].innerHTML=that.score;
			ht[2].innerHTML=Math.ceil(that.score/20);
			
		}
	}
}