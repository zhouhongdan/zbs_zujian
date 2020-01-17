
import $ from 'jquery'

export default class Drag{
		constructor(option){
			this.obj = $(option.obj);
			this.m = false;
			this.hide =5;
			this.eventClick = false;
			this.eventClickFn = option.eventClickFn;
			this.init();
		}
		initCsss(){			
			this.obj.css({'position':'fixed'});
			this.height = this.obj.outerHeight();
			this.width = this.obj.outerWidth();
			this.w_width = $(window).width();
			this.w_height = $(window).height();

			this.top = this.obj.offset().top - $(window).scrollTop();
			this.left = this.obj.offset().left - $(window).scrollLeft();

			if(this.width + this.left >= this.w_width){
				this.left = this.w_width - this.width;
				if(parseInt(this.obj.css('left'))<0){
					this.obj.css('left',-this.width+this.hide);
				}else if(parseInt(this.obj.css('left'))>this.w_width-this.width){
					this.obj.css('left',this.w_width-this.hide);
				}else{
					this.obj.css('left',this.left);
				}
			}
			if(this.height + this.top >= this.w_height){
				this.top = this.w_height - this.height;
				if(parseInt(this.obj.css('top'))<0){
					this.obj.css('top',-this.height+this.hide);
				}else{
					// eslint-disable-next-line no-console
					console.log(this.w_height)
					// eslint-disable-next-line no-console
					console.log(this.height)
					this.obj.css('top',this.top);
				}
			}
			
		}
		init(){
			var that =this;
			this.initCsss();
			$(window).resize(function(){
				that.initCsss();
			});
			that.move();
		}
		move(){
			var that = this;
			that.obj.on('mousedown',function(e){

				that.x = e.pageX;
				that.y = e.pageY;
				that.sX = e.screenX;
				that.sY = e.screenY;
				that.height = that.obj.outerHeight();
			    that.width = that.obj.outerWidth();

				that.eventClick =true
				$(document).on('mousemove',function(e){
					that.left2 = that.left+e.pageX-that.x;
					that.top2 = that.top+e.pageY-that.y;
					if(that.left2 <=0){
						that.left2 = 0;
					}else if(that.left2 >= that.w_width-that.width){
						that.left2 = that.w_width-that.width;
					}
					if(that.top2 <=0){
						that.top2 = 0;
					}else if(that.top2 >= that.w_height-that.height){
						that.top2 = that.w_height-that.height;
					}
					that.obj.css({'top':that.top2,'left':that.left2});
					that.eventClick = false;
					return false;
				});
				$(document).on('mouseup',function(e){
					that.top = that.obj.offset().top - $(window).scrollTop();
					that.left = that.obj.offset().left - $(window).scrollLeft();

					$(document).off('mousemove');
					$(document).off('mouseup');

					if(that.eventClick){
						// eslint-disable-next-line no-console
						console.log('点击了');
						that.eventClickFn();
					}else{
						// eslint-disable-next-line no-console
						console.log('拖动')
					}
					that.eventClick = false;
				});
				return false;
			});
			that.obj.on('mouseleave',function(){
				// eslint-disable-next-line no-console
				// console.log('离开')
			});
		}
	}

	


	
