function Game () {
	this.arr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.imgs={
		A:"images/01.png",
		B:"images/02.png",
		C:"images/03.png",
		D:"images/04.png",
		E:"images/05.png",
		F:"images/06.png",
		G:"images/07.png",
		H:"images/08.png",
		I:"images/09.png",
		J:"images/10.png",
		K:"images/11.png",
		L:"images/12.png",
		M:"images/13.png",
		N:"images/14.png",
		O:"images/15.png",
		P:"images/16.png",
		Q:"images/17.png",
		R:"images/18.png",
		S:"images/19.png",
		T:"images/20.png",
		U:"images/21.png",
		V:"images/22.png",
		W:"images/23.png",
		X:"images/24.png",
		Y:"images/25.png",
		Z:"images/26.png",
	};
	this.num=3;
	this.letterarr=[];
	this.spanarr=[];
	this.clientW=document.documentElement.clientWidth;
	this.clientH=document.documentElement.clientHeight;
	this.t;
	this.speed=3;
	this.score=0;	
	this.currScore=0;	
	this.passScore=10;	
	this.life=5;		
	this.step=1;
	this.lifebox=$("#life")
	this.stepbox=$("#step")
	this.scorebox=$("#score")
	this.currScorebox=$("#currscore")
	this.alertbox=$("#alertbox")
	this.newalertbox=$("#newalertbox")[0]
	this.againbox=$(".alertleft")[0]
	this.closebox=$(".alertright")[0]
	this.newalertbox=$("#newalertbox")
	this.newcontend=$(".newcontend")[0]
	this.startbox=$(".startbox")[0]
	this.starts=$("#start")
	this.aboutgame=$("#aboutgame")
	this.gamecontent=$(".gamecontent")[0]
	this.closespans=$(".closespans")[0]
	this.falg=true;
	this.stops=$(".continue")[0]
	this.continues=$(".continue")[1]
	this.falg2=true;
	this.ongame=$(".ongame")[0]
	this.box=$(".box")[0]
	this.alertright=$(".alertright")
	this.back=$("#back")
}
Game.prototype={
	play:function(){
		var that=this;
		this.starts.onclick=function(){
			if (that.falg) {
				that.falg=false;
				that._createspan(that._getRand(that.arr,that.num))
				that._move();
				that._key()
				animate(that.startbox,{opacity:0})
				animate(that.back,{opacity:0})
				animate(that.ongame,{left:0,opacity:1},1000,Tween.Quad.easeOut)
				animate(that.box,{top:0},1000,Tween.Bounce.easeOut)
				that.startbox.style.display="none"
			};
		};
		this.stops.onclick=function(){
				that.falg2=true;
				clearInterval(that.t)
		}
		this.aboutgame.onclick=function(){
			animate(that.gamecontent,{opacity:1,height:400,zIndex:100})
			animate(that.startbox,{opacity:0,zIndex:0})
		}
		this.closespans.onclick=function(){
			animate(that.startbox,{opacity:1,zIndex:100})	
			animate(that.gamecontent,{opacity:0,height:0,zIndex:0})			
		}
		for (var i = 0; i < this.alertright.length; i++) {
			this.alertright[i].onclick=function(){
				that.newalertbox.style.display="none"
				clearInterval(that.t)
				for (var i = 0; i <that.spanarr.length; i++) {
					document.body.removeChild(that.spanarr[i])
				};
				that.currScore=0;	
				that.currScorebox.innerHTML=that.currScore;
				that.spanarr=[]	
				that.letterarr=[]	
				that.alertbox.style.display="none"
				that.startbox.style.display="block"
				animate(that.startbox,{opacity:1,zIndex:100})
				animate(that.back,{opacity:1})
				animate(that.ongame,{opacity:0,left:-500})
				animate(that.box,{top:-800})
				that.falg=true;
			}
		};
	},
	_getRand:function(arr,num){
		var newarr=[]	
		for (var i = 0; i <num; i++) {
			var letter=arr[Math.floor(Math.random()*arr.length)]
			while(this._checkletter(letter,this.letterarr)){	
				letter=arr[Math.floor(Math.random()*arr.length)]	
			}
			this.letterarr.push(letter)
			newarr.push(letter)			
		}
		return newarr;
	},
	_checkletter:function(val,arr){
		for (var i = 0; i < arr.length; i++) {
			if (arr[i]==val) {
				return true
			}
		}
		return false
	},
	_createspan:function(arr){
		var newarr=[]
		for (var i = 0; i < arr.length; i++) {
    		var sizes=Math.random()*10+30;
			var spans=document.createElement("span");
			spans.innerHTML="<img src="+this.imgs[arr[i]]+" width='80' height='80'>";							
			spans.letter=arr[i]		//给每个spans加一个属性(把span当做对象)
			var lefts=Math.floor(Math.random()*(this.clientW-400)+200)
			var tops=Math.floor(Math.random()*20+10);	
			while(this._checkPos(lefts,this.spanarr)){
				lefts=Math.floor(Math.random()*(this.clientW-400)+200)
			}
			spans.style.cssText="position:absolute;left:"+lefts+"px;top:"+tops+"px;width:"+sizes+"px;height:"+sizes+"px;border-radius:50%;line-height:"+sizes+"px;text-align:center;";
			this.spanarr.push(spans)
			newarr.push(spans)
			document.body.appendChild(spans)
		};
		return newarr;
	},
	_checkPos:function(ele,eleArr){
		for (var i = 0; i <eleArr.length; i++) {
			if (ele>eleArr[i].offsetLeft-80&&ele<eleArr[i].offsetLeft+80){
				return true;
			}
		};
		return false;
	},
	_move:function(){
		var that=this;
		this.t=setInterval(down,60)
		function down(){
			for (var i = 0; i < that.spanarr.length; i++) {
				var tops=that.spanarr[i].offsetTop+that.speed;
				that.spanarr[i].style.top=tops+"px";
				if (tops>that.clientH-100){			
					animate(that.spanarr[i],{opacity:0},300,function(){
						document.body.removeChild(this)
					})		
					that.letterarr.splice(i,1)
					that.spanarr.splice(i,1) 	 	
					that._createspan(that._getRand(that.arr,1))
					that.life--;
					that.lifebox.innerHTML=that.life;
					if (that.life<0) {
						that.lifebox.innerHTML=0;
						that.alertbox.style.display="block"						
						that.againbox.onclick=function(){
							location.reload()
							alertbox.style.display="none"
						}	
					};
				}				
			};
		}
		this.continues.onclick=function(){
			if (that.falg2) {
				that.falg2=false;
				that.t=setInterval(down,60);
			};
		}
	},
	_key:function(){
		var that=this;
		document.onkeydown=function(e){
			var e=e||window.event;	
			var letters=String.fromCharCode(e.keyCode);
			for (var i = 0; i <that.spanarr.length; i++) {	
				if (that.spanarr[i].letter==letters){			
					animate(that.spanarr[i],{opacity:0},300,function(){
						document.body.removeChild(this)
					})		
					that.letterarr.splice(i,1)
					that.spanarr.splice(i,1) 	 	
					that._createspan(that._getRand(that.arr,1))	
					that.score++;	
					that.currScore++;
					that.scorebox.innerHTML=that.score;
					that.currScorebox.innerHTML=that.currScore;	
					if (that.currScore%that.passScore==0) {
						newalertbox.style.display="block"
						clearInterval(that.t);
						for (var i = 0; i <that.spanarr.length; i++) {
							document.body.removeChild(that.spanarr[i])
						};
						that.currScore=0;	
						that.currScorebox.innerHTML=that.currScore;
						that.spanarr=[]	
						that.letterarr=[]					
						that.newcontend.onclick=function(){
							that.newalertbox.style.display="none"
							that.passScore+=5;	
							that.step++;		
							that.stepbox.innerHTML=that.step;		
							that.num++;	
							that.speed+=2;	 
							that._createspan(that._getRand(that.arr,that.num))
							that._move();
							that._key()
						};	 	
					}
				}
			}			
		}
	}
}