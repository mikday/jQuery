(function($){
    var _defaults = {
        type:'warning',//弹框类型,warning--警告,error--错误,info--一般信息
        text:'操作成功!',//弹框默认内容
        button: false,//是否有可操作的按钮,默认没有
        autoClose: true,//是否会自动关闭,默认没有
        Modal:true,  //是否模态,默认有
        Timeout: 5000, //5000毫秒
        index:0,
        DragOn:true
    };

    $.fn.alertBox = function (options){
        var opts = $.extend({}, _defaults, options);
        var AlertBox;//遮罩
        var Alerttext;//弹框文字
        var Ptext;//弹框主体
        var Close;//关闭按钮
        var BoxTittle;//弹框标题

        //框和字的高度
        function Size() {
            var bodyheight = document.documentElement.clientHeight;
            var bodywidth = document.documentElement.clientWidth;
            var textheight = Alerttext.outerHeight();
            var boxheight = Ptext.height();
            var boxwidth = Ptext.outerWidth();
            return [bodyheight, boxheight, bodywidth, boxwidth, textheight];
        }


        function Create() {
            //初始化弹框
            var time = new Date();
            var idMake = "myalert" + time.getTime();
            AlertBox = $('<div class="myalert" id=' + idMake + '></div>');
            BoxTittle = $('<span class="box-tittle ' + opts.type + '"></span>');
            Alerttext = $('<span class="alert-text">' + idMake + opts.text + idMake + index + '</span>');
            Ptext = $('<p class="alert-box" id=' + idMake + '></p>');
            Close = $('<span class="closealert ' + opts.type + '">&times</span>');
            Ptext.append(BoxTittle);
            Ptext.append(Alerttext);
            Ptext.append(Close);//初始化


            //是否有遮罩
            if (opts.Modal) {//有,默认
                AlertBox.append(Ptext);
                $('body').append(AlertBox);
                var SizeArry1= Size();//处理位置
                Ptext.css({"position": "relative","top": (SizeArry1[0] - SizeArry1[1]) / 2 + "px"});
                Alerttext.css({"margin-top": (SizeArry1[1] - SizeArry1[4]) / 2 - 30 + "px"});
            } else {//无 false
                $('body').append(Ptext);
                Ptext.css({"display": "none","position": "absolute"});
                var SizeArry2 = Size();//处理位置
                Ptext.css({"left": SizeArry2[2] - SizeArry2[3] - 20 + "px","z-index": 1000});
                Alerttext.css({"margin-top": (SizeArry2[1] - SizeArry2[4]) / 2 - 30 + "px"});
                Ptext.fadeIn(2000);
            }//是否有遮罩

            var idMakeObj = $("#" + idMake);//创建一个实时的id

            $(window).resize(function () {
                var SizeArryAll = Size();//处理位置
                if (opts.Modal) {//有,默认
                    opts.DragOn = false;
                    $('.alert-box').each(function(){
                        $(this).css({"top": (SizeArryAll[0] - SizeArryAll[1]) / 2});
                    })
                } else {//无 false

                    $('.alert-box').each(function(){
                        if($(this).css('left') >= (SizeArryAll[2] - SizeArryAll[3]) - 16 + "px" && $(this).css('left') > 0 + "px"){

                            $(this).css({"left": (SizeArryAll[2] - SizeArryAll[3]) - 16 + "px"});
                        }
                    })
                }
            });//window.resize()

            //定时器句柄,自动消失用
            function createTimeoutHandle(target){
                return setTimeout(function () {
                    target.fadeOut(800,function(){
                        $(this).remove();
                    });
                }, opts.Timeout);
            }

            //是否自动关闭,默认1s
            var _timeout = null;
            //自动消失
            function Timeout(target){
                if(_timeout == null){
                    _timeout = createTimeoutHandle(target);
                }
                //鼠标移入,移除计时器
                target.mouseenter(function(){
                    clearTimeout(_timeout);
                 });
                //鼠标离开.计时器重新开始
                target.mouseleave(function(){
                    _timeout = createTimeoutHandle(target);
                });
            }

            //是否自动关闭
            if (opts.autoClose) {
                Timeout(idMakeObj);
            }
            Close.click(function(){
                idMakeObj.fadeOut(1000,function(){$(this).remove()});
            });

            //拖拽
            if(!opts.Modal && opts.DragOn){
                //禁止文本被选中,以优化拖拽体验
                //拖拽
                //防止位置出现偏移,初始化位置
                var tx = 0, // touch 开始的 x 坐标
                    ty = 0, // touch 开始的 y 坐标
                    ex = 0, // Obj 起始位置的 x 坐标
                    ey = 0; // Obj 起始位置的 y 坐标
                idMakeObj.unbind('mousedown').bind('mousedown',function(e){
                    var thistarget=$(this);                                  //点击置于最上层
                    var thisindex = parseInt($(this).css('z-index'), 10);    //点击置于最上层
                    $(this).siblings('.alert-box').each(function(){         //点击置于最上层

                        var OtherZIndex =parseInt($(this).css('z-index'), 10);//点击置于最上层

                        if(OtherZIndex > thisindex){                          //点击置于最上层

                            thistarget.css({"z-index":OtherZIndex});          //点击置于最上层

                            $(this).css({"z-index":1000});                   //点击置于最上层

                        }else{                                               //点击置于最上层

                            thistarget.css({"z-index":thisindex + 10});      //点击置于最上层
                        }
                    });

                    // 记录开始时 touch 的坐标
                    tx = e.pageX;                       //鼠标按下时鼠标的x坐标
                    ty = e.pageY;                       //鼠标按下时鼠标的y坐标
                    ex = thistarget.offset().left;      //鼠标按下时被点击元素的x坐标,左边距
                    ey = thistarget.offset().top;       //鼠标按下时被点击元素的y坐标,上边距

                    //拖拽发生时
                    thistarget.unbind('mousemove').bind('mousemove',function(e){
                        var SizeArryAll = Size();//处理位置

                        //拖拽发生时
                        thistarget.css({"cursor":"pointer"});
                        var lastex = ex + (e.pageX - tx);                          //移动中元素左边距
                        var lastey = ey + (e.pageY - ty);                          //移动中元素上边距

                        //坐标越界检查
                        lastex = lastex < 0 ? 0 : lastex;

                        lastex = lastex > SizeArryAll[2] - SizeArryAll[3] - 16 ? SizeArryAll[2] - SizeArryAll[3] - 16 : lastex;

                        lastey = lastey < 16 ? 16 : lastey;

                        lastey = lastey > (SizeArryAll[0] - SizeArryAll[1]) ? (SizeArryAll[0] - SizeArryAll[1]) : lastey;

                        thistarget.css({"left":lastex + "px","top":lastey + "px"});
                    });
                });
            }

            idMakeObj.mouseup(function(){
                idMakeObj.unbind('mousemove');
            });
            idMakeObj.mouseleave(function(){
                idMakeObj.unbind('mousemove');
            });
            idMakeObj.onmousedown = function (event)
            {
                (event || window.event).cancelBubble = true

            };
        }

        var index = 0;
        this.click(function (){
            index++;
            Create();
        });//each.function(){}

    };//$.fn.alertBox





})(jQuery);
