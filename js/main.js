/*jshint devel: true*/
/*global TweenMax: true*/
// /*global FastClick: true*/
/*global Modernizr: true*/



var $m = {

	init: function(){

		if(!Modernizr.inlinesvg){ $m.noSvg.init(); }
		// if(!Modernizr.mq('only all')){ $html.addClass('no-mediaquery'); }

		$m.ss.init(); // slide show

		$m.n.init(); // off site navigation

		// $m.sr.init(); // scroll reveal

	}, // end of init

	s: {

		ani: 0.25, // generic animation value

		dom: {

			html: $('html'),
			slide: $('#slideShow'),
			ham: $('#hamburger'),
			nav: $('#navigation')

		}, // store references to DOM element

		col: {
			'white': '255, 255, 255',
		}

	}, // end of settings

	g: {

	}, // end of general

	fastClick: function(){

		// FastClick.attach(document.body);

	}, // end of fastClick

	noSvg: {

		init: function(){

			$('.svgIcon').each(function(){

				$m.noSvg.addPng($(this));

			});

		}, // end of init

		addPng: function($this){

			var $url = $this.attr('data-noSvg');

			$this.attr({'src': $url});

			/* var $url = $this.attr('data-noSvg'),
				$img = '<img src="' + $url + '">';

			$this.empty(); // get rid of the SVG element
			$this.html($img); */

		} // end of addPng

	}, // end of noSvg

	ss: {

		init: function(){

			var $ss = $m.s.dom.slide;

			$m.ss.uiSize();

			if($m.ss.s.uiSize === 'small'){ $m.ss.small.update($ss, '+'); }
			else{ $m.ss.big.moveOut($ss, '+'); }
			
			
			
			$m.ss.l($ss);

		}, //end of init

		s: {

			uiSize: null, // load the current SMALL or BIG UI???

			ref: 9999999, // current content reference (set to a large number to that on load it resets back to zero)

			c: [ // content
				{
					small: {
						bgImage: 'slideshow-zombie-small'
					},

					big: {
						bgImage: 'slideshow-zombie-big',
						mediaShell: {
							kind: 'iPhone',
							device: 'media-shell-iphone',
							video: {
								mp4: 'iphone.mp4.mp4',
								webm: 'iphone.webmhd.webm',
								fallBack: 'xxxxxxx.png'
							}
						}
					}
				},
				{
					small: {
						bgImage: 'slideshow-volvo-small'
					},

					big: {
						bgImage: 'slideshow-volvo-big',
						mediaShell: {
							kind: 'iPad',
							device: 'media-shell-ipad',
							video: {
								mp4: 'ipad.mp4.mp4',
								webm: 'ipad.webmhd.webm',
								fallBack: 'xxxxxxx.png'
							}
						}
					}
				},
				{
					small: {
						bgImage: 'slideshow-beach-small'
					},

					big: {
						bgImage: 'slideshow-beach-big',
						mediaShell: {
							kind: 'desktop',
							device: 'media-shell-imac-front',
							video: {
								mp4: 'imac.mp4.mp4',
								webm: 'imac.webmhd.webm',
								fallBack: 'xxxxxxx.png'
							}
						}
					}
				}
			]

		}, // end of settings

		uiSize: function(){

			var $html = $m.s.dom.html,
				$bg = $html.css('background-color');

			console.log($bg);

			if($bg === 'rgb(255, 255, 255)'){ $m.ss.s.uiSize = 'small'; }
			else{ $m.ss.s.uiSize = 'big'; }

			console.log('uiSize = ' + $m.ss.s.uiSize);

		}, // end of uiSize

		l: function($ss){

			// console.log('adding listeners');

			var $this, $dir;

			$ss.on('click', '.slide', function(){

				// console.log('slider click');

				$this = $(this);
				$dir = $m.ss.getDir($this);

				if($m.ss.s.uiSize === 'small'){ $m.ss.small.update($ss, $dir); }
				else{ $m.ss.big.moveOut($ss, $dir); }

				// get direction
				// move content out
				// update current listing
				// update content
				// move content in

			});

		}, // end of listeners

		big: {

			moveOut: function($ss, $dir){

				var $ani = $m.s.ani,
					$ms = $ss.find('#mediaShell'), // media shell
					$db = $ss.find('#dynamicBg'); // dynamic image

				TweenMax.to($ms, $ani, {
					'opacity': '0',
					'transform': 'translateX(10em)',
					'onComplete': $m.ss.big.update,
					'onCompleteParams': [$dir, $ani, $ms, $db]
				});

				TweenMax.to($db, $ani, {
					'opacity': '0',
					'transform': 'translateX(-10em)'
				});

			}, // end of moveOut

			update: function($dir, $ani, $ms, $db){

				var $ref = $m.ss.getRef($dir),
					$c = $m.ss.s.c[$ref].big,
					$vid = $ms.find('> .screen'),
					$html, $typ;

				$ms.attr({
					'data-kind': $c.mediaShell.kind
				});

				$ms.find('> .device').attr({
					'src': 'img/' + $c.mediaShell.device + '.png'
				});

				// --- --- --- ---

				$vid.remove();

				/*$html = '<video autoplay="autoplay" loop="loop" class="screen">' +
							'<source class="mp4" src="vid/' + $c.mediaShell.video.mp4 + '" type="video/mp4">' +
							'<source class="webm" src="vid/' + $c.mediaShell.video.webm + '" type="video/webm">' +
							'Your browser does not support HTML5 video.' +
						'</video>';*/

				// console.log(Modernizr.video.webm);
				console.log(Modernizr.video.h264);

				if(Modernizr.video.h264){

					$typ = $c.mediaShell.video.mp4;

				}else{

					$typ = $c.mediaShell.video.webm;

				} // end of statement

				$html = '<video autoplay loop class="screen" src="vid/' + $typ + '" type="video/mp4" poster="vid/' + $c.mediaShell.video.fallBack + '">' +
							'<img src="'  + $c.mediaShell.video.fallBack +  '">' +
						'</video>';

				$ms.append($html);

				$ms.find('.screen').on('ended', function(){
					this.play();
				});

				/* $vid.find('> .mp4').attr({
					'src': 'vid/' + $c.mediaShell.video.mp4
				});

				$vid.find('> .webm').attr({
					'src': 'vid/' + $c.mediaShell.video.webm
				});

				$vid.get(0).load();
				$vid.get(0).play();

				$vid.get(0).onended = function(e){
					
					console.log('video ended');

					$vid.get(0).play();

				}; */

				// --- --- ---

				/*$ms.find('> .screen').attr({
					'src': 'img/' + $c.mediaShell.video + '.gif'
				});*/

				// $vid.find('.mp4').attr({'src': 'vid/' + $c.mediaShell.video.mp4});
				// $vid.find('.webm').attr({'src': 'vid/' + $c.mediaShell.video.webm});

				// $vid.play();

				// <source class="mp4" src="" type="video/mp4">
				// <source class="webm" src="" type="video/webm">

				// $vid.empty();
				// $vid.append('<source class="mp4" src="vid/' + $c.mediaShell.video.mp4 + '" type="video/mp4">');
				// $vid.append('<source class="webm" src="vid/' + $c.mediaShell.video.webm + '" type="video/webm">');

				// $vid.load();
				// $vid.play();

				$db.attr({
					'src': 'img/' + $c.bgImage + '.jpg'
				});

				$m.ss.big.moveIn($ani, $ms, $db);

			}, // end of update

			moveIn: function($ani, $ms, $db){

				TweenMax.to($ms, $ani, {
					'opacity': '1',
					'transform': 'translateX(0)'
				});

				TweenMax.to($db, $ani, {
					'opacity': '1',
					'transform': 'translateX(0)'
				});

			} // end of moveIn

		}, // end of big

		small: {

			update: function($ss, $dir){

				var $ref = $m.ss.getRef($dir),
					$c = $m.ss.s.c[$ref].small,
					$db = $ss.find('#dynamicBg'); // dynamic image

				$db.attr({
					'src': 'img/' + $c.bgImage + '.jpg'
				});

			}, // end of update

		}, // end of small

		getDir: function($this){

			if($this.hasClass('left')){
				
				return '-';
			
			}else{
				
				return '+';

			} // end of statement

		}, // end of direction

		getRef: function($dir){

			var $ref = $m.ss.s.ref, // get the current reference from the settings
				$len = $m.ss.s.c.length;

				if($dir === '+'){

					$ref ++;

					if($ref >= $len){

						$ref = 0;

					} // end of statement

				}else{

					$ref --;

					if($ref < 0){

						$ref = $len - 1;

					} // end of statement

				} // end of statement

				$m.ss.s.ref = $ref; // store in settings...
				return $ref; // ... then return to current fnc request

		} // end of getRef

	}, // end of slideShow

	n: { // navigation

		init: function(){

			$m.n.l(); // add listeners

		},

		l: function(){

			var $body = $('body'),
				$ham = $m.s.dom.ham;

			$ham.on('click', function(){

				if($body.attr('data-nav') === 'active'){ $m.n.a.closeNav($body, $ham); }
				else{ $m.n.a.openNav($body, $ham); }

			});

		}, // end of listeners

		a: {

			openNav: function($body, $ham){

				// console.log('open nav');

				// $ham ==> change to close icon

				$body.attr({
					'data-nav': 'active'
				});

			}, // end of open

			closeNav: function($body, $ham){

				// console.log('close nav');

				// $ham ==> change to open icon

				$body.attr({
					'data-nav': 'dormant'
				});

			} // end of close

		} // end of actions

	}, // end if nav

	sr: function(){



	} // end of scroll reveal

}; // end of $m module container

$(document).ready(function(){

	$m.init();

}); // end of document.ready


