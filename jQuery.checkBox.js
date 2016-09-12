(function($){
    var _defaults = {
        class: 'rr',
        text:['11','22','33']
    };
    $.fn.CheckBox = function (options,eps){
        var opts = $.extend({}, _defaults, options);

        this.each(function (){
            var $singleBox;
            var $sPan;
            var $labBel;
            var $InPut;
            var $l=opts.text.length;
            for(i=0;i<$l;i++){
                console.debug(i+'iii');
                $InPut=$('<input type="checkbox" value="opts.text[i]"/>');
                $sPan=$('<span></span>');
                $labBel=$('<label></label>');
                $singleBox=$('<div class="single-box"></div>');
                $sPan.text(opts.text[i]);
                $singleBox.append($labBel);
                $labBel.append($InPut);
                $labBel.append($sPan);
                $(this).append($singleBox);
            }

            var $this=$(this).find('input[type="checkbox"]');

            $this.unbind('click').bind('click',function(){
                var r=$(this).prop("checked");
                var eps=function(){
                    var r=$(this).prop("checked");
                    return r;
                }
                if(r){
                    $(this).siblings('span').addClass(opts.class);

                }else
                {
                    $(this).siblings('span').removeClass(opts.class);
                }
            });
        });
    }

})(jQuery);
