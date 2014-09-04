/*jshint devel: true*/
/*global TweenMax: true*/
// /*global FastClick: true*/
/*global Modernizr: true*/



var $m = {

	init: function(){

		if(!Modernizr.inlinesvg){ $m.noSvg.init(); }
		// if(!Modernizr.mq('only all')){ $html.addClass('no-mediaquery'); }
		$m.mq();

		$m.ss.init(); // slide show

		$m.n.init(); // off site navigation

		if($m.s.mq === 'big'){ $m.strip.init(); }

		// $m.sr.init(); // scroll reveal

	}, // end of init

	s: {

		ani: 0.25, // generic animation value

		dom: {

			html: $('html'),
			sw: $('#siteWrapper'),
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

	mq: function(){

		var $html = $m.s.dom.html,
			$bg = $html.css('background-color');

		if($bg === 'rgb(255, 255, 255)'){ $m.s.mq = 'small'; }
		else{ $m.s.mq = 'big'; }

		$html.attr({
			'data-mediaQuery': 'big'
		});

		console.log($m.s.mq);

	}, // end of media query

	noSvg: {

		init: function(){

			$('.svgIcon').each(function(){

				$m.noSvg.addPng($(this));

			});

		}, // end of init

		addPng: function($this){

			var $url = $this.attr('data-noSvg');

			$this.attr({'src': $url});

		} // end of addPng

	}, // end of noSvg

	strip: {

		init: function(){

			var $sw = $m.s.dom.sw,
				$strip = $sw.find('> .strip');

			$strip.each(function(){

				$m.strip.insertImg($(this));

			});

		}, // end of init

		insertImg: function($this){

			var $ms = $this.find('> .center').find('> .mediaShell'),
				$c = ['device', 'screen'], // image content
				$len = $c.length,
				$i, $img, $src;

			for($i = 0; $i < $len; $i++){

				$img = $ms.find('> .' + $c[$i]);
				$src = $img.attr('data-big');
				$img.attr({
					'src': $src
				});

			} // end of statement

		} // endof insert

	}, // end of strip

	ss: {

		init: function(){

			var $ss = $m.s.dom.slide,
				$mq = $m.s.mq;

			// insert initial slider content
			if($mq === 'small'){ $m.ss.small.update($ss, '+'); }
			else{ $m.ss.big.moveOut($ss, '+'); }

			$m.ss.l($ss); // add listeners

		}, //end of init

		s: {

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
							screen: 'animation-screen-iphone'
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
							screen: 'animation-screen-ipad'
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
							screen: 'animation-screen-imac'
						}
					}
				}
			]

		}, // end of settings

		l: function($ss){

			// console.log('adding listeners');

			var $this, $dir, $mq;

			$ss.on('click', '.slide', function(){

				$this = $(this);
				$dir = $m.ss.getDir($this);
				$mq = $m.s.mq;

				if($mq === 'small'){ $m.ss.small.update($ss, $dir); }
				else{ $m.ss.big.moveOut($ss, $dir); }

			});

		}, // end of listeners

		big: {

			moveOut: function($ss, $dir){

				var $ref = $m.ss.getRef($dir),
					$c = $m.ss.s.c[$ref].big,
					$ani = $m.s.ani,
					$ms = $ss.find('#mediaShell'), // media shell
					$db = $ss.find('#dynamicBg'); // dynamic image

				TweenMax.to($ms, $ani, {
					'opacity': '0',
					'transform': 'translateX(10em)',
					'onComplete': $m.ss.big.update.mediaShell,
					'onCompleteParams': [$ref, $c, $ani, $ms]
				});

				TweenMax.to($db, $ani, {
					'opacity': '0',
					'transform': 'translateX(-10em)',
					'onComplete': $m.ss.big.update.dynamicBg,
					'onCompleteParams': [$ref, $c, $ani, $db]
				});

			}, // end of moveOut

			update: {

				mediaShell: function($ref, $c, $ani, $ms){

					// set the class for the media shell
					$ms.attr({
						'data-kind': $c.mediaShell.kind
					});

					// set the device shell
					$ms.find('> .device').attr({
						'src': 'img/' + $c.mediaShell.device + '.png'
					});

					// set the image of stuff
					$ms.find('> .screen').find('> .content').attr({
						'src': 'img/' + $c.mediaShell.screen + '.jpg'
					});

					$m.ss.big.moveIn($ani, $ms); // bring element back into view

				}, // end of mediaShell

				dynamicBg: function($dir, $c, $ani, $db){

					// set the full spectrum background image
					$db.attr({
						'src': 'img/' + $c.bgImage + '.jpg'
					});

					$m.ss.big.moveIn($ani, $db); // bring element back into view

				} // end of dynamicImage

			}, // end of update

			moveIn: function($ani, $this){

				TweenMax.to($this, $ani, {
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


