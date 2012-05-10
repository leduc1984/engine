define(function(){
	'use strict';
	
	return function(engine){
		/*
			The text component displays font on screen using the canvas font api.

			//create font
			engine.e('text')
			.defines({
				text:	'Texting Message',
				textColor:	'#ff0000'
			});

			TODO implement size
		*/
		engine.c('text')
		.requires('draw')
		.defaults({
			font:	"14px sans-serif",
			textColor:	'#000000',
			textAlign:	'left',
			textBaseline:	'top',
			lineHeight:	15
		})
		.defines({
			visible:	function(){
				return this._text && this.parent('draw', 'visible');
			},

			text:	function(t){
				if(engine.is(t)){
					//convert to string
					t = Array.prototype.join.call(arguments, ' ');

					this.text_lines = t.split('\n');
					this._text = t;
					
					//set text width
					if(engine.sys.context){
						var c = engine.sys.context;
						
						c.save();
						c.font = this.font;

						this.sizeX = 0;

						var w = 0;
						for(var i in this.text_lines){
							w = c.measureText(this.text_lines[i]).width;
							if(w > this.sizeX){
								this.sizeX = w;
							}
						}

						c.restore();
					}

					//set height
					this.sizeY = this.text_lines.length * this.lineHeight;

					return this;
				}
				
				return this._text;
			},

			draw:	function(c){
				c.font = this.font;
				c.fillStyle = this.textColor;
				c.textAlign = this.textAlgin;
				c.textBaseline = this.textBaseline;

				//multi-line
				var lines = this.text_lines;
				for(var i = 0, l = lines.length; i < l; i++){
					c.fillText(lines[i], -this.regX, -this.regY + (i * this.lineHeight));
				}

				return this;
			}
		});
	};
});