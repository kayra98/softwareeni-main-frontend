(function ($) {
	"use strict";


	var windowOn = $(window);

	// 01. PreLoader Js
	windowOn.on('load', function () {
		$("#loading").fadeOut(500);
	});

	/*=============================================
		=    		 wow			      =
	=============================================*/
	new WOW().init();

	/*=============================================
		=          Data Background               =
	=============================================*/
	$("[data-background]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
	})

	function back_to_top() {
		var btn = $('#back_to_top');
		var btn_wrapper = $('.back-to-top-wrapper');

		windowOn.scroll(function () {
			if (windowOn.scrollTop() > 300) {
				btn_wrapper.addClass('back-to-top-btn-show');
			} else {
				btn_wrapper.removeClass('back-to-top-btn-show');
			}
		});

		btn.on('click', function (e) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 }, '300');
		});
	}
	back_to_top();

	/*=============================================
		=           Data Color             =
	=============================================*/
	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});


	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function () {
		$('a.section-link[href*="#"]:not([href="#"])').on('click', function () {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: (target.offset().top - 80)
					}, 1200, "easeInOutExpo");
					return false;
				}
			}
		});
	});


	/*=============================================
		=    		Mobile Menu			      =
	=============================================*/
	// Multiple initialization methods for server compatibility
	function initializeMobileMenu() {
		console.log('Initializing mobile menu...');
		
		//SubMenu Dropdown Toggle
		if ($('.tgmenu__wrap li.menu-item-has-children ul').length) {
			$('.tgmenu__wrap .navigation li.menu-item-has-children').append('<div class="dropdown-btn"><span class="plus-line"></span></div>');
		}

		//Mobile Nav Hide Show
		if ($('.tgmobile__menu').length) {
			console.log('Mobile menu container found');
			
			var mobileMenuContent = $('.tgmenu__wrap .tgmenu__main-menu').html();
			if (mobileMenuContent) {
				$('.tgmobile__menu .tgmobile__menu-box .tgmobile__menu-outer').append(mobileMenuContent);
				console.log('Mobile menu content populated');
			}

			//Dropdown Button
			$(document).off('click.mobileDropdown').on('click.mobileDropdown', '.tgmobile__menu li.menu-item-has-children .dropdown-btn', function () {
				$(this).toggleClass('open');
				$(this).prev('ul').slideToggle(300);
			});
			
			//Menu Toggle Btn - Multiple event binding for server compatibility
			$(document).off('click.mobileToggle').on('click.mobileToggle', '.mobile-nav-toggler', function (e) {
				e.preventDefault();
				e.stopPropagation();
				console.log('Hamburger menu clicked!');
				$('body').addClass('mobile-menu-visible');
				return false;
			});
			
			// Direct binding as fallback
			$('.mobile-nav-toggler').off('click.directToggle').on('click.directToggle', function (e) {
				e.preventDefault();
				e.stopPropagation();
				console.log('Direct hamburger menu clicked!');
				$('body').addClass('mobile-menu-visible');
				return false;
			});

			//Menu Close - Multiple binding methods
			$(document).off('click.mobileClose').on('click.mobileClose', '.tgmobile__menu-backdrop, .tgmobile__menu .close-btn, .tgmobile__menu .navigation li a', function (e) {
				console.log('Menu close clicked!');
				$('body').removeClass('mobile-menu-visible');
			});
			
			// Direct close binding
			$('.tgmobile__menu-backdrop, .tgmobile__menu .close-btn').off('click.directClose').on('click.directClose', function (e) {
				console.log('Direct menu close clicked!');
				$('body').removeClass('mobile-menu-visible');
			});
		} else {
			console.error('Mobile menu container not found!');
		}
		
		console.log('Mobile menu initialization complete');
	}
	
	// Initialize on DOM ready
	$(document).ready(function() {
		initializeMobileMenu();
	});
	
	// Re-initialize on window load as fallback
	$(window).on('load', function() {
		setTimeout(function() {
			initializeMobileMenu();
		}, 100);
	});
	
	// Vanilla JS fallback for servers with jQuery issues
	document.addEventListener('DOMContentLoaded', function() {
		setTimeout(function() {
			var togglers = document.querySelectorAll('.mobile-nav-toggler');
			var closeElements = document.querySelectorAll('.tgmobile__menu-backdrop, .tgmobile__menu .close-btn');
			
			togglers.forEach(function(toggler) {
				toggler.addEventListener('click', function(e) {
					e.preventDefault();
					console.log('Vanilla JS: Hamburger clicked!');
					document.body.classList.add('mobile-menu-visible');
				});
			});
			
			closeElements.forEach(function(closer) {
				closer.addEventListener('click', function(e) {
					console.log('Vanilla JS: Menu close clicked!');
					document.body.classList.remove('mobile-menu-visible');
				});
			});
			
			console.log('Vanilla JS mobile menu initialized');
		}, 200);
	});


	/*=============================================
		=     Menu sticky & Scroll to top      =
	=============================================*/
	$(window).on('scroll', function () {
		var scroll = $(window).scrollTop();
		if (scroll < 245) {
			$("#sticky-header").removeClass("sticky-menu");
			$('.scroll-to-target').removeClass('open');

		} else {
			$("#sticky-header").addClass("sticky-menu");
			$('.scroll-to-target').addClass('open');
		}
	});


	
	if ($('.tg-header-height').length > 0) {
		var headerHeight = document.querySelector(".tg-header-height");      
		var setHeaderHeight = headerHeight.offsetHeight;	
		
		$(".tg-header-height").each(function () {
			$(this).css({
				'height' : setHeaderHeight + 'px'
			});
		});
	  }


	/*=============================================
		=    		 Scroll Up  	         =
	=============================================*/
	if ($('.scroll-to-target').length) {
		$(".scroll-to-target").on('click', function () {
			var target = $(this).attr('data-target');
			// animate
			$('html, body').animate({
				scrollTop: $(target).offset().top - 50
			}, 1000);

		});
	};


	////////////////////////////////////////////////////
	// 13. Swiper Js
	const projectswiper = new Swiper('.tg-project-3-active', {
		// Optional parameters
		speed: 1500,
		loop: true,
		slidesPerView: 4,
		spaceBetween: 30,
		autoplay: false,
		breakpoints: {
			'1200': {
				slidesPerView: 4,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 3,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		// Navigation arrows
		navigation: {
			prevEl: '.project-3-next',
			nextEl: '.project-3-prev',
		},
	});
	////////////////////////////////////////////////////
	// 13. Swiper Js
	const gellaryswiper = new Swiper('.tg-gellary-active', {
		// Optional parameters
		speed: 1500,
		loop: true,
		slidesPerView: 4,
		spaceBetween: 30,
		autoplay: true,
		breakpoints: {
			'1200': {
				slidesPerView: 4,
			},
			'992': {
				slidesPerView: 4,
			},
			'768': {
				slidesPerView: 3,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		// Navigation arrows
		navigation: {
			prevEl: '.gellary-next',
			nextEl: '.gellary-prev',
		},
	});
	////////////////////////////////////////////////////
	// 13. Swiper Js
	const servic2swiper = new Swiper('.tg-service-2-active', {
		// Optional parameters
		speed: 1500,
		loop: true,
		slidesPerView: 3,
		spaceBetween: 30,
		autoplay: true,
		breakpoints: {
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 2,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		// Navigation arrows
		navigation: {
			prevEl: '.service-next',
			nextEl: '.service-prev',
		},
	});

	////////////////////////////////////////////////////
	// 13. Swiper Js
	const teamswiper = new Swiper('.tg-team-2-active', {
		// Optional parameters
		speed: 1500,
		loop: true,
		slidesPerView: 3,
		spaceBetween: 30,
		autoplay: true,
		breakpoints: {
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		// Navigation arrows
		navigation: {
			prevEl: '.team-2-next',
			nextEl: '.team-2-prev',
		},
	});
	////////////////////////////////////////////////////
	// 13. Swiper Js
	const serviceswiper = new Swiper('.tg-service-active', {
		// Optional parameters
		speed: 1500,
		loop: true,
		slidesPerView: 4,
		spaceBetween: 30,
		autoplay: true,
		breakpoints: {
			'1200': {
				slidesPerView: 4,
			},
			'992': {
				slidesPerView: 4,
			},
			'768': {
				slidesPerView: 3,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		// Navigation arrows
		navigation: {
			prevEl: '.service-next',
			nextEl: '.service-prev',
		},
	});


	////////////////////////////////////////////////////
	// 13. Swiper Js
	const brand = new Swiper('.tg-brand-active', {
		// Optional parameters
		speed: 1500,
		loop: true,
		slidesPerView: 6,
		autoplay: true,
		breakpoints: {
			'1200': {
				slidesPerView: 6,
			},
			'992': {
				slidesPerView: 5,
			},
			'768': {
				slidesPerView: 4,
			},
			'576': {
				slidesPerView: 3,
			},
			'0': {
				slidesPerView: 2,
			},
		},
	});
		////////////////////////////////////////////////////
	// 13. Swiper Js
	const testimonialswiper = new Swiper('.tg-testimonial-3-active', {
		// Optional parameters
		speed: 1500,
		loop: true,
		slidesPerView: 1,
		spaceBetween: 30,
		autoplay: false,
		breakpoints: {
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		pagination: {
			el: ".test-2-slider-dots",
			clickable:true,
		  },
	});

	// 13. Swiper Js
	const testimonials = new Swiper('.tg-testimonial-4-active', {
		// Optional parameters
		speed: 1500,
		loop: true,
		slidesPerView: 1,
		spaceBetween: 30,
		autoplay: false,
		breakpoints: {
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		// Navigation arrows
		navigation: {
			prevEl: '.test-4-next',
			nextEl: '.test-4-prev',
		},
	});
	////////////////////////////////////////////////////
	// 13. Swiper Js
	const testimonial3 = new Swiper('.tg-testimonial-2-active', {
		// Optional parameters
		speed: 1500,
		loop: true,
		slidesPerView: 1,
		spaceBetween: 30,
		autoplay: true,
		breakpoints: {
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		pagination: {
			el: ".test-slider-dots",
			clickable:true,
		  },
	});
	////////////////////////////////////////////////////
	// 13. Swiper Js
	const testimonial = new Swiper('.tg-testimonial-active', {
		// Optional parameters
		speed: 1500,
		loop: true,
		slidesPerView: 2,
		spaceBetween: 30,
		autoplay: true,
		breakpoints: {
			'1200': {
				slidesPerView: 2,
			},
			'992': {
				slidesPerView: 2,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		// Navigation arrows
		navigation: {
			prevEl: '.test-next',
			nextEl: '.test-prev',
		},
	});


	// hover reveal start
	const hoverItem = document.querySelectorAll(".tg-reveal-item");
	function moveImage(e, hoverItem, index) {
		const item = hoverItem.getBoundingClientRect();
		const x = e.clientX - item.x;
		const y = e.clientY - item.y;
		if (hoverItem.children[index]) {
			hoverItem.children[index].style.transform = `translate(${x}px, ${y}px)`;
		}
	}
	hoverItem.forEach((item, i) => {
		item.addEventListener("mousemove", (e) => {
			setInterval(moveImage(e, item, 1), 50);
		});
	});
	// hover reveal end

	/*=============================================
		=    		Isotope	Active  	      =
	=============================================*/
	$('.grid').imagesLoaded(function () {
		// init Isotope
		var $grid = $('.grid').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
				columnWidth: '.grid-item',
			}
		});
		// filter items on button click
		$('.portfolio-menu').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		});

	});
	//for menu active class
	$('.product-license li').on('click', function (event) {
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
		event.preventDefault();
	});


	/*=============================================
		=    		DarkMode Active  	      =
	=============================================*/
	function tg_theme_toggler() {

		$('.modeSwitch').on("change", function () {
			toggleTheme();
		});

		// set toggle theme scheme
		function tg_set_scheme(tg_theme) {
			localStorage.setItem('tg_theme_scheme', tg_theme);
			document.documentElement.setAttribute("tg-theme", tg_theme);
		}

		// toggle theme scheme
		function toggleTheme() {
			if (localStorage.getItem('tg_theme_scheme') === 'dark') {
				tg_set_scheme('light');
			} else {
				tg_set_scheme('dark');
			}
		}

		// set the first theme scheme
		function tg_init_theme() {
			if (localStorage.getItem('tg_theme_scheme') === 'dark') {
				tg_set_scheme('dark');
				document.querySelector('.modeSwitch').checked = true;
			} else {
				tg_set_scheme('light');
				document.querySelector('.modeSwitch').checked = false;
			}
		}
		tg_init_theme();
	}
	if ($(".modeSwitch").length > 0) {
		tg_theme_toggler();
	}

	/* magnificPopup img view */
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	/* magnificPopup video view */
	$(".popup-video").magnificPopup({
		type: "iframe",
	});

	new PureCounter();
	new PureCounter({
		filesizing: true,
		selector: ".filesizecount",
		pulse: 2,
	});

	
	if ($('[data-mask-src]').length > 0) {
		$('[data-mask-src]').each(function () {
		  var mask = $(this).attr('data-mask-src');
		  $(this).css({
			'mask-image': 'url(' + mask + ')',
			'-webkit-mask-image': 'url(' + mask + ')'
		  });
		  $(this).removeAttr('data-mask-src');
		});
	  };


})(jQuery);
// Header yükle
fetch('../../header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

// Footer yükle
fetch('../../footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });
