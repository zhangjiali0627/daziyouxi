//1.解决类名的兼容函数
//classname: 所要找的类名
//father: 通过父元素来找这个类名

function getClass(classname,father){
 			father=father||document   //"或"运算,获取默认值
  	if(father.getElementsByClassName){		//检测浏览器类型
  		return father.getElementsByClassName(classname)		//火狐,谷歌
  		}
  	else{	//IE浏览器
  		var bq=father.getElementsByTagName("*")		//获得所有标签
  		var arr=[]	//新建数组
  		for(var i=0;i<bq.length;i++){	//遍历所有标签
  			if(check(bq[i].className,classname)){	//if语句引入判断类名函数
  				arr.push(bq[i])		//将标签赋值给数组
  				} 
  			}	return arr	//返回数组内标签
 		}
}

function check(bq,classname){
  		var newarr=bq.split(" ")   //将标签多类名拆分成数组
  		  for(var i=0;i<newarr.length;i++){	  
  		  	    if(newarr[i]==classname){	//遍历数组元素与类名比较
  		  	    	return true	  //返回为真
  		}
 	} return false	//返回为假
}

/*******************************************/
//2.纯文本的兼容函数(获取与设置)
//obj:对象
//val: 要设置的内容(纯文字) 

function getText(obj,val){
  if(val!=undefined){	//val不是空值,将val赋值给obj
  		if(obj.textContent){	//FF,chrome
  			obj.textContent=val;
  		}else{	  //IE
  			obj.innerText=val;
  		}

  }else{	//val是空值,获取obj的内容
  		if(obj.textContent){	//FF,chrome
  			return obj.textContent;
  		}else{	  //IE
  			return obj.innerText;
  		}
  }
}

/**********************************************/
//3. 获取样式的兼容函数
//obj: 对象
//attr: 属性

function getStyle(obj,attr){
  if(obj.currentStyle){
      return parseInt(obj.currentStyle[attr])
      //[attr]适用于对象的属性名中有引号出现
      //parseInt转换成数字,方便运算
  }else{
      return parseInt(getComputedStyle(obj,null)[attr])
  }
}

/**************************************************/
//4.获取元素的兼容函数
//selector:表示选择器，与css的选择器一样
//father: 父容器
/*$(".box")
$("#box")
$("div")*/

 
 function $(selector,father){
     father=father||document
     if(typeof selector=="string"){
        selector=selector.replace(/^\s*|\s*$/g,"");
                   //去除字符串左右的空格
            if(selector.charAt(0)=="."){   //类名
              return getClass(selector.substr(1),father);   //截取                                          
            }
            else if(selector.charAt(0)=="#"){   //id名
              return document.getElementById(selector.substr(1))
                  //个人觉得id父级只能是document   
            }
            else if(/^[a-zA-Z1-6]{1,6}$/.test(selector)){   //标签
                //^$表示从开头到结尾匹配,[]表示或,{}表示长度,text表示检测方法
              return father.getElementsByTagName(selector)
            }
     }else if(typeof selector=="function"){
        addEvent(window,"load",selector)
        }
     }

/**************************************************/
//5.获取子节点的兼容函数
//father:
//type:a类型,获取子元素集合,b类型,获取子元素和子文本集合
//注意获取的格式
//*变量参数不需要引号包括*
//*获取(".类名"),("#id")*

function getChild(father,type){
  type=type||"b"  //默认是元素节点+文本节点
  var all=father.childNodes;
  var arr=[]
  for (var i=0;i<all.length;i++) {
      if(type=="a"){  //元素节点
          if(all[i].nodeType==1){
            arr.push(all[i])
          }
      }else if(type=="b"){  //元素节点和文本节点
          if(all[i].nodeType==1||all[i].nodeType==3
              &&all[i].nodeValue.replace(/^\s*|\s*$/g,"")!=''){
                //当子节点的值清除左右空格后不是空文本
            arr.push(all[i])
          } 
      }                     
  }; return arr 
}

/**************************************************/
//6.获取子节点的第一个

function getFirstChild(father,type){
  return getChild(father,type)[0];
}

/**************************************************/
//7.获取子节点的最后一个

function getLastChild(father,type){
  return getChild(father,type)[getChild(father,type).length-1];
}

/**************************************************/
//8.通过指定下标来获取子节点中的一个

function getTeChild(father,type,num){
  return getChild(father,type)[num];
}

/**************************************************/
//9.获取上一个兄弟节点的兼容函数
//obj:一个元素节点

function getUp(obj){
  var up=obj.previousSibling
  if(up==null){
    return false
  }
  while(up.nodeType==8||(up.nodeType==3
    &&up.nodeValue.replace(/^\s*|\s*$/g,'')=="")){
        //当上一个节点是注释,或者是节点的值去除左右空格后是空文本
    up=up.previousSibling
    if(up=null){
      return false
    }
  }
  return up;
}

/**************************************************/
//10.获取下一个兄弟节点的兼容函数
//obj:一个元素节点

function getDown(obj){
  var down=obj.nextSibling
  if(down==null){
    return false
  }
  while(down.nodeType==8||(down.nodeType==3
    &&down.nodeValue.replace(/^\s*|\s*$/g,'')=="")){
        //当下一个节点是注释,或者是节点的值去除左右空格后是空文本
    down=down.nextSibling
    if(down=null){
      return false
    }
  }
  return down;
}

/**************************************************/
//11.在某个对象之后追加节点
//newobj:需要追加的节点
//beiobj:在这个节点后追加
//father:父节点

function insertAfter(newobj,beiobj,father){
      var nextobj=getDown(beiobj)
      if(nextobj){   //如果某节点的下一个节点不是空值
        var nextobj=getDown(beiobj);  
        return father.insertBefore(newobj,nextobj); //在nextobj之前追加节点
      }else{
        return father.appendChild(newobj); //在father中添加节点
      }

  }


/*************************************************************************************************************/

//2016.5.9
//12.事件绑定兼容函数
//event：事件
function addEvent(obj,event,fun){
  if(obj.addEventListener){//FF,Chrome
   return  obj.addEventListener(event,fun,false)
  }else{
    //IE
   // return obj.attachEvent("on"+event,function(){fun.call(obj);})
   return  obj.attachEvent("on"+event,fun)
  }
}

//13.删除绑定事件兼容函数
function deleteEvent(obj,event,fun){
  if(obj.removeEventListener){
    return  obj.removeEventListener(event,fun,false) 
  }else{
    return obj.detachEvent("on"+event,fun);
  }
}

/*************************************************************************************************************/
//2016.5.9
//14.滚轮事件
//obj:对象   up:向上的函数   down:向下的函数

function mouseWheel(obj,up,down){
  if(obj.attachEvent){
    obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
     }else if(obj.addEventListener){
     obj.addEventListener("mousewheel",scrollFn,false);
//chrome,safari -webkit-
     obj.addEventListener("DOMMouseScroll",scrollFn,false);
//firefox -moz-
}
function scrollFn(e){//处理程序
  var ev=e || window.event;//获取事件对象(scrollTn)
  //阻止浏览器的默认行为
   if (ev.preventDefault ){
    ev.preventDefault(); //阻止默认浏览器动作(W3C)
    }else{
    ev.returnValue = false;//IE中阻止函数器默认动作的方式
   }
  var val=ev.detail || ev.wheelDelta;//获取滚轮滚动方向
  if(val==-3 || val==120){
    if(up){
     up(); 
    }
    
  }else if(val==3 || val==-120){
    if(down){
      down();
    }
   
  }
}
}
/*************************************************************************************************************/
//2016.5.10
//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }

 /*****************************************************************************************************/
 //2016.5.11
 //16.事件对象阻止浏览器默认行为

 function evStop(e){
  var ev=e||window.event;
  if (ev.preventDefault ){
     ev.preventDefault(); //阻止默认浏览器动作(W3C)
  }else{
     ev.returnValue = false;//IE中阻止函数器默认动作的方式
 }
}
