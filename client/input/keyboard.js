define(function(){
	'use strict';
	
	return function(engine){
		/*
			The keyboard component allows an entity to listen for keyboard events.

			@usage
			engine.e('keyboard')
			.keydown(function(key, event){
			  engine.log('keydown', key, event);
			})
			.keyup(function(key, event){
			  engine.log('keyup', key, event);
			});
		*/
		engine.c('keyboard')
		.statics({
			//list of listing entities
			l:	[],

			keyCodes: { 
				//	Letters
				65:		'a',
				66:		'b',
				67:		'c',
				68:		'd',
				69:		'e',
				70:		'f',
				71:		'g',
				72:		'h',
				73:		'i',
				74:		'j',
				75:		'k',
				76:		'l',
				77:		'm',
				78:		'n',
				79:		'o',
				80:		'p',
				81:		'q',
				82:		'r',
				83:		's',
				84:		't',
				85:		'u',
				86:		'v',
				87:		'w',
				88:		'x',
				89:		'y',
				90:		'z',
				
				//	Numbers
				48:		'0',
				49:		'1',
				50:		'2',
				51:		'3',
				52:		'4',
				53:		'5',
				54:		'6',
				55:		'7',
				56:		'8',
				57:		'9',
				
				//	Function keys
				112:	'f1',
				113:	'f2',
				114:	'f3',
				115:	'f4',
				116:	'f5',
				117:	'f6',
				118:	'f7',
				119:	'f8',
				120:	'f9',
				121:	'f10',
				122:	'f11',
				123:	'f12',
				
				//	Modifier keys
				16:		'shift',
				17:		'ctrl',	//mac os - control
				18:		'alt',	//mac os key - option opt
				24:		'cmd',	//Mac OS key - also command
				255:	'fn',	//lenovo - function
				
				//	Misc. keys
				8:		'backspace',
				13:		'enter',	//max os - return
				32:		'space',
				27:		'esc',
				9:		'tab',
				20:		'capslock',
				91:		'windows',	//mac os - super
				46:		'delete',	//NOT THE OS X DELETE KEY!
				36:		'home',
				35:		'end',
				33:		'pageup',
				34:		'pagedown',
				
				//	Arrow keys
				37:		'left',
				38:		'up',
				39:		'right',
				40:		'down',
				
				//	Special characters
				96:		'`',
				45:		'-',	//also insert on mac?
				187:	'=',
				219:	'[',
				221:	']',
				220:	'\\',	//it's actually a \ but there's two to escape
				59:		';',
				222:	"'",
				188:	',',
				190:	'.',
				191:	'/'
			},

			/*
				Add modifiers, shift, alt, ctrl.
				.trigger('ctrl+k')
			*/
			event: function(e){
				var that = engine._c.keyboard,
					tagName = (e.target || e.srcElement || {}).tagName;
			
				//disable keyboard keys if focus lost
				if(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA'){
					return;
				}

				var c = e.keyCode || e.which,
					key = that.keyCodes[c];

				if(engine.pressed && engine.pressed.d){
					engine.pressed.d[key] = (e.type == 'keydown');
				}
			
				if(engine.preventDefault && engine.preventDefault.d[key]){
					e.preventDefault();
				}
			
				for(var k = 0; k < that.l.length; k++){
					that.l[k]
					.trigger(e.type, key, e)
					.trigger(e.type + ':' + key, key, e);
				}
			},

		  //initialize function
			i:	function(){
				engine.listener('keydown', this.event);
				engine.listener('keyup', this.event);
				
				//reset all keys
				engine.listener('focus', function(){
					engine.pressed.d = {};
				});
			}
		})
		.init(function(c){
			//add to statics key array
			c.l.push(this);
		})
		.dispose(function(c){
			//remove from statics key array
			c.l.splice(c.l.indexOf(this), 1);
		});
	};
});