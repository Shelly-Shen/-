# async

	const asyncReadFile = async function () {
	  const f1 = await readFile('/etc/fstab');
	  const f2 = await readFile('/etc/shells');
	  console.log(f1.toString());
	  console.log(f2.toString());
	};
* async表示函数里有异步操作，asyn，await后的函数会返回一个Promise 对象，,await命令就是内部then命令的语法糖  
* await会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
* async函数内部return语句返回的值，会成为then方法回调函数的参数。

		async function getStockPriceByName(name) {
		  const symbol = await getStockSymbol(name);
		  const stockPrice = await getStockPrice(symbol);
		  return stockPrice;
		}
		
		getStockPriceByName('goog').then(function (result) {
		  console.log(result);
		});

* 只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
## try catch

		async function f() {
		  try {
		    await new Promise(function (resolve, reject) {
		      throw new Error('出错了');
		    });
		  } catch(e) {
		  }
		  return await('hello world');
		}

		//另一种写法
		async function myFunction() {
		  await somethingThatReturnsAPromise()
		  .catch(function (err) {
		    console.log(err);
		  });
		}
## 同时触发

	let [foo, bar] = await Promise.all([getFoo(), getBar()]);
	
	// 写法二
	let fooPromise = getFoo();
	let barPromise = getBar();
	let foo = await fooPromise;
	let bar = await barPromise;
