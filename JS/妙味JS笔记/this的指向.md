# 关于this指向

this指的是调用当前方法（函数）的那个对象 
  
## 一.无参数函数this的指向  

`function fn1(){  alert(this)  }`  

     fn1()   ===》window   
     oBtn.onclick = fn1;   ===> oBtn    
     oBtn.onclick = function(){ this };   ===> oBtn    
     oBtn.onclick = function(){ fn() };   ===> window
      oBtn.onclick = function(){ fn(this) };   ===> oBtn
     `<button  onclick = "alert(this  fn(1))"></button>`      this===>button    fn1()里的this===>window   
## 二.、带参数函数this的指向  
### 1.
     
     fn1(this)  
     function fn1(obj){  obj  }  obj===window    
### 2.

     oDiv.onclick = function{
     fn1(this) 
     }  
     function fn1(obj){
     obj
     }    obj ===》oDiv   
## 三.当this指向window时用that存储  

    var that = null;
    oBtn.onclick = function(){
    that = this;
    fn1();
    }
    fn1(){
	that.style.background = 'yellow'; 
	}    
    ===》this指向oBtn


 
    
