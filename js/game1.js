function game(scene){
	this.scene=scene;
	this.letter=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.letterArr=[];
	this.leve=1;
	this.score=0;
	this.life=10;
	this.num=5;
	this.speed=3;
	this.cw=document.documentElement.clientWidth;
	this.ch=document.documentElement.clientHeight;
	this.getLetter(5);
	this.play();
	this.key();
}
game.prototype.getLetter=function(num){
	if(num==0){
		return;
	}
	var that=this;
	function check(let){
		for(var i=0; i<that.letterArr.length;i++){
			if(let==that.letterArr[i]){
				return true;
			}
		}
	}
	for(var i=0;i<num;i++){
		var img=document.createElement("img");
		var let=that.letter[Math.floor(Math.random()*that.letter.length)];
		while(check(let)){
			let=that.letter[Math.floor(Math.random()*that.letter.length)];
		}
		img.className=let;
		img.src="images/"+let+".png";
		img.style.cssText="position:absolute;left:"+(Math.random()*(that.cw-200)+100)+"px;top:"+(Math.random()*(-150)-50)+"px";
		that.scene.appendChild(img);
		that.letterArr.push(let);
	}
}

game.prototype.play=function(){
	var that = this;
	setInterval(function(){
		var letters=document.getElementsByTagName('img');
		for(var i=0;i<letters.length;i++){
			var ltops=letters[i].offsetTop;
			letters[i].style.top=ltops+that.speed+"px";
			if(ltops>that.ch-100){
				for(var j=0;j<letters.length;j++){
					that.letterArr.splice(j,1);
				}
			letters[i].parentNode.removeChild(letters[i]);
			that.getLetter(1);
			letters[i]=null;
			}
		}
	},50)
}
game.prototype.key=function(){
	var that=this;
	document.onkeydown=function(e){
		var ev = e || window.event;
		var k=String.fromCharCode(ev.keyCode);
		var num1=document.getElementsByClassName(k);
		if(num1.length>0){
			for(i=0;i<that.letterArr.length;i++){
				if(that.letterArr[i]==k){
					that.letterArr.splice(i,1);
				}
				
			}
			num1[0].parentNode.removeChild(num1[0]);
			that.getLetter(1);
			num1[0]=null;
		}
	}
}