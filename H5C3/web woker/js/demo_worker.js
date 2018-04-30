var i;
function timeCount(){
	i=i+1;
	postMessage(i);
	setTimeout("timeCount()",5000);
}
timeCount();