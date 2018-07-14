console  
=============
什么是console?
---------
* 用于调试JS  
* 与alert的区别  
1.alert alert阻断线程运行 弹出窗口会中断程序 console则不会  
2.如果是alert弹出一个对象就是[object object],但是console能看到对象的内容  
##console的用法
1.Console.Read() Console.ReadLine()：从键盘读入信息  
不同点：  
（1）Console.Read() 获得用户输入的任何值(可以是任何的字母数字值)的ASCII值. Console.ReadLine()将获得的数据保存在字符串变量之中.  
（2）Console.Read（）：从键盘读取字符串，不换行。Console.ReadLine （）表示从键盘读取字符串后进行换行。  
2、console.log：输出普通信息  
3、console.info：用于输出提示性信息  
4、console.error：用于输出错误信息  
5、console.warn:用于输出警示信息  
6、console.debug:用于输出调试信息  
（console对象的上面5种方法，都可以使用printf风格的占位符。支持字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）四种。）  
7.console.dirxml:显示网页的某个节点（node）所包含的html代码  
8.console.group:输出一组信息的开头  console.groupEnd:结束一组输出信息  
9.console.assert:对输入的表达式进行断言，只有表达式为false时，才输出相应的信息到控制台  
10.console.count:代码被执行的次数  
11.console.dir:直接将该DOM结点以DOM树的结构进行输出.可以详细查对象的方法发展等等  
12.console.time:计时开始  console.timeEnd:计时结束  
13.console.profile和console.profileEnd:查看CPU使用相关信息  
14.console.trace 堆栈跟踪相关的调试
