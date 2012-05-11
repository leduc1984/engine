﻿define(function(){
	'use strict';
	
	return function(Σ){
		/*
			The system component contains all information and references to the entity js Σ.
			Such as the canvas context, fps, start, stop, canvas.

			You can add the component to entities for quick reference to variables.

			FUTURE
			-add entity definess to allow local usage.
			-perhaps allow users to override the system class for their own custom usage. (new arrays of entities and components)
		*/
		Σ.c('system')
		.defaults({
			clearColor:	'#f9f9f9',
		
			stepSize:	0.03,
			maxTick:	0.05,
		
			running:	false,
		
			sizeX:		10,
			sizeY:		10
		})
		.defines({
			clear:	function(color){
				if(color){
					this.context.fillStyle = color;
					this.context.fillRect(0, 0, this.sizeX, this.sizeY);
				}else{
					this.context.clearRect(0, 0, this.sizeX, this.sizeY);
				}
				
				return this;
			},
		
			start:	function(){
				if(!this.running){
					this.running = true;
					
					var that = this;
					(function m(){
						that.system_loop();
						
						if(that.running){
							that.requestAnimationFrame(m, that.canvas);
						}
					})();
				}
				
				return this;
			},
		
			loop:	function(m){
				this.system_loop = m;
		
				return this;
			},
		
			stop:	function(){
				this.running = false;
				
				return this;
			},
		
			//	scale is currently not implemented!
			init:	function(canvasId, contextType){
				//	add comps here because system is defined earlier than other comps
				this.comp('polyfill tick timestep');
				
				//	setup canvas
				if(Σ.is(canvasId, 'htmlcanvaselement')){
					this.canvas = canvasId;
				}else{
					this.canvas = Σ.$(canvasId);
				}
				
				this.context = this.canvas.getContext(contextType || '2d');
				
				var Σ = Σ.screen = Σ.e('screen');
				
				this.sizeX = Σ.sizeX = this.canvas.width;
				this.sizeY = Σ.sizeY = this.canvas.height;
				
				//	init listeners
				if(Σ._c.keyboard){
					Σ._c.keyboard.i();
				}
				
				if(Σ._c.mouse){
					Σ._c.mouse.i();
				}
				
				if(Σ._c.touch){
					Σ._c.touch.i();
				}
				
				this.system_loop = this.defaultLoop;
				this.second = this.stepSize * 30;
				
				return this;
			},
		
			//	Default main loop
			defaultLoop:	function(){
				this.timestep(Math.min(this.tick() / 1000, this.maxTick), function(){
					//update
					this.update();
				});
				
				//	clear
				this.clear(this.clearColor);
				this.draw();
			},
		
			update:	function(){
				Σ._c.update.update(this.stepSize);
			},
		
			draw:	function(){
				//	renders default drawlist
				Σ.drawlist().drawlist(this.context);
			}
		})
		.run(function(){
			//	create default system
			Σ.system = Σ.sys = Σ.e('system');
		});
	};
});
