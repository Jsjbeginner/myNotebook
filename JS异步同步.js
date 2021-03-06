//javascript是一门“单线程”,仅一条流水线。
//同步和异步的差别就在于这条流水线上各个流程的执行顺序不同。
console.log('a');
setTimeout(function() {
    console.log( "b" )
},0);
setTimeout(function() {
    console.log( "c" )
},0);
console.log('d');

//结果:	a
//  	d
//  	b
//		b
上诉代码 第 3,4,6,7,9,10,5,8行程序是线程的执行顺序,
执行程序时,浏览器会默认setTimeout以及ajax请求这一类的方法都是耗时程序(尽管可能不耗时),加入到存储耗时程序的队列中。
在所有不耗时程序(同步任务-3,4,6,7,9,10)执行过后，再来依次执行该队列中的程序(异步任务-5,8)。

同步任务:在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务
异步任务:不进入主线程、而进入"任务队列"(task queue)的任务，等主线程任务执行完毕，"任务队列"开始通知主线程，请求执行任务，异步任务才会进入主线程执行。

运行机制：
	(1) 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
	(2) 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
	(3) 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
	(4) 主线程不断重复上面的第三步。

只要指定过这些事件的回调函数，这些事件发生时就会进入"任务队列"，等待主线程读取。
异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。例如ajax的success，complete，error也都指定了各自的回调函数，这些函数就会加入“任务队列”中，等待执行。



