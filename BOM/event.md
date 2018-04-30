
##EVENT
#1.焦点事件   
1.onfocus:当元素获取到焦点的时候触发  
2.onblur：当元素失去焦点的时候触发  
3.obj.focus()：给指定元素设置焦点  
4.obj.blur()：取消指定焦点  
5.obj.select()：选择指定的文本内容  
#2.event:事件对象
当一个事件发生的时候，和当前这个对象发生的这个事件有关的一些详细信息都会被临时保存到一个指定的地方-event对象，在需要的调用。（飞机-黑匣子）   

事件对象必须在一个事件调用的函数里面使用才有内容  
事件函数：事件调用函数，一个函数是不是事件函数，不在定义的决定，而是取决于这函数调用的时候
    
兼容：ie/chrome :event是一个内置全局对象 
	
	function fn1(){
		alert(event);
	}
	document.onclick = fn1;

标准下:事件对象是通过事件函数的第一个参数传入的（如果一个函数是被事件调用的那么这个函数定义的第一个参数就是事件对象）  
  
  	function fn1(ev){
		alert(ev);
	}
	document.onclick = fn1;  
#3.冒泡

1.事件冒泡：当一个元素接收到一个事件的时候，会把他接收到的事件传播给他的父级。一直到顶层window.事件冒泡机制  
2.阻止冒泡：当前要阻止冒泡的事件函数中调用event.cancelBubble = true;  

#4.事件绑定的第二种形式：  
 1.给是一个对象绑定一个事件处理函数的第一种形式：
	
	function fn1(){
	alert(1);
	}
	document.onclick = fn1;//是赋值形式，若绑定两个函数，则前面被覆盖
2.给一个对象绑定一个事件处理函数的第二种形式（给一个对象的同一个事件绑定多个不同的函数）：  
(1)ie：obj.attachEvent(事件名称，事件函数);   
[1].没有捕获  
[2].事件名称有on  
[3].事件函数的执行顺序：标准ie->正序   非标准ie->倒序  
*[4].this指向window
	
	function fn1(){
	alert(1);
	}
	function fn2(){
	alert(2);
	}
	document.attachEvent('onclick',fn1);
	documeny.attachEvent('onclick',fn2);
  
(2)标准：obj.addEventListener(事件名称,事件函数,是否捕获);  
是否捕获：默认是false false:冒泡 true:捕获  
[1].有捕获  
[2].事件名称没有on  
[3].事件函数执行的顺序是正序  
[4].this指向触发该事件的对象   

	function fn1(){
	alert(1);
	}
	function fn2(){
	alert(2);
	}
	document.addEventListener('click',fn1,false)
	document.addEventListener('click',fn2,false)  

#5.call:
函数下的一个方法，call方法的第一个参数可以改变函数执行过程中的内部this指向，call方法的第二个参数开始就是原来函数的参数列表  
1.
	
	function fn1(a,b){
	alert(this);
	alert(a+b);
	}
	fn1();//弹出window
	fn1.call(1,10,20);  //弹出1 再弹出30  fn1() == fbn.call()
2.
	
	document.attachEvent('onclick',function(){
		fn1.call(document);
	}); //this指向document 解决了指向window的问题

大结局：
	
	function fn1(){
			alert(1);
		}
		function bind(obj,evname,fn){
			if(obj.addEventListener){
				obj.addEventListener(evname,fn,false);
			}else{
				obj.attach('on'+evname,function(){
					obj.call(obj);
				})
			}
		}
		bind(document,'click',fn1);
#6.事件捕获
#7.事件函数的取消
1.第一种事件绑定形式的取消  
	
	function fn1(){
	alert(1);
	}
	document.onclick = fn1;
	document.onclick =  null;

1.第二种事件绑定形式的取消  
ie:obj.detachEvent(事件名称,事件函数);
标准:obj.removeEventListener(事件名称,事件函数);
	
	document.removeEventListener('click',fn1,false);    
#键盘事件 
1.onkeydown:当键盘按键按下的时候触发（如果按住不抬起会连续触发）  
2.onkeyup:当键盘按键抬起的时候触发  
3.
event.keyCode:数字类型 键盘按键的值 键值   
  ctrlKey,shiftKey,altKey --> 返回布尔值  
当一个事件发生的时候，如果ctrl||shift||alt是按下的状态，返回true,否则返回false  
	不是所有元素都能接收键盘事件，能够相应用户输入元素，即能够接收焦点的元素就能接收键盘事件
#事件默认行为：
当一个事件发生时浏览器自己默认做的事情  
怎么阻止？  
当前这个行为时什么事件触发的，然后再这个事件处理函数中使用return false;
1.oncontextmenu:右键菜单事件，当右键菜单（环境菜单）显示出来的时候触发  
#全局捕获
1.elem:setCapture():设置全局捕获  
当我们给一个元素设置全局捕获以后，那么这个元素会监听到后续发生的所有事件，当有事件发生的事件，就会被当前设置了全局捕获的元素所触发  
ie:有，并且有效果  
ff:有,但没有效果  
chrome:没有  
2.1.elem:releaseCapture():设置全局捕获   
#鼠标滚轮  
1.ie/chrome:onmousewheel   
	
	oDiv.onmousewheel = fn1;
	function fn(){
		alert(1);
	}
event.wheelDelta 上：120 下-120   
2.firefox:DOMMousseScroll 必须用addEventListener  
	
	if(oDiv.addEventListener){
	oDiv.addEventListener('DOMMousseScroll',fn,false);
	} 
event.detail 上：-3 下：3   

大结局 
	 
	function fn(ev){
	var ev = ev||event;
	var b = true;
	if(oDiv.onmousewheel){
	b = ev.wheelDelta>0?ture:flase;
	}else{
	b = ev.detail<0?ture:flase;
	}
	if(b){
		this.style.height = this.offsetHeight+10+'px';
	}else{
		this.style.height = this.offsetHeight-10+'px';
	}
	if(preventDefault){
	preventDefault();
	}
	return false;
	}  
return false阻止的时  obj.on事件名称 = fn所触发的默认行为  
addEventListener绑定的事件需要通过event下面的preventDefault();  
##cookie
存储数据，当用户访问某个网站（网页）的时候，我们就可以通过cookie来向访问者电脑上存储数据.  
1.不同浏览器存放的cookie位置不一样，也是不能通用的  
2.cookie的存储是以域名形式进行区分的  
3.cookie的数据可以设置名字
的:document.cookie = "名字=值";    
我们通过document.cookie来获取当前网站下的cookie的时候，得到字符串形式的值,他包含了当前下所有的cookie。它会把所有的k=cookie通过一个分号加空格的形式串起来  
4.一个域名下存放的cookie的个数是有限制的，不同的浏览器存放的个数不一样  
5.每一个cookie存放的内容大小也是有限制的，不同的浏览器存放的大小不一样  
如果我们想长时间存放cookie需要再设置这个cookie的时候设置一个过期的时间  ：document.cookie = '名称=值；expires='+字符串格式的时间；  
*cookie默认是临时存储的,关闭整个浏览器的时间自动销毁
	
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+5);
	document.cookie = 'username=leo;expires='+oDate.toGMTString();
*内容最好编码存放,encodeURI  
	 
	document.cookie = 'username='+encodeURI('leo/n你好')+';expires='+oDate.toGMTString();
	alert(decodeURI(document.cookie));  
获取单个元素值  
	
	//设置cookie
	function setCookie(key,value,t){
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+t);
	document.cookie = key + '=' + value +';expire=' + oDate.toGMTString();
	}
	//获取cookie
	function getCookie(key){
	var arr1 = document.cookie.split(';');
	for(var i = 0;i<arr1.length;i++){
		var arr2 = arr1.split('=');
		if(arr2[0] == key){
			return decodeURI(arr2[1]);
		}
	}
	}
	alert(getCookie('username'));
	//移除cookie
	function removeCookie(key){
	setCookie('key','',-1);
	}
	