/**
 * Created by liyanan on 2016/6/23.
 */
jQuery.fn.extend({
	treeview:function(options){

		//upload css file
		var link=document.createElement('link');
		link.rel='stylesheet';
		link.type='text/css';
		link.href='tree.css';
		var head=document.getElementsByTagName('head')[0];
		head.appendChild(link);

		$(this).addClass('ml-20 tc-black ts-13 pos-rel');
		var instance = this;

		var url=null;
		var dat=null;

		var shtml='';
		shtml += '<div>';
		shtml += '	<p class="pos-rel" id="tree-0">';
		shtml += '		<!-- Add and subtract(can click)）-->';
		shtml += '		<img class="clickEle plus root w15 h15 ml-n7 mt-n7 mt-n7 mr-10 bg-white pointer" src="http://admin.yidaochn.com/theme/proton/assets/img/plus.png" alt=""/>';
		shtml += '		<span class="chose tc-white bg-blue pointer">'+options.text+'</span>';
		shtml += '	</p>';
		shtml += '	<div></div>';
		shtml += '	<!--cover the last one verticalredundant bar that redundant-->';
		shtml += '	<i class="pos-abs w10 h10 left-n5 bottom-n1 bg-white none"></i>';
		shtml += '</div>';
		$(this).append(shtml);

		//Trigger the click event
		$.post(url,{},function(data){
			options.click(data);
		});

		//Trgger the mouseenter event
		$(document).on('mouseenter','.clickEle',function(){
			if($(this).hasClass('plus')){
				$(this).attr('src','http://admin.yidaochn.com/theme/proton/assets/img/plus-hover.png');
			}else if($(this).hasClass('minus')){
				$(this).attr('src','http://admin.yidaochn.com/theme/proton/assets/img/minus-hover.png');
			}
		});
		$(document).on('mouseleave','.clickEle',function(){
			if($(this).hasClass('plus')){
				$(this).attr('src','http://admin.yidaochn.com/theme/proton/assets/img/plus.png');
			}else if($(this).hasClass('minus')){
				$(this).attr('src','http://admin.yidaochn.com/theme/proton/assets/img/minus.png');
			}
		});

		//Trgger the spread and fold event
     $(document).on('click','.clickEle',function(){
			url=options.url(elementMessage(this));
			foldExpandEle(this);
		});

		//save the element height
		foldExpandEle = function(opts){
			if($(opts).hasClass('plus')){
				$(opts).parent().next().html('loading...');
				$.post(url,{},function(data){
					var dat=data;
					if(data.error){
						alert(data.message);
					}else{

						//judge the callback data has content or not
						$(opts).parent().next().html(options.template(data));
						if(options.template(data)!='') {
							//click icon show minus
              plusMinusStyle(opts,'minus');
							options.expand(dat);
						}
					}

				});
			}else{
				//click icon show plus
				plusMinusStyle(opts,'plus');
				options.fold(dat);
			}
		};

		//get current node storage of information 
		elementMessage=function(opts){
			var messages={};
			messages.className=$(opts).parent().attr('class');
			messages.id=$(opts).parent().attr('id');
			messages.text=$(opts).parent().text();
			messages.html=$(opts).parent().html();
			return messages;
		};

		//set Add subtract style and connecting
		plusMinusStyle=function(opts,setIcon){
			setPlus='plus';
			setMinus='minus';
			if(this.setMinus==setIcon){
				var another=this.setPlus;
				var current=this.setMinus;
				$(opts).parent().next().show(200);
				$(opts).parent().parent().children().last().show(200);
				$(opts).parent().parent().addClass('bd-left-1');
				if($(opts).parent().parent()[0]==$(opts).parent().parent().parent().children().last()[0]){
					//$(opts).parent().parent().children('.shade1').height($(opts).parent().parent().height()-15);
					$(opts).parents('.bd-left-1').each(function(){
						if($(this).parent().children().last()[0]==this){
							$(this).children('.shade1').height($(this).height());
						}
					});
				}
			}else{
				var another=this.setMinus;
				var current=this.setPlus;
				$(opts).parent().next().hide(200).html('');
				$(opts).parents('.bd-left-1').each(function(){
					if($(this).parent().children().last()[0]==this){
						$(this).children('.shade1').height($(this).height()-27);
					}
				});
				$(opts).parent().parent().removeClass('bd-left-1');
				$(opts).parent().parent().children().last().hide(200);
			}
			$(opts).removeClass(another).addClass(current);
			$(opts).attr('src','http://admin.yidaochn.com/theme/proton/assets/img/'+current+'.png');
		};

	}
});
