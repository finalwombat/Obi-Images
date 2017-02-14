(function($){

"use strict";

$(document).ready(function() {


	var win_h = $(window).height(),
		win_w = $(window).width(),
		home_slides_arr = [],
		is_moving = false;

	$("body").fitVids();

/*==========================================================================================================================================
/*==========================================================================================================================================
	Functions
============================================================================================================================================
============================================================================================================================================*/

	function render() {


		// Gallery

			// Albums - Grid
				if($(".gallery-albums.grid").length > 0) {

					$(".gallery-albums.grid .album-cont img").each(function(index, el) {

						var o_width = $(this).attr('data-width'),
							o_height = $(this).attr('data-height'),
							c_width = $(this).width();

						$(this).height(c_width*o_height/o_width);
					});
					masonry_init($(".gallery-albums .albums"), ".gallery-albums .album");
				}

			// Grid
				if($(".gallery-images.grid").length > 0) {

					$(".gallery-images img").each(function(index, el) {

						var o_width = $(this).attr('data-width'),
							o_height = $(this).attr('data-height'),
							c_width = $(this).width();

						$(this).height(c_width*o_height/o_width);
					});
					masonry_init($(".gallery-images .images"), ".img");
				}

			// Horizontal - Centered
				if($(".gallery-h.centered").length > 0) {

					var total_width = 0,
						first_img = $('.gallery-h .container .img:first-child'),
						last_img = $('.gallery-h .container .img:last-child'),
						active_img = $(".gallery-h .img.active"),
						imgs_length = $('.gallery-h .container .img').length,
						container_margin = (win_w<=768)? 25 : 90;


					$(".gallery-h.centered .container .img a").each(function(index, el) {

						var img = $(this).find('img'),
							img_h = $(this).parent().height(),
							img_o_w = img.attr('data-width'),
							img_o_h = img.attr('data-height'),
							img_c_w = img_h*img_o_w/img_o_h;

						img.width(img_c_w);

						$(this).width(img_c_w);
					});

					$('.gallery-h .container .img').each(function(index, el) {

						var value = (imgs_length == (index-1))? 0 : 30;
						total_width += $(this).width() + value;
					});

					var extra_amount_left = (win_w / 2) - ( (first_img.width() / 2) + container_margin ),
						extra_amount_right = (win_w / 2) - ( (last_img.width() / 2) + container_margin );

					total_width += extra_amount_left + extra_amount_right;

					$(".gallery-h .container").width(total_width);

					$(".gallery-h .container").css({
						'padding-left': extra_amount_left+'px',
						'padding-right': extra_amount_right+'px'
					});

					//Centering on active image
					var active_index = active_img.index() + 1,
						req_width = 0;

					if(active_index != 1) {

						for (var i = 0; i < active_index; i++) {

							var current_img = $('.gallery-h .container .img:eq('+i+')');

							if(i == 0 || (i+1) == active_index) {
								req_width += (current_img.width()/2);
							}
							else {
								req_width += current_img.width();
							}

							if((i+1) != active_index) {
								req_width += 30;
							}
						}

						$(".gallery-h .container").css('left', '-'+req_width+'px');
					}

					// Navigation - Mouse Wheel
					$(".gallery-h.centered .gallery .container").mousewheel(function(event) {

						var direction = (event.deltaY == 1)? 'left' : 'right';

						gallery_scroll(direction);
						event.preventDefault();
					});

					// Navigation - Left Arrow
					$(".gallery-h.centered .nav .prev").click(function(event) {
						event.preventDefault();

						gallery_scroll('left');
					});

					// Navigation - Right Arrow
					$(".gallery-h.centered .nav .next").click(function(event) {
						event.preventDefault();

						gallery_scroll('right');
					});
				}

	}

	function resize() {

		win_w = $(window).width();
		win_h = $(window).height();


		// Header
			if(win_w > 1100) {
				$("header nav").fadeIn(200);

				if($("header nav").getNiceScroll().length >= 1) {
					$("header nav").getNiceScroll().remove();
					$("header nav").css('overflow', 'visible');
				}
			}
			else {
				if($("header nav").getNiceScroll().length <= 0) {
					$("header nav").niceScroll({
						mousescrollstep: 60,
						cursorcolor: "#959595",
				        cursorborder: "0px solid #fff",
					});
				}
			}


		// Gallery - Albums
			if($(".gallery-albums").length > 0) {

				$(".gallery-albums .album-cont img").each(function(index, el) {

					var o_width = $(this).attr('data-width'),
						o_height = $(this).attr('data-height'),
						c_width = $(this).width();

					if($(this).is(':visible')) {
						$(this).height(c_width*o_height/o_width);
					}
				});
			}

		// Gallery - Horizontal Centered
			if($(".gallery-h.centered").length > 0) {

				var total_width = 0,
					first_img = $('.gallery-h .container .img:first-child'),
					last_img = $('.gallery-h .container .img:last-child'),
					active_img = $(".gallery-h .img.active"),
					imgs_length = $('.gallery-h .container .img').length,
					container_margin = (win_w<=768)? 25 : 90;

				$('.gallery-h .container').width(99999);

				$(".gallery-h .container .img a").each(function(index, el) {

					var anchor = $(this),
						img = $(this).find('img'),
						img_w = img.attr('data-width'),
						img_h = img.attr('data-height'),
						current_height = img.height();

					img.width((current_height*img_w)/img_h);
					anchor.width((current_height*img_w)/img_h);
				});

				$('.gallery-h .container .img').each(function(index, el) {

					var value = (imgs_length == (index-1))? 0 : 30;
					total_width += $(this).width() + value;
				});

				var extra_amount_left = (win_w / 2) - ( (first_img.width() / 2) + container_margin ),
					extra_amount_right = (win_w / 2) - ( (last_img.width() / 2) + container_margin );

				total_width += extra_amount_left + extra_amount_right;

				$(".gallery-h .container").width(total_width);

				$(".gallery-h .container").css({
					'padding-left': extra_amount_left+'px',
					'padding-right': extra_amount_right+'px'
				});

				//Centering on active image
				var active_index = active_img.index() + 1,
					req_width = 0;

				if(active_index != 1) {

					for (var i = 0; i < active_index; i++) {

						var current_img = $('.gallery-h .container .img:eq('+i+')');

						if(i == 0 || (i+1) == active_index) {
							req_width += (current_img.width()/2);
						}
						else {
							req_width += current_img.width();
						}

						if((i+1) != active_index) {
							req_width += 30;
						}
					}

					$(".gallery-h .container").css('left', '-'+req_width+'px');

				}

			}

	}

	function gallery_scroll(direction) {

		var active_img = $(".gallery-h .img.active"),
			next_img = $(".gallery-h .img.active").next(),
			prev_img = $(".gallery-h .img.active").prev(),
			count = $(".gallery-h .img").length,
			current_left = parseInt($(this).css('left'));

		if( (active_img.index() == 0 && direction == "left") || (active_img.index() == (count-1) && direction == "right") ) {
			is_moving = false;
		}
		else if(!is_moving) {

			is_moving = true;

			if(direction == "right") {

				var scroll_amount = (active_img.width()/2) + (next_img.width()/2) + 30;
				$(".gallery-h .container").animate({left: "-="+scroll_amount},1000,'easeOutExpo',function(){
					is_moving = false;
				});

				active_img.removeClass('active');
				next_img.addClass('active');
			}
			else {
				var scroll_amount = (active_img.width()/2) + (prev_img.width()/2) + 30;
				$(".gallery-h .container").animate({left: "+="+scroll_amount},1000,'easeOutExpo',function(){
					is_moving = false;
				});

				active_img.removeClass('active');
				prev_img.addClass('active');
			}
		}
	}

	function masonry_init(selector, item) {

		selector.isotope({
			layoutMode: 'masonry',
			percentPosition: true,
			masonry: {
			  	columnWidth: item
			}
		});
	}

	function toggleFullScreen(elem) {

	    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
	        if (elem.requestFullScreen) {
	            elem.requestFullScreen();
	        } else if (elem.mozRequestFullScreen) {
	            elem.mozRequestFullScreen();
	        } else if (elem.webkitRequestFullScreen) {
	            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	        } else if (elem.msRequestFullscreen) {
	            elem.msRequestFullscreen();
	        }
	    } else {
	        if (document.cancelFullScreen) {
	            document.cancelFullScreen();
	        } else if (document.mozCancelFullScreen) {
	            document.mozCancelFullScreen();
	        } else if (document.webkitCancelFullScreen) {
	            document.webkitCancelFullScreen();
	        } else if (document.msExitFullscreen) {
	            document.msExitFullscreen();
	        }
	    }
	}

	function random_slide(num) {

		var rand = Math.floor((Math.random() * num));

		if(home_slides_arr.length == 0 || home_slides_arr[0] != rand) {
			home_slides_arr[0] = rand;
			$(".striped-slides .cols .flexslider:eq("+rand+")").flexslider("next");
		}
		else {
			random_slide(num);
		}
	}


	$(window).resize(function(event) {
		resize();
	});

/*==========================================================================================================================================
/*==========================================================================================================================================
	Handlers
============================================================================================================================================
============================================================================================================================================*/

	// Preloader
		if($(".contact-1").length <= 0 && $(".contact-2").length <= 0 && $("body > .loader").length > 0) {

			var bg_color = $("body > .loader").attr('data-background-color') || '#000000',
				text_color = $("body > .loader").attr('data-text-color') || '#ffffff';

			$("body > .loader").before('<style id="cosy-custom-styler" type="text/css">.loader .circle{border: 2px solid '+text_color+';border-right-color: transparent;}</style>');
			$("#cosy-custom-styler").append('.loader p{color: '+text_color+';}body > .loader{background-color: '+bg_color+';}');

			var imgs = $("img:not('.lazy')").length,
				loaded_imgs = 0;


			if($(".gallery-h.normal").length > 0) {

	    		$("img.lazy").lazyload({
	    			threshold : 400,
				    effect : "fadeIn",
				    container : $(".gallery"),
				    skip_invisible : true
				});
	    	}
			else if($(".gallery-h.centered").length > 0) {

	    		$("img.lazy").lazyload({
	    			threshold : 400,
				    effect : "fadeIn",
				    container : $(".gallery .container"),
				    skip_invisible : true
				});
	    	}
	    	else {

	    		$("img.lazy").lazyload({
	    			threshold : 200,
				    effect : "fadeIn",
				    container : $(".inner-wrapper"),
				    skip_invisible : true,
				    failure_limit: 100
				});
	    	}

			if(imgs <= 0) {
				render();

				$("body > .loader").delay(1500).fadeOut(200, function() {
		    		$("body").addClass('loaded');
		    	});
			}
			else {
				$("img:not('.lazy')").each(function(index, el) {

					$(this).imagesLoaded(function(){
						loaded_imgs++;

						if(loaded_imgs == imgs) {

							render();

							$("body > .loader").delay(1500).fadeOut(200, function() {
					    		$("body").addClass('loaded');
					    	});
						}
					});
				});
			}
		}
		else {

			render();
			$("body > .loader").fadeOut(300, function() {
	    		$("body").addClass('loaded');
	    	});
		}


	// Scrollbar & Flexslider
		if($(".wrapper > .inner-wrapper").length > 0) {

			$(".wrapper > .inner-wrapper").niceScroll({
				mousescrollstep: 60,
				cursorcolor: "#959595",
		        cursorborder: "0px solid #fff",
			});

			if($(".inner-wrapper .flexslider").length > 0) {

				var fs_slideshow_speed = 6000,
					fs_animation_speed = 2000;

				$(".inner-wrapper .flexslider").flexslider({

				    prevText: "",
				    nextText: "",
				    animation: 'fade',
				    easing: "linear",
				    slideshow: true,
				    slideshowSpeed: fs_slideshow_speed,
				    animationSpeed: fs_animation_speed,
				    controlNav: false,
				    directionNav: false
				});


				// Navigation Controls - Previous
				$(".inner-wrapper .flexslider .nav .prev").click(function(event) {
					event.preventDefault();

					$(".inner-wrapper .flexslider").flexslider('prev');
				});

				// Navigation Controls - Next
				$(".inner-wrapper .flexslider .nav .next").click(function(event) {
					event.preventDefault();

					$(".inner-wrapper .flexslider").flexslider('next');
				});
			}
		}


/*==========================================================================================================================================
/*==========================================================================================================================================
	Header
============================================================================================================================================
============================================================================================================================================*/

	// Dropdown effect
		$("header nav li").hover(function() {

			    if ( $(this).children('ul').length > 0  && !$(".mobile-navigation").is(':visible') ) {

			    	var children = $(this).find('> ul'),
			    		elem = $(this),
			    		elemOff = parseInt($(this).offset().left),
			    		elemWidth = elem.width();

			        if((elemOff + 200 + elemWidth) > win_w) {
			        	children.addClass('edge');
			        }

			        $(this).find('> ul').fadeIn(300);
			    }
			}, function() {

			    if ( $(this).children('ul').length > 0 && !$(".mobile-navigation").is(':visible') ) {
			        $(this).find('> ul').stop().fadeOut(300);
			    }
		});


	// Unfolding sub-menus in responsive mode.
		$("header nav li a").click(function(event) {

		    if ( $(this).parent().children('ul').length > 0  && $(".mobile-navigation").is(':visible') ) {

		 		event.preventDefault();
		        $(this).parent().find('> ul').slideToggle(300);
		    }
		});


	// Adding Scrollbar
		if($("header").length > 0 && win_w <= 1024) {

			$("header nav").niceScroll({
				mousescrollstep: 60,
				cursorcolor: "#959595",
		        cursorborder: "0px solid #fff",
			});
		}


	// Mobile navigation
		$(".mobile-navigation").click(function(event) {

		    event.preventDefault();

		    $("header nav").slideToggle(100);
		});


	// Adding arrows for mobile menu
		if($("header").length > 0) {

			$("header nav .mCSB_container > ul > li > a").each(function(index, el) {

				if(win_w <= 1024 && $(this).parent().children('ul').length > 0) {

					$(this).append('<span class="arrow-down icon1-chevron-down"></span>');
				}
			});
		}


/*==========================================================================================================================================
/*==========================================================================================================================================
	Gallery
============================================================================================================================================
============================================================================================================================================*/


	// Slideshow - Vertical & Horizontal Nav


	// Horizontal - Centered
		if($(".gallery-h.centered").length > 0) {

			$(".gallery-h.centered .container .img a").magnificPopup({

			    type: 'image',
			    closeOnContentClick: true,
			    mainClass: 'mfp-fade',
			    preloader: true,

			    gallery: {
				    enabled: true,
					navigateByImgClick: true,
					arrowMarkup: '<button title="%title%" type="button" class="arrow-%dir%"></button>', // markup of an arrow button
					tPrev: 'Previous (Left arrow key)', // title for left button
					tNext: 'Next (Right arrow key)', // title for right button
					tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
				}
			});
		}


	// Albums
		if($(".gallery-albums").length > 0) {

			// Filters
			$(".gallery-albums .filters a").click(function(event) {
				event.preventDefault();

				var target = $(this).attr('data-filter'),
					style = $(this).parent().attr('data-style') || 'fade';

				if(!$(this).hasClass('active')) {

					if(style == "scale") {
						$(".gallery-albums .albums").isotope({ filter: target }).on( 'layoutComplete',
							function( event, laidOutItems ) {
								$(window).resize();
							}
						);
					}
					else {
						if(target == "*") {

							$(".gallery-albums").removeClass('filtered');
							$(".gallery-albums .album.active").removeClass('active');
						}
						else {

							$(".gallery-albums").addClass('filtered');
							$(".gallery-albums .album.active").removeClass('active');

							$(".gallery-albums .album"+target).addClass('active');
						}
					}

					$(".gallery-albums .filters a.active").removeClass('active');
					$(this).addClass('active');
				}
			});

			// Love icon
			$(".gallery-albums .album .love").click(function(event) {
				event.preventDefault();

				if($(this).is(':visible')) {

					var id = $(this).parent().attr('href');

					$(this).next().fadeIn(200, function() {
						$(this).prev().fadeOut(100);
						$.cookie(id, 1, { expires : 1000 });
					});
				}
			});

			$(".gallery-albums .album").each(function(index, el) {

				var id = $(this).find('.overlay').attr('href'),
					love = $(this).find('.love');

				if(typeof $.cookie(id) !== 'undefined') {

					love.next().fadeIn(200, function() {
						love.fadeOut(100);
					});
				}
			});

			$(".gallery-albums .album .love-2").click(function(event) {
				event.preventDefault();

				var id = $(this).parent().attr('href'),
					love = $(this).prev();

				if(typeof $.cookie(id) !== 'undefined') {

					if($.removeCookie(id)) {
						$(this).fadeOut(100, function() {
							love.fadeIn(200);
						});
					}
				}
			});
		}


	// Images
		if($(".gallery-images").length > 0) {

			// Filters
			$(".gallery-images .filters a").click(function(event) {
				event.preventDefault();

				var target = $(this).attr('data-filter'),
					style = $(this).parent().attr('data-style') || 'fade';

				if(!$(this).hasClass('active')) {

					if(style == "scale") {
						$(".gallery-images .images").isotope({ filter: target }).on( 'layoutComplete',
							function( event, laidOutItems ) {
								$(window).resize();
							}
						);
					}
					else {
						if(target == "*") {

							$(".gallery-images").removeClass('filtered');
							$(".gallery-images .img.active").removeClass('active');
						}
						else {


							$(".gallery-images").addClass('filtered');
							$(".gallery-images .img.active").removeClass('active');

							$(".gallery-images .img"+target).addClass('active');
						}
					}

					$(".gallery-images .filters a.active").removeClass('active');
					$(this).addClass('active');
				}
			});

			// Love icon
			$(".gallery-images .img .love").click(function(event) {
				event.preventDefault();

				if($(this).is(':visible')) {

					var id = $(this).parent().find('a').attr('href');

					if($(this).parent().find('.preview-2').length > 0) {
						id = $(this).parent().find('.preview-2').attr('href');
					}
					if($(".gallery-images").hasClass('style-title')) {
						id = $(this).parent().find('a').attr('href');
					}

					$(this).next().fadeIn(200, function() {
						$(this).prev().fadeOut(100);
						$.cookie(id, 1, { expires : 1000 });
					});
				}
			});

			$(".gallery-images .img").each(function(index, el) {

				var id = $(this).find('.overlay .preview').attr('href'),
					love = $(this).find('.love');

				if($(this).find('.preview-2').length > 0) {
					id = $(this).find('.preview-2').attr('href');
				}
				if($(".gallery-images").hasClass('style-title')) {
					id = $(this).find('.overlay a').attr('href');
				}

				if(typeof $.cookie(id) !== 'undefined') {

					love.next().fadeIn(200, function() {
						love.fadeOut(100);
					});
				}
			});

			$(".gallery-images .img .love-2").click(function(event) {
				event.preventDefault();

				var id = $(this).parent().find('.preview').attr('href'),
					love = $(this).prev();

				if($(this).parent().find('.preview-2').length > 0) {
					id = $(this).parent().find('.preview-2').attr('href');
				}
				if($(".gallery-images").hasClass('style-title')) {
					id = $(this).parent().find('a').attr('href');
				}

				if(typeof $.cookie(id) !== 'undefined') {

					if($.removeCookie(id)) {
						$(this).fadeOut(100, function() {
							love.fadeIn(200);
						});
					}
				}
			});

			$(".gallery-images .img .preview-2, .gallery-images .img .preview-3").magnificPopup({

			    type: 'image',
			    closeOnContentClick: true,
			    mainClass: 'mfp-fade',
			    preloader: true,

			    gallery: {
				    enabled: true,
					navigateByImgClick: true,
					arrowMarkup: '<button title="%title%" type="button" class="arrow-%dir%"></button>', // markup of an arrow button
					tPrev: 'Previous (Left arrow key)', // title for left button
					tNext: 'Next (Right arrow key)', // title for right button
					tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
				}
			});

			// On Image Click
			$(".gallery-images .img a.img-cont").magnificPopup({

			    type: 'iframe',
			    closeOnContentClick: false,
			    mainClass: 'mfp-fade',
			    preloader: true,
			    iframe: {
						markup: '<div class="mfp-iframe-scaler">'+
						        '<div class="mfp-close"></div>'+
						        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
						      '</div>',

						patterns: {
							youtube: {
							  index: 'youtube.com/',
							  id: 'v=',
							  src: '//www.youtube.com/embed/%id%?autoplay=1'
							},
							vimeo: {
							  index: 'vimeo.com/',
							  id: '/',
							  src: '//player.vimeo.com/video/%id%?autoplay=1'
							},
							gmaps: {
							  index: '//maps.google.',
							  src: '%id%&output=embed'
							}
						},
						srcAction: 'iframe_src',
				}
			});

			$(".gallery-images .img .preview").magnificPopup({

			    type: 'image',
			    closeOnContentClick: true,
			    mainClass: 'mfp-fade',
			    preloader: true,

			    gallery: {
				    enabled: true,
					navigateByImgClick: true,
					arrowMarkup: '<button title="%title%" type="button" class="arrow-%dir%"></button>', // markup of an arrow button
					tPrev: 'Previous (Left arrow key)', // title for left button
					tNext: 'Next (Right arrow key)', // title for right button
					tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
				}
			});

			$(".gallery-images.style-title .img .overlay a:not('.video')").magnificPopup({

			    type: 'image',
			    closeOnContentClick: true,
			    mainClass: 'mfp-fade',
			    preloader: true,

			    gallery: {
				    enabled: true,
					navigateByImgClick: true,
					arrowMarkup: '<button title="%title%" type="button" class="arrow-%dir%"></button>', // markup of an arrow button
					tPrev: 'Previous (Left arrow key)', // title for left button
					tNext: 'Next (Right arrow key)', // title for right button
					tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
				}
			});

			$(".gallery-images.style-title .img .overlay a.video").magnificPopup({

			    type: 'iframe',
			    closeOnContentClick: false,
			    mainClass: 'mfp-fade',
			    preloader: true,
			    iframe: {
						markup: '<div class="mfp-iframe-scaler">'+
						        '<div class="mfp-close"></div>'+
						        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
						      '</div>',

						patterns: {
							youtube: {
							  index: 'youtube.com/',
							  id: 'v=',
							  src: '//www.youtube.com/embed/%id%?autoplay=1'
							},
							vimeo: {
							  index: 'vimeo.com/',
							  id: '/',
							  src: '//player.vimeo.com/video/%id%?autoplay=1'
							},
							gmaps: {
							  index: '//maps.google.',
							  src: '%id%&output=embed'
							}
						},
						srcAction: 'iframe_src',
				}
			});
		}


/*==========================================================================================================================================
/*==========================================================================================================================================
	Pages
============================================================================================================================================
============================================================================================================================================*/


	// Contact Us

		// Form Submit Validation
			$(".contact-1 form input[type=button], .contact-2 form input[type=button]").click(function(event) {
				event.preventDefault();

				var current_form = $(this).parent(),
					form_action  = current_form.attr('action');


				if(current_form.find("input[type=text]").val() == "" || current_form.find("input[type=email]").val() == "" || current_form.find("textarea").val() == "" ){

					current_form.find("input, textarea").each(function(index, el) {

						if ($(this).val() == "") {
							$(this).addClass('error');
						}
						else {
							$(this).removeClass('error');
						}
					});
				}
				else{

					current_form.find("input:not([type=button]), textarea").each(function(index, el) {

						$(this).removeClass('error');
					});

					$.post(form_action, current_form.serialize(), function(data) {
						if(data == 'success'){

							current_form.find('.message-info').addClass('success').text('Message sent successfully.');

							setTimeout(function(){
								current_form.find('.message-info').removeClass('success');
							},5000);

							current_form.find("input:not([type=button])").val('');
							current_form.find("textarea").val('');
						}
						else{
							current_form.find('.message-info').addClass('fail');
							current_form.find('.message-info').text('Message couldn\'t be sent.');
							setTimeout(function(){
								current_form.find('.message-info').removeClass('fail');
							},5000);
						}
					});
				}
			});


		// Contact 2

			// Map Initialization
				if($(".contact-2 .map").length > 0) {

					var	add = $(".contact-2 .map").attr('data-address') || 'London, United Kindgom';

					$(".map-content").gMap({

					    address: add,
					    zoom: 12,
					    scrollwheel: true,
					    maptype: 'ROADMAP',

					    controls: {
					           panControl: false,
					           zoomControl: true,
					           mapTypeControl: false,
					           scaleControl: false,
					           streetViewControl: false,
					           overviewMapControl: false
					    },
					    markers: [
					        {
					            address: add
					        }
					    ]
					});
				}

			// Map Open
				$(".contact-2 .map .open").click(function(event) {
					event.preventDefault();

					$(this).fadeOut(300);
				});
});


})(jQuery);
