function newDomRow(container,data,istail,num)
{ 
	var last = $("[data-bind=row]").last();
	if (istail!=true)
	{
		$(container).append($(last).clone());
	}
	
	jQuery.each(data, function(k, v) {
		
		var bindItem=$(last).find("[data-bind="+k+"]").last()[0];
      
       if((typeof $(last).find("[data-bind="+k+"]").last()[0]) !='undefined'){
		if ($(last).find("[data-bind="+k+"]").last()[0].tagName == "IMG")
		{
			
			$(bindItem).attr('src',".."+v);
		}else if($(last).find("[data-bind="+k+"]").attr('type')=='hidden'){
			$(last).find("[data-bind="+k+"]").attr('value',v);
		}
		else
		{
			$(bindItem).html(v);
		}
       };
       
       
		var bindfor=$(container).find("[data-for="+k+"]");
        
		
		if(bindfor.length!=0){
			
			 var clone_Node=$("[data-for="+k+"]").children().last()[0];
			 $("[data-for="+k+"]").empty().html(clone_Node);
			 
			 v=v.split(',');
			 var len=v.length;
				
			 
			if(clone_Node.tagName=='IMG'){
			
			for(var i=0;i<len;i++){
				if(num){
				$(bindfor).append($("[data-for="+k+"]").children().last().clone());
				};
				num=1
				$("[data-for="+k+"]").children().last().attr('src',".."+v[i]);
				
			};
			num=0;
		}else{
			
			for(var i=0;i<len;i++){
				if(num){
					$(bindfor).append($("[data-for="+k+"]").children().last().clone());
				};
				num=1
				$("[data-for="+k+"]").children().last().html(v[i]);
				
			};
			num=0;
		};
		};
       
	});
};
function render(container,data,num){
	$.each(data,function(k,v){
		var bindItem=$(container).find("[data-bind="+k+"]");
		var bindfor=$(container).find("[data-for="+k+"]");
        
		
		if(bindfor.length!=0){
			
			 var clone_Node=$("[data-for="+k+"]").children().last()[0];
			 $("[data-for="+k+"]").empty().html(clone_Node);
			 
			 v=v.split(',');
			 var len=v.length;
				
			 
			if(clone_Node.tagName=='IMG'){
			
			for(var i=0;i<len;i++){
				if(num){
				$(bindfor).append($("[data-for="+k+"]").children().last().clone());
				};
				num=1
				$("[data-for="+k+"]").children().last().attr('src',".."+v[i]);
				
			};
			num=0;
		}else{
			
			for(var i=0;i<len;i++){
				if(num){
					$(bindfor).append($("[data-for="+k+"]").children().last().clone());
				};
				num=1
				$("[data-for="+k+"]").children().last().html(v[i]);
				
			};
			num=0;
		};
		};
		if ($(container).find("[data-bind="+k+"]").tagName == "IMG")
		{
			
			$(bindItem).attr('src',".."+v);
		}else if($(container).find("[data-bind="+k+"]").attr('type')=='hidden'){
			$(bindItem).attr('value',v);
		}
		else
		{
			$(bindItem).html(v);
		}
	})
};

function addhtml(container,data){
	var last = $("[data-bind=row]").last();
	
	$(container).append($(last).clone());
	last = $("[data-bind=row]").last();
	jQuery.each(data, function(k, v) {
		
		var bindItem=$(last).find("[data-bind="+k+"]").last()[0];
      
       if((typeof $(last).find("[data-bind="+k+"]").last()[0]) !='undefined'){
		if ($(last).find("[data-bind="+k+"]").last()[0].tagName == "IMG")
		{
			
			$(bindItem).attr('src',".."+v);
		}else if($(last).find("[data-bind="+k+"]").attr('type')=='hidden'){
			$(last).find("[data-bind="+k+"]").attr('value',v);
		}
		else
		{
			$(bindItem).html(v);
		}
       };
	});
	
}

$.fn.extend({
	bindData:function(data,a) { 
		var len = data.length;
		if(typeof len=='undefined'){
			render($(this),data,0);
		}else{
			if(a!=1){
				var clone_Node=$(this).children().last()[0];
				$(this).empty().html(clone_Node);
			}
			
		for (var i=0;i<len;i++)
		{
			
			if(a==1){
				addhtml($(this),data[i]);
			}else{
				newDomRow($(this),data[i],i==(len-1),0);	
			}
		}
		};
		
	},
});
