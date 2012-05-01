define(function(){
	return function(engine){
		//	The polyfill component polyfills unsupported HTML5 functions when possible.
		engine.c('polyfill')
		.defines({
			requestAnimationFrame:	function(callback, canvas){
				return requestAnimFrame(callback, canvas);
			}
		})
		.run(function(){
			//setup requestanimationframe on support
			window.requestAnimFrame = 
				window.requestAnimationFrame
			||	window.webkitRequestAnimationFrame
			||	window.mozRequestAnimationFrame
			||	window.oRequestAnimationFrame
			||	window.msRequestAnimationFrame
			||	function(callback){
					window.setTimeout(callback, 1000 / 60);
				};
		});
	};
});