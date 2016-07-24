var box=document.getElementsByClassName("box")[0];
var btnbox=document.getElementsByClassName("btnbox")[0];
var start=document.getElementsByClassName("start")[0];
var presh=document.getElementsByClassName("presh")[0];
var new1=document.getElementsByClassName("new1")[0];
var guanqia=document.getElementsByClassName("guanqia")[0];
box.onclick=function(){
	box.style.display="none";
	btnbox.style.display="block";
	guanqia.style.display="block";
	var scene =document.getElementById('scene');
	new game(scene);
}
new1.onclick=function(){
	location.reload();
}

var height=document.getElementsByClassName("height");
function game(scene){
	this.scene=scene;
	this.letter=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.letterArr=[];
	this.score=0;
	this.life=10;
	this.leve=1;
	this.speed=3;
	this.num=4;
	this.cw=document.documentElement.clientWidth;
	this.ch=document.documentElement.clientHeight;
	this.getLetter(4);
	this.play();
	this.key();
}

game.prototype.getLetter=function(num){
	if(num==0){
			return;
		}

	var that=this;

	//判断是否重复
	function check(let){
		for(var i=0;i<that.letterArr.length;i++){
			if(that.letterArr[i]==let){
				return true;
			}
		}
	}
	
	for(var i=0;i<num;i++){
		var img=document.createElement("img");
		var let=this.letter[Math.floor(Math.random()*this.letter.length)];
		while(check(let)){
			let=this.letter[Math.floor(Math.random()*this.letter.length)];
		}
		img.src="images/"+let+".png";
		img.className=let;
		img.style="position:absolute;left:"+(Math.random()*(this.cw-200)+100)+"px;top:"+(Math.random()*(-150)-50)+"px";
		this.scene.appendChild(img);
		this.letterArr.push(let);
	}
}

game.prototype.play=function(){
	var that=this;
	var letters=document.getElementsByTagName('img');
	var tt=setInterval(function(){
		for(var i=0;i<letters.length;i++){
			var tops=letters[i].offsetTop;
			letters[i].style.top=tops+that.speed+"px";
			if(tops>that.ch-120){
				for(var j=0;j<that.letterArr.length;j++){
					if(that.letterArr[j]==letters[i].className){
						that.letterArr.splice(j,1);
					}
				}
				letters[i].parentNode.removeChild(letters[i]);
				that.life--;
				height[1].innerHTML=that.life;
				if(that.life<=0){
					that.life=0;
					alert("GAME OVER");
					location.reload();
				}
				that.getLetter(1);
				letters[i]=null;
			}
		}
	},50)
	presh.onclick=function(){
		clearInterval(tt);
		start.style.display="block";
	}
	start.onclick=function(){
		start.style.display="none";
		tt=setInterval(function(){
			for(var i=0;i<letters.length;i++){
				var tops=letters[i].offsetTop;
				letters[i].style.top=tops+that.speed+"px";
				if(tops>that.ch-120){
					for(var j=0;j<that.letterArr.length;j++){
						if(that.letterArr[j]==letters[i].className){
							that.letterArr.splice(j,1);
						}
					}
					letters[i].parentNode.removeChild(letters[i]);
					that.life--;
					height[1].innerHTML=that.life;
					if(that.life<=0){
						that.life=0;
						alert("GAME OVER");
						location.reload();
					}
					that.getLetter(1);
					letters[i]=null;
				}
			}
		},50)
		// that.play();
	}
}
game.prototype.key=function(){
	var that=this;
	document.onkeydown=function(e){
		var ev= e||window.event;
		var k=String.fromCharCode(ev.keyCode);
		var kc=document.getElementsByClassName(k);
		var imgs1=document.getElementsByTagName("img");
		if(kc.length>0){
			kc[0].parentNode.removeChild(kc[0]);
			that.getLetter(1);
			that.score+=10;
			height[0].innerHTML=that.score;
			if(that.score>=100){
				alert("恭喜您顺利通关!");
				that.leve++;
				that.score=0;
				that.speed++;
				height[0].innerHTML=that.score;
				height[1].innerHTML=that.life;
				height[2].innerHTML=that.leve;
			}
			kc[0]=null;
		}
		for(var i=0;i<that.letterArr.length;i++){
			if(that.letterArr[i]==k){
				that.letterArr.splice(i,1);
			}
		}
	}
}