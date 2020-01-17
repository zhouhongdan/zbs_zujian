$(function(){

	//测试时间
	// var startHbTime1 = (new Date('2019/01/18 00:00:01').getTime() )/1000;

	// var startHbTime1 = (new Date('2019/01/20 12:55:00').getTime() )/1000;
	// var endHbTime1 = (new Date('2019/01/24 23:30:00').getTime() )/1000;
	// var hongbaoTimer = null;
	// if(currentTime > startHbTime1 && currentTime < endHbTime1){
	//        hongbaoTimer = setTimeout(function(){
	//        红包雨  hongbaoInit(num,idEle)
	//        hongbaoInit(120,'petalbox');
	//     },1000)
	// }else{
	//    clearInterval(hongbaoTimer)
	//    console.log('红包雨结束')
	// }
})

// 红包雨
function hongbaoInit(num,idEle) {
    /* Get a reference to the element that will contain the leaves */
    var container = document.getElementById(idEle);
    $('#'+idEle).show();
        // container.appendChild(new CreateALeaf());
        for (var i = 0; i < num;i++) {
                (function(i){
                    container.appendChild(new CreateALeaf(idEle));
                })(i)
        }
    var timeNum = 0;
    var timerHb = setInterval(function(){
        timeNum++;
        // console.log(timeNum)
        if(timeNum >= 5){
            clearInterval(timerHb)
            $('#'+idEle).hide();
        }
    },1000)
}
function CreateALeaf(obj){
    this.parents = document.getElementById(obj);
    this.ele = document.createElement('img');
    this.timer = null;
    this.ele.src= baseURI+'static/live/pc/images/hb/petal'+randomN(1,6) +".png";
    this.ele.style.position = 'absolute';
    this.ele.style.zIndex = '0';
    this.Top = randomN(-500,800)
    this.Left = randomN(0,1920)
    this.ele.style.top =  this.Top + 'px';
    this.ele.style.left = this.Left + 'px';
    this.ele.style.width = 'auto';
    this.ele.style.height = 'auto';

    this.time = 4;//5秒
    this.n = 0;
    this.count = Math.round(this.time * 1000 /100); //次数
    this.start = this.Top;
    this.dis = 1;

    var that = this;
    clearInterval(this.timer)
    this.timer = setInterval(function(){
        that.down(that);
    },100)
    return this.ele
 }
CreateALeaf.prototype.down =function(obj){
    this.n++;
    this.Left += randomN(-1,1);
    this.Top += randomN(20,50) + this.n/this.count*this.time

    this.ele.style.top =  this.Top + 'px';
    this.ele.style.left = this.Left + 'px';
    if(this.Left > 1920){
        $(this.ele).fadeOut("slow").remove();
        clearInterval(this.timer)
    }
    if(this.Top > 970){
        $(this.ele).fadeOut("slow").remove();
        clearInterval(this.timer)
    }

    if(this.n >= this.count){
        clearInterval(this.timer);
        $(this.ele).fadeOut("slow").remove();
        $(this.parents).hide();
    }
}
function randomN(n,m){
    return n +  parseInt( (m - n) *Math.random() );
}