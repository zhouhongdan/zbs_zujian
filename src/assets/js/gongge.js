var gonggeIndex = 0;
var gonggeTimer = null
var downTimer = null;
var upTimer = null;

export default class Gongge{
    constructor(options = {}){
        Object.assign(this,{
            waiting: 8000,//匀速转动时长
            index : 0, //初始位置
            target : '',//中奖位置
            onEnd:function(){},
            
        },options)



        this.aChild = this.obj.children;

        if(this.aChild.length == 0){
            throw "没发现Dom, can't grid!!!";
            console.log("没发现Dom, can't grid!!!")
        }

        this.len = this.aChild.length; // 奖品格子
        this.aChild[this._index()].classList.add('active');

        this.isGridBegin = false 
        this.initSpeed = 500; //初始转动速度
        this.speed = 500;      //当前转动速度 实验证明  数值：500 
        this.upStep = 50;     //加速滚动步长
        this.upMax = 50;      //速度上限
        this.downStep = 30;   //减速滚动步长
        this.downMax = 500;   //减速上限
        this.isRunning = false;//当前是否正在抽奖
        
        this.Timer = null;

        gonggeTimer = null
        downTimer = null;
        upTimer = null;
                
    }
    _index(){
        return gonggeIndex % this.len;// 转盘当前格子下标
    }
    _start(){
        if(this.isGridBegin){
            return;
        }
        this.isGridBegin = true
        console.log('开始')
        this._roll();
        //检测是否有目标值
        var time = 0;
        var self = this;
	    this.Timer = setInterval(function(){
	    	time ++;
	    	// console.log(time);
	    	if(time * 1000 >= self.waiting){
                console.log("超时");
                
	    		self._stop();
	    		self._roll();
	    		time = 0;
            }
            console.log(self.target)
	    	if(self.target){
	    		console.log("有值了"+self.target);
	    		clearInterval(self.Timer);
	    	}
        },1000);
        
    }
    _roll(){
        // 转盘滚动
        // console.log(gonggeIndex)
        let self = this
        this.aChild[this._index()].classList.remove('active');
        ++ gonggeIndex;
        this.aChild[this._index()].classList.add('active');
        // console.log(this._index())
        clearTimeout(gonggeTimer)
        gonggeTimer = setTimeout(function(){self._roll();}, self.speed);
        console.log(gonggeTimer)
        //是否在抽奖
        if(!this.isRunning){
            this._up();
            this.isRunning = true;
        }
    }
    _up(){// 转盘加速
        // console.log('opop'+this.speed)
        let self = this
        if(self.speed <= self.upMax) {
            // console.log('+'+speed) speed :50 到这一步
            self._constant();
        }else{
            // speed == 500
            // console.log('-'+speed)
            self.speed -= self.upStep;
            clearTimeout(upTimer)
            upTimer = setTimeout(function(){self._up();}, self.speed);
            console.log(0)
        }
    }
    _constant(){// 转盘匀速
        let self = this
        clearTimeout(upTimer);
        // 均匀 options.waiting 的时间
        setTimeout(function(){ self._down();}, self.waiting);
    }
    _down(){// 转盘减速
        if(this.speed > this.downMax && this.target == this._index()){
            this._stop();
        }else{
            // 转盘减速
            let self = this
            this.speed += this.downStep;
            downTimer = setTimeout(function(){ self._down();},self.speed);
        }
    }
    _stop(){// 转盘停止，还原设置
        let self = this
        console.log('停止-------------------')

        console.log(downTimer)
        console.log(gonggeTimer)
        console.log(upTimer)

        clearInterval(downTimer);
        clearInterval(gonggeTimer);
        clearInterval(upTimer);

        self.speed = this.initSpeed;
        self.isRunning = false;

        self.isGridBegin = false;
        self.target = '';
        self.onEnd && self.onEnd();
        clearInterval(self.Timer);

      }
      

}