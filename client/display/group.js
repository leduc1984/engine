define(function(){
	return function(engine){
		engine.c('group')
		.defaults({
			posX:	0,
			posY:	0
		})
		.defines({
			group:	function(){
				var args = [].slice.call(arguments);
				
				for(var i = 0; i < args.length; i++){
					args[i].comp('group').group
				}
			},

			ungroup:	function(e){},

			//	Overwrite old screen functions
			getScreenX:	function(){
				var x = this.posX;
				
				if(this.group){
					x += this.group.posX;
				}
				
				if(this.screen){
					x += this.screen.posX;
				}
				
				return x;
			},

			getScreenY:	function(){
				var y = this.posY;
				
				if(this.group){
					y += this.group.posY;
				}
				
				if(this.screen){
					y += this.screen.posY;
				}
				
				return y;
			},

			//group:	null,

			getGroupX:	function(){
				var x = this.posX;
				
				if(this.group){
					x += this.group.posX;
				}
				
				return x;
			},

			getGroupY:	function(){
				var y = this.posY;
				
				if(this.group){
					y += this.group.posY;
				}
				
				return y;
			},

			setGroupX:	function(x){},

			setGroupY:	function(y){}
		});
	};
});