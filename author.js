

    // 绑定下拉框的函数
    // areaKey: 请求地区代码
    // jQuerySelecter: 请求到数据后的绑定的目标选择器

    (function($){
        var _defaults = {
            url:'./Privilege.xml', //xml,列出所有,并且可以点击
            url2:'./tsconfig.json', //json,数据地址,已选项
            active:''               //选中时,被选项样式
        };
        function initShow(obj){
            var key = obj.attr("key");
            var ischecked = obj.children('input').prop("checked");
            var Box = obj.closest('.box').next('.box').find('.b2');
            var BoxKey = Box.find('label[key="' + key + '"]');
            if(ischecked){
                obj.addClass('active');
                Box.children('label[key="' + key + '"]').show();
            }else{
                obj.removeClass('active');
                BoxKey.hide();
                BoxKey.removeClass('active');
                Box.children('label[key="' + key + '"]').find('input').prop('checked','');
            }
        }
        $.fn.AuthorQuery=function(options){//点亮已选项,编辑适用
            var Parent=$(this);
            var opts = $.extend({}, _defaults, options);

            function bindClass(Url) {//回调函数,将数据绑定在obj上
                $.ajax({
                    url: Url,
                    dataType: 'json',
                    type: 'GET',
                    timeout: 2000,
                    async: false,
                    cache: false,

                    success:function (data) {
                        for (var i = 0; i < data.length; i++) {
                            //console.debug(i);
                            var target = Parent.find('input[value="' + data[i]+ '"]').closest("label");
                            Parent.find('input[value="' + data[i]+ '"]').prop('checked','checked');
                            //Parent.find('.b2>label').show();

                            target.trigger("click");
                            target.addClass('active');
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {

                        alert('请求遇见错误，请稍后重试！');
                    }
                });
            }
            bindClass(opts.url2);//点亮
        };

        $.fn.Author = function (options){//列出所有选项,添加适用
            var Parent=$(this);
            var opts = $.extend({}, _defaults, options);

            var FirstContaniner;
            var SecondContaniner;
            var FirstContaniner2;
            var SecondContaniner2;

            function bindSelect(Url) {//回调函数,将数据绑定在obj上
                $.ajax({
                    url: Url,
                    dataType: 'xml',
                    type: 'GET',
                    timeout: 2000,
                    async: false,
                    cache: false,
                    success:function (xml) {
                        $(xml).find("privilege").each(function(i) {
                            var privilege = $(this);
                            var name = privilege.attr("name");//读取节点属性;
                            var value = privilege.attr("value");//读取节点属性;

                            //console.debug("name="+name+",value="+value);
                            var input=$('<input type="checkbox" hidden value="' + value + '"/>');
                            var label=$('<label key="' + i + '" data-value="' + name + '">' + name + '</label>');

                            if (privilege.attr("show") != "false"){
                                Parent.find('.b').append(label);
                                label.append(input);
                                privilege.children("action").each(function(j){
                                    //console.debug(i);
                                    var action = $(this);
                                    var Aname = action.attr("name");//读取节点属性;
                                    var Avalue = action.attr("value");//读取节点属性;
                                    var label1=$('<label key="' + i + '" data-value="' + Aname + '">' + Aname + '</label>');
                                    var input1=$('<input type="checkbox" hidden value="' + Avalue + '"/>');
                                    label1.append(input1);
                                    Parent.find('.b2').append(label1);
                                    label1.click(function(){
                                        initShow($(this))
                                    });
                                });
                            }
                            label.click(function(){
                                initShow($(this))
                            });

                        });
                        //alert('请求成功了！');
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //alert('请求遇见错误，请稍后重试！');
                    }
                });
            }

            this.each(function(){
                FirstContaniner = document.createElement("div");//输入想要创建的类型
                FirstContaniner.className="box";
                SecondContaniner = document.createElement("div");//输入想要创建的类型
                SecondContaniner.className="b";
                //第二框
                FirstContaniner2 = document.createElement("div");//输入想要创建的类型
                FirstContaniner2.className="box";
                SecondContaniner2 = document.createElement("div");//输入想要创建的类型
                SecondContaniner2.className="b2";
                //将元素添加到指定的节点
                $(this).append(FirstContaniner);
                $(this).append(FirstContaniner2);
                FirstContaniner.appendChild(SecondContaniner);//js
                FirstContaniner2.appendChild(SecondContaniner2);//js
                bindSelect(opts.url);
            });

        }

    })(jQuery);

