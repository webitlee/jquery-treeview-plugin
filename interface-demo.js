//demo
$('#package').treeview({
	//ipnut the treeview root name(输入树菜单根名称)
	text:'艺术古玩分类',
	url:function(node){
		//callback load children nodes url(返回加载子节点url)
		return '/classis/tree?id='+node.id.substring(5);
	},
	template:function(node){
		//返回一个用于显示该节点外观的html内容，并且不包含子元素的容器
		var shtml='';
		for(var i=0;i<node.data.nodes.length;i++){
			shtml += '<div class="ml-20 pos-rel">';
			shtml += '	<p class="pos-rel" id="tree-'+node.data.nodes[i].id+'">';
			shtml += '		<i class="pos-abs left-n20 top-7 w15 h-1 bg-gray middle"></i>';
			shtml += '		<img class="clickEle plus w15 h15 ml-n7 mt-n7 mt-n7 mr-10 bg-white pointer" src="http://admin.yidaochn.com/theme/proton/assets/img/plus.png" alt=""/>';
			shtml += 			node.data.nodes[i].text;
			shtml += '	</p>';
			shtml += '	<!--盖住上一级多余的竖线-->';
			shtml += '	<i class="shade1 pos-abs w10 left-n25 top-8 bg-white"></i>';
			shtml += '	<!-- 盖住最后一个竖线-->';
			shtml += '	<i class="pos-abs w10 h10 left-n5 bottom-n1 bg-white none"></i>';
			shtml += '</div>';
		}
		return shtml;
	},
	click:function(node){
		//Triggered when a node is clicked(当某节点被点击时触发)

	},
	fold:function(node){
		//When folding child elements, mainly used to modify "+" "-" style(当折叠子元素时触发，主要用来修改+-号的样式)
		//console.log(node);	},
	expand:function(node){
		//Triggered when an element, is mainly used to modify the + - style(展开元素时触发，主要用来修改+—号的样式)
		//console.log(node);
	}
});
