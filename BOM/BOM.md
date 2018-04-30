##BOM
1.
	
	（1）open(页面的地址url,打开的方式) 方法 打开一个新窗口（页面）  
	如果url为空,则默认打开一个空白网页  
	如果打开方式为空，默认新窗口方式打开
	（2）close()方法 关闭窗口
2.
	查当前浏览器版本    
	alert  (window.navigator.userAgent); 
3.
  
	 浏览器地址信息：window.location

		window.location.href：url
		window.location.search:url?后面的内容
	    window.location.hash:url#后面的内容