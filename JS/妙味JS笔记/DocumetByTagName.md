## document.getElementsByTagName  
### 一.document.getElementsByTagName和document.getElementsById的区别

#### 1.document.getElementsByTagName可以选择多个元素  
例如ar aLi = oUl.getElementsByTagName('li')  
// aLi => [ li, li, li ]	 元素的集合  
#### 2.document.getElementsByTagName中document用母元素代替     
 例如： var oUl = document.getElementsByTagName('ul')[0];  
        var aLi = oUl.getElementsByTagName('li');  
#### 3.document.getElementsByTagName 用数组形式表示  
例如：var aLi = oUl.getElementsByTagName('li');中a为arr   
        aLi.length	3  
	aLi[0]  
      注意点：在用 TagName 的时候，必须要加上：[]    
#### 4.document.getElementsById为静态方法  
  document.getElementsByTagName为动态方法    
   var aBtn = document.getElementsByTagName('input');  
	
   alert(aBtn.length);  （显示为0）  
   
   document.body.innerHTML = '<input type="button" value="按钮" /><input type="button" value="按钮" /><input type="button" value="按钮" />';  
	
   //alert(aBtn.length);（显示为3）    
##### 附加小甜品：document.title = 123;  
	    document.body.innerHTML = 'abc';  
 
 
