# 从scroll事件衍生出的性能思考
问题：  
  scroll事件下绑定的对一个dom元素的color修改，会不会影响到浏览器性能，需要做节流吗？	
## 渲染帧
概念：指的是浏览器从js执行到paint的一次绘制过程，帧与帧之间快速地切换，形成动画效果。      
目前大多数浏览器屏幕的刷新频率——60次/s，浏览器的渲染更新的页面的标准帧率也为60FPS。

### 帧渲染的过程
DOM Tree： 浏览器讲HTML解析成树形的数据结构。  
CSS Rule Tree：浏览器将CSS解析成树形的数据结构。  
Render Tree：DOM树和CSS规则树合并后生产Render树。  
layout：有了Render Tree，浏览器已经能知道网页中有哪些节点、各个节点的CSS定义以及他们的从属关系，从而去计算出每个节点在屏幕中的位置。  
painting: 按照算出来的规则，通过显卡，把内容画到屏幕上。
![](scriptloop.jpg)
### 渲染步骤： 
浏览器内核拿到响应报文之后，渲染大概分为以下步骤

1.解析html构建DOM树。  
2.css解析器解析CSS规则。  
3.根据DOM Tree和CSS Tree生成Render Tree。  
4.根据Render树进行layout，负责各个元素节点的尺寸、位置计算。  
4.绘制Render树(painting)，绘制页面像素信息。  
5.浏览器会将各层的信息发送给GPU，调用GPU里的方法将会将各图层合成（composite），显示在屏幕上。  
## 浏览器渲染进程
blink和webkit引擎内部都是使用了两个进程来搞定JS执行、页面渲染之类的核心任务。

* Renderer进程
主要进程，每个tab一个。这个进程负责执行JS和页面渲染。包含3个线程：Compositor Thread、Tile Worker、Main thread。
* GPU进程
整个浏览器共用一个。主要是负责把Renderer进程中绘制好的tile位图作为纹理上传至GPU，并调用GPU的相关方法把纹理draw到屏幕上（一般的介绍浏览器渲染引擎的文章里都用paint这个词表述把内容光栅化和绘制到位图里，而用draw这个词表示GPU最终把纹理显示到屏幕上）。
### Main thread
执行上述渲染步骤
### Compositor Thread
这个线程既负责接收浏览器传来的垂直同步信号(从屏幕顶部到底部的绘制已经完成，指示着前一帧的结束，和新一帧的开始)， 也负责接收传来的用户交互，比如滚动。  
Compositor Thread会直接负责处理这些输入，然后转换为对layer（构建和合并图层GUVIEW里的实例）的位移和处理，并将新的帧直接commit到GPU Thread，从而直接输出新的页面。  
当我们在滚动事件上注册了回调，Compositor Thread便会唤醒Main Thread，让后者去执行JS、完成重绘、重排等过程，产出新的纹理，然后Compositor Thread再进行相关纹理的commit至GPU Thread，完成输出。
![](scriptoop.jpg)  
在一个标准帧渲染时间16.7ms之内，浏览器需要完成Main线程的操作，并commit给Compositor进程
![](compositor_no.jpg)  
主线程里操作太多，耗时长，commit的时间被推迟，浏览器来不及将页面draw到屏幕，导致丢帧，直接的影响就是页面卡顿。
### 通过Chrome DevTools来分析绘制复杂度和时间消耗
#### 本案例：   

* 一次屏幕刷新的时间间隔16.7ms(1/60)内，就算浏览器渲染了多次页面，屏幕也只刷新一次，这就造成了性能的浪费’

	
		function toogleBg() {
		  let title = document.querySelector('.title')
		  let scrollTop = Math.abs(M_WRAP.getBoundingClientRect().top)
		  if(scrollTop < 10) {
			title.style.color = 'rgba(225,225,225,0.0' + scrollTop*0.2+')'    
		  } else if(scrollTop > 10 && scrollTop <=  50) {
		    title.style.color = 'rgba(225,225,225,0.' + scrollTop*0.2+')'
		  } else {
		    title.style.color = 'rgba(225,225,225,1')'            
		  }
		} 
![](xiao.png)  
#### 当js逻辑更复杂
	
	function toogleBg() {
	  let title = document.querySelector('.title')
	  title.style.color = '#fff'
	  for( let m = 0; m< 1000; ++m) {
	      navbar.style.color = '#fff'
	  }
![](serinterval.png)  
主线程中JS计算时间过长，就会阻塞其他渲染工作，导致丢帧。前面提到每帧的渲染应该在16ms内完成。如果真的有特别耗时且不操作DOM元素的纯计算工作，可以考虑放到Web Workers中执行。
## 优化方案
### JS节流
#### 1.定时器

	function throttleFn(){
    	timer = setInterval(() => {
    		if ( didScroll ) {
    			a()
    		}
	    },250)
	}

	window.onscroll = function(e){
		didScroll = true;
		throttleFn()
	}

![](setinterval.png)

**缺点**：无法保证callback函数的执行时机，很可能在帧结束的时候执行，从而导致丢帧
![](settimeout.png)
#### 2.requestAnimationFrame()
每秒60次执行回调——符合屏幕的刷新频率，遇到耗时长的操作，这个数字会降到30来保证稳定的帧数。

		let didScroll = false
		function a() {
			var box = document.getElementById('box');
			var  scrollTop = window.scrollY;
			    if (scrollTop <= 50) {
			    	box.style.height = scrollTop + 'px';
			   	}
		  	didScroll = false;
		}	
		function throttleFn(){
		 	if ( !didScroll ) {
			window.requestAnimationFrame(a);
				didScroll = true;
	    	}
		}
![](16fps.png)

#### 3.react fibar特性
新思路：把一个耗时长的任务分成很多小片，逻辑和渲染交替运行，执行一小段逻辑后马上渲染一次，再执行一小段逻辑。
### CSS优化
* 使用 transform 或者 opacity 来实现动画效果    
	（1）这些属性会创建渲染层，提升为合并层  
	（2）不会导致重排  
* 对于较少可能变化的区域，防止页面其他部分重绘时影响这一片 提升合成层的方法：  
   transform:translateZ(0) || will-change:transform
(存在兼容性问题)
