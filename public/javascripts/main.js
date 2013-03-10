$(document).ready(function() {

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
				$(slide).addClass('next').delay(8000);
			} else {
				$('.case-slide').removeClass('prev next');
				slide = '.slide-' + slider.animatingTo;
				$(slide).addClass('prev').delay(8000);
			}
		},
		after: function(){},
		end: function(){}
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
	
	function openCases(){
		
		thisCase = $(this).closest('.case-block');
		numCase = +thisCase.data('case');
		caseOpened = 'case-' + numCase + '-open';
		
		if($('body').hasClass('case-open')) {
		
			$('.case-block').filter('.active-case').addClass('closing-case');
			setTimeout(function() {
				$('.case-block').removeClass('active-case closing-case');
				$('body').removeClass(caseClass).addClass(caseOpened);
				thisCase.addClass('active-case');
			}, 400) //Time to close the active case
			
		} else {
			
			$('body').addClass('case-open').addClass(caseOpened);
			setTimeout(function() {
				thisCase.addClass('active-case')
			}, 400) //Time to enlarge the container
			
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