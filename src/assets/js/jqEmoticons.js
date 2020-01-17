/**
 * jquery.emoticons.js 1.0
 * http://jquerywidget.com
 */
define({

    emoticons: function(parameter,getApi) {
        var self = this;
        if(typeof parameter == 'function'){ //重载
            getApi = parameter;
            parameter = {};
        }else{
            parameter = parameter || {};
            getApi = getApi||function(){};
        }
        var defaults = {
            //输入框 显示 中文字符
            'inserveBox':'tool-chatInput',
            //触发按钮
            'triggerBtn':'biaoqing',
            //放表情 盒子
            'emotionBox':'expressKu',
            'path':'/static/face/',
            'listArray':[],
            'activeCls':'activeCls'
        };
        var options = $.extend({}, defaults, parameter);
        var _api = {};
        var $document = $(document);
        var $layer = $('.'+options.emotionBox);
        var $textarea = document.getElementById('msg_content');
        var _hash = {};

        $.each(options.listArray,function(index,item){
            _hash[item.title] = options.path+item.url;
           $layer.append('<li title="'+item.title+'" class="clap_'+options.triggerBtn+'_li"><img src="'+_hash[item.title]+'"/></li>');
        });

        //接口处理
        _api.format = function(str){
            var list = str.match(/\[[\u4e00-\u9fa5]*\w*\]/g);
            var filter = /[\[\]]/g;
            var title;
            if(list){
                for(var i=0;i<list.length;i++){
                    title = list[i].replace(filter,'');
                    if(_hash[title]){
                        str = str.replace(list[i],'<img src="'+_hash[title]+'" class="class_s"/>');
                    }
                }
            }
            return str;
        };
        //加载图片 并 显示
        $document.on('click','.'+options.triggerBtn,function(){
            if(!$(this).hasClass(options.activeCls)){
                $(this).addClass(options.activeCls);
                $layer.find('img').each(function(){
                    var $this = $(this);
                    $this.attr('src',$this.data('src'));
                    $this.addClass('clap_'+options.triggerBtn);
                });
            }
        });
        // 将图片插入输入框
        $layer.off('click').on('click','li',function(){
            var $this = $(this);
            var title = $this.attr('title');
            if($textarea){
                self.insertAtCursor($textarea, '['+title+']')
            }
        });

        // 初始化
        return _hash;
    },
        //  //插入文字
         insertAtCursor:function(dom, html) {
            if (dom != document.activeElement) { // 如果dom没有获取到焦点，追加
                dom.innerHTML = dom.innerHTML + html;
                return;
            }
            var sel, range;
            if (window.getSelection) {
                // IE9 或 非IE浏览器
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();
                    // Range.createContextualFragment() would be useful here but is
                    // non-standard and not supported in all browsers (IE9, for one)
                    var el = document.createElement("div");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(),
                        node, lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);
                    // Preserve the selection
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            } else if (document.selection && document.selection.type != "Control") {
                // IE < 9
                document.selection.createRange().pasteHTML(html);
            }
        }
  


});
// function EMformat(str){
//     if(str){
//         var list = str.match(/\[[\u4e00-\u9fa5]*\w*\]/g);
//         var filter = /[\[\]]/g;
//         var title;
//         if(list){
//             for(var i=0;i<list.length;i++){
//                 title = list[i].replace(filter,'');
//                 // console.log(title)
//                 if(_hashAll[title]){
//                     str = str.replace(list[i],'<img src="'+_hashAll[title]+'" class="class_s"/>');
//                 }
//             }
//         }
//         return str;
//     }

//   }
// ;var biaqingArray = [
//             {'title':'蒙圈','url':'101.png'},
//             {'title':'笑脸','url':'102.png'},
//             {'title':'绅士','url':'103.png'},
//             {'title':'惊讶','url':'104.png'},
//             {'title':'微笑','url':'105.png'},
//             {'title':'惊哭','url':'106.png'},

//             {'title':'爱你','url':'107.png'},
//             {'title':'闭口','url':'108.png'},
//             {'title':'花痴','url':'109.png'},
//             {'title':'想睡觉','url':'201.png'},
//             {'title':'叹气','url':'202.png'},
//             {'title':'大笑','url':'203.png'},

//             {'title':'大哭','url':'204.png'},
//             {'title':'调皮','url':'205.png'},
//             {'title':'鬼脸','url':'206.png'},
//             {'title':'得意','url':'207.png'},
//             {'title':'难过','url':'208.png'},
//             {'title':'不高兴','url':'209.png'},


//             {'title':'嘴馋','url':'301.png'},
//             {'title':'吓到','url':'302.png'},
//             {'title':'流汗','url':'303.png'},
//             {'title':'篮球','url':'304.png'},
//             {'title':'啤酒','url':'305.png'},
//             {'title':'泳衣','url':'306.png'},

//             {'title':'蛋糕','url':'307.png'},
//             {'title':'圣诞树','url':'308.png'},
//             {'title':'天使','url':'309.png'},
//             {'title':'苹果','url':'401.png'},
//             {'title':'射中','url':'402.png'},
//             {'title':'幽灵','url':'403.png'},

//             {'title':'礼物','url':'404.png'},
//             {'title':'爱心','url':'405.png'},
//             {'title':'锤子','url':'406.png'},
//             {'title':'雪糕','url':'407.png'},
//             {'title':'南瓜','url':'408.png'},
//             {'title':'嘴唇','url':'409.png'},

//             {'title':'棒棒糖','url':'501.png'},
//             {'title':'喇叭','url':'502.png'},
//             {'title':'钱袋','url':'503.png'},
//             {'title':'美甲','url':'504.png'},
//             {'title':'火箭','url':'505.png'},
//             {'title':'游艇','url':'506.png'},

//             {'title':'足球','url':'507.png'},
//             {'title':'赛车','url':'508.png'},
//             {'title':'拖拉机','url':'509.png'},
//             {'title':'奖杯','url':'601.png'},
//             {'title':'果汁','url':'602.png'},
//             {'title':'金鱼','url':'603.png'},

//             {'title':'鲜花','url':'604.png'},
//             {'title':'雨伞','url':'605.png'},
//             {'title':'耶','url':'606.png'},
//             {'title':'西瓜','url':'607.png'},
//             {'title':'飞机','url':'608.png'},
//             {'title':'跳舞','url':'609.png'}
//         ];
// var caitiaoArray = [
//             {'title':'鲜花来一束','url':'101.png'},
//             {'title':'掌声响起来','url':'201.png'},
//             {'title':'赞一波','url':'301.png'},
//             {'title':'上天保佑','url':'401.png'}
//             ];

// $(function(){
//     var p1 = $.emoticons({
//          'inserveBox':'tool-chatInput',
//           //触发按钮
//           'triggerBtn':'biaoqing',
//           //放表情 盒子
//           'emotionBox':'expressKu',
//           'path':baseURI+'static/live/pc/themes/default/images/pop/face/',
//           'listArray': biaqingArray
//      });
//     var p2 = $.emoticons({
//          'inserveBox':'tool-chatInput',
//          //触发按钮
//          'triggerBtn':'caitiao',
//          //放表情 盒子
//          'emotionBox':'happyKu',
//          'path':baseURI+'static/live/pc/themes/default/images/pop/zan/',
//          'listArray': caitiaoArray
//      });
//     _hashAll = $.extend({}, p1, p2);
// })







