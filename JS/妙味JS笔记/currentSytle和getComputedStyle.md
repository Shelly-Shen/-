##currentStyle和getComputedStyle应用
在JS 中获取css中的属性样式，普通.style无法获取，于是：  
1.alert(getComputedStyle($(div1)).width);  
//获取到的是计算机（浏览器）计算过的样式  
//此方法只使用与普通浏览器，IE678不行；

2.alert($(div1).currentStyle.width)  
//解决了IE678的兼容性，但普通浏览器不行  

解决方法：
D:\front\悦悦的小游戏\JS练习\JS8-函数返回值，定时器基础\课上练习

小贴士：

alert(getStyle($(div1),backgroundColor));  
1)background: url() red....复合样式（不要获取）  
2)backgroundColor 单一样式（不要用来做判断）  
3)不要有空格  
4)不要获取未设置的样式：不兼容
