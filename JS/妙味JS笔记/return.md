##关于return
1）函数名+括号:fn1()  ==>return 后面的值；  
2）所有函数默认返回值：未定义；  
3）return 后面任何代码都不执行了；    
1.

	function fn2(b){
	return function(a){
	alert(a+b);
	}
	}
	fn2(20)(10); ==》30  
2.

	function fn3(){
	return window;
	}
	fn3().onload =function(){
	document.body.innerHtML = 123;
	}   ==>123
小实例：获取元素

	1.获取Id
	function getId(id){
	return document.getElementById(id);
	}
	getId('btn1').onclick = function(){
	alert(getId('div1').innerHTML); ==>被命名为div1的元素中的内容
	}

	2.数组的存贮
	function fn1(n){
	var arr = [];
	for(var i=0;i<=n;i++){
	arr.push(i);
	}
	return arr;
	}
	fn(5);   ==>[0,1,2,3,4,5]

