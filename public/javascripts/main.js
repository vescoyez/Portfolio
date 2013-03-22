$(document).ready(function() {
	
	$(window).on("load resize",function(){
	
		$('.case-slider').flexslider({
			namespace: "case-",
			selector: ".slides > .case-slide",
			animation: "slide",
			easing: "swing",
			direction: "horizontal",
			reverse: false,
			animationLoop: false,
			smoothHeight: false,
			startAt: 0,
			slideshow: false,
			slideshowSpeed: 7000,
			animationSpeed: 600,
			initDelay: 0,
			randomize: false,
			controlNav: false,
			directionNav: true,
			prevText: "Previous",
			nextText: "Next",
			start: function(){},
			before: function(slider){
				var slide;
				if(slider.currentSlide < slider.animatingTo){
					$('.case-slide').removeClass('prev next');
					slide = '.slide-' + slider.animatingTo;
					$(slide).addClass('next');
				} else {
					$('.case-slide').removeClass('prev next');
					slide = '.slide-' + slider.animatingTo;
					$(slide).addClass('prev');
				}
			},
			after: function(){},
			end: function(){}
		});
	
	});
	
	$('.like-slider').flexslider({
		namespace: "like-",
		selector: ".slides > li",
		animation: "slide",
		easing: "swing",
		direction: "vertical",
		reverse: false,
		animationLoop: true,
		smoothHeight: false,
		startAt: 0,
		slideshow: true,
		slideshowSpeed: 5000,
		animationSpeed: 200,
		initDelay: 0,
		randomize: true,
		controlNav: false,
		directionNav: false
	});
	
	$('.case-block').on('click', '.thumb', openCases);
	$('nav').find('a').on('click', closeCases);
	
	var thisCase, thisLink, numCase, caseOpened, caseClass = '';
	
	$('.case-block').each(function() {
		caseClass += 'case-' + $(this).data('case') + '-open ';
	});
	
	$('.mobile-nav').on('click', function() {
		$('.menu').slideToggle();
		$('.share').slideUp();
	});
	
	$('.mobile-share').on('click', function() {
		$('.share').slideToggle();
		$('.menu').slideUp();
	});
	
	$(window).on("load resize",function(){
		if ($(".mobile-menu").is(":hidden")) {
			$('.menu').css({'display': ''})
			$('.share').css({'display': ''})
		}
	});
	
	function openCases(){
		
		thisCase = $(this).closest('.case-block');
		numCase = +thisCase.data('case');
		caseOpened = 'case-' + numCase + '-open';
		scrollTo = '#case-' + (numCase - 1);
		
		if ($(".mobile-only").is(":visible")) {
		
			$('.case-block').removeClass('active-case');
			$('body').removeClass(caseClass).addClass('case-open').addClass(caseOpened);
			thisCase.addClass('active-case');
			if (numCase != 0){
			$('html, body').animate({
					scrollTop: $(scrollTo).offset().top + 100
				}, 650);
			} else {
				$('html, body').animate({
					scrollTop: 0
				}, 650);
			}

		
		} else {
		
			if($('body').hasClass('case-open')) {
				$('.case-slide').removeClass('prev next');
				$('.case-block').filter('.active-case').addClass('closing-case');
				setTimeout(function() {
					$('.case-block').removeClass('active-case closing-case');
					$('body').removeClass(caseClass).addClass(caseOpened);
					thisCase.addClass('active-case');
				}, 400) //Time to close the active case
				
			} else {
				$('.case-slide').removeClass('prev next');
				$('body').addClass('case-open').addClass(caseOpened);
				setTimeout(function() {
					thisCase.addClass('active-case')
				}, 600) //Time to enlarge the container
				
			}
			
		}
	}
	
	function closeCases(event){
		event.preventDefault();
		thisLink = $(this);
		
		if($('body').hasClass('case-open')) {
			$('.case-block').filter('.active-case').addClass('closing-case');
			setTimeout(function() {
				$('.case-block').removeClass('active-case closing-case');
				setTimeout(changePage(), 50);
			}, 400) //Time to close the active case
		} else {
			changePage();
		}
	}
	
	function changePage() {
		$('nav').find('a').removeClass('active-page');
		$('body').removeClass();
		thisLink.addClass('active-page');
		thisLink.filter('.work-link').closest('body').addClass('work');
		thisLink.filter('.home-link').closest('body').addClass('home');
		thisLink.filter('.contact-link').closest('body').addClass('contact');
	}
	
});