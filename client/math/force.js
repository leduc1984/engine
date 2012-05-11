﻿define(function(){
	'use strict';
	
	return function(Σ){
		/*
			The Force component adds velocity, acceleration and other physical properties to an entity.

			This does not implement collision detection! This allows an entity to move fluidly
			through 2d, with gravity, and friction.

			You can add hit collision check by defining a hitmap. Like so:

			var mountainHits = Σ.e('hitmap');

			Σ.e('force')
			.attr(hitmap:mountainHits);

			//or define a hitmap for all physics objects
			Σ.hitmap = Σ.e('hitmap');

			var e = Σ.e('force');

			e.hitmap == Σ.hitmap //true

			Warning - this component is not delta time safe. It assumes a fixed timestep.
		*/
		return Σ.c('force')
		.requires('update')
		.statics({
			graX:	0,
			graY:	0
		})
		.defaults({
			posX:	0,
			posY:	0,
			
			velX:	0,
			velY:	0,
			
			friX:	0.4,
			friY:	0.4,
			
			accX:	0,
			accY:	0,
			
			resX:	0.4,
			resY:	0.4,
			
			mass:	1
		})
		.namespaces({
			update:	function(){
				this.velX = this.force(this.velX, this.accX, this.friX, this.graX, this.mass);
				this.velY = this.force(this.velY, this.accY, this.friY, this.graY, this.mass);
				
				//check collisions and get result
				if(this.hitmap){
					this.aftermath(this.hitmap.checkHit(this));
				}else{
					this.aftermath(this.posX + this.velX, this.posY + this.velY);
				}
			}
		})
		.defines({
			aftermath:	function(posx, posy, hitx, hity, tarx, tary){
				if(Σ.is(posx, 'object')){
					hitx = posx.hitX;
					hity = posx.hitY;
					
					tarx = posx.tarX;
					tary = posx.tarY;
					
					posy = posx.posY;
					posx = posx.posX;
				}
				
				this.posX = posx;
				this.posY = posy;
				
				if(hitx){
					this.velX = this.forceRes(this.velX, this.resX);
				}
				
				if(hity){
					this.velY = this.forceRes(this.velY, this.resY);
				}
				
				return this.trigger('aftermath', hitx, hity, tarx, tary);
			},
			
			forceRes:	function(vel, res){
				return vel * -res;
			},
			
			forceGra:	function(gra, mas){
				return gra * mas;
			},
			
			forceVel:	function(vel, acc, fri){
				return (vel + acc) * fri;
			},
			
			force:	function(vel, acc, fri, gra, mas){
				var v = this.forceVel(vel, acc, fri) + this.forceGra(gra, mas);
				
				if(Math.abs(v) < 0.01){
					v = 0;
				}
				
				return v;
			},
			
			isIdle:	function(offset){
				offset = offset || 0;
				
				return Math.abs(this.velY + this.velX + this.accX + this.accY) <= offset;
			}
		})
		.init(function(c){
			//setup defaults
			this.def({
				hitmap:	Σ.hitmap,
				graX:	c.graX,
				graY:	c.graY
			});
			
			this.on('update', this.force_update);
		})
		.dispose(function(){
			this.off('update', this.force_update);
		});
	};
});