##JS2-for应用 
什么情况下用for?
重复执行某些代码且每次执行的时候，有个数字在变化。
2.具体实例分析
// 循环：
	var i = 0;
	for ( ; i<3; ) {
		alert(1);
		i++;
	}

 1) var i=0;

 2) i<3;			关键！！！！
 3) 括号里面的所有代码
 4) i++


for(var i=0; i<3; i++){
	 alert(i);
}
 alert(i);（显示为3）  
3.关于性能问题

	/*
		document.body.innerHTML += '<input type="button" value="按钮" />';
		document.body.innerHTML += '<input type="button" value="按钮" />';
		document.body.innerHTML += '<input type="button" value="按钮" />';
	*/
	
	// 性能有问题！！！
	
	var str = '';
	for( var i=0; i<6000; i++ ){
		// document.body.innerHTML += '<input type="button" value="按钮" />';
		str += '<input type="button" value="按钮" />';
	}
	
	document.body.innerHTML = str;  
4.计算元素坐标
 具体实例分析：
   var aDiv = document.getElementsByTagName('div');
	
	for( var i=0; i<11; i++ ){
		document.body.innerHTML += '<div>' + i + '</div>';
	}
	
	for( var i=0; i<aDiv.length; i++ ){
		aDiv[i].style.left = 10 + i*50 + 'px';
		aDiv[i].style.top = 10 + i*50 + 'px';
	}
	

