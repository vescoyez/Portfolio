$(document).ready(function() {
	
	/*---------------BrowserDetect----------------*/

	var BrowserDetect = {
	        init: function () {
	                this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
	                this.version = this.searchVersion(navigator.userAgent)
	                        || this.searchVersion(navigator.appVersion)
	                        || "an unknown version";
	                this.OS = this.searchString(this.dataOS) || "an unknown OS";
	        },
	        searchString: function (data) {
	                for (var i=0;i<data.length;i++)	{
	                        var dataString = data[i].string;
	                        var dataProp = data[i].prop;
	                        this.versionSearchString = data[i].versionSearch || data[i].identity;
	                        if (dataString) {
	                                if (dataString.indexOf(data[i].subString) != -1)
	                                        return data[i].identity;
	                        }
	                        else if (dataProp)
	                                return data[i].identity;
	                }
	        },
	        searchVersion: function (dataString) {
	                var index = dataString.indexOf(this.versionSearchString);
	                if (index == -1) return;
	                return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	        },
	        dataBrowser: [
	                {
	                        string: navigator.userAgent,
	                        subString: "Chrome",
	                        identity: "Chrome"
	                },
	                { 	string: navigator.userAgent,
	                        subString: "OmniWeb",
	                        versionSearch: "OmniWeb",
	                        identity: "OmniWeb"
	                },
	                {
	                        string: navigator.vendor,
	                        subString: "Apple",
	                        identity: "Safari",
	                        versionSearch: "Version"
	                },
	                {
	                        prop: window.opera,
	                        identity: "Opera"
	                },
	                {
	                        string: navigator.vendor,
	                        subString: "iCab",
	                        identity: "iCab"
	                },
	                {
	                        string: navigator.vendor,
	                        subString: "KDE",
	                        identity: "Konqueror"
	                },
	                {
	                        string: navigator.userAgent,
	                        subString: "Firefox",
	                        identity: "Firefox"
	                },
	                {
	                        string: navigator.vendor,
	                        subString: "Camino",
	                        identity: "Camino"
	                },
	                {		// for newer Netscapes (6+)
	                        string: navigator.userAgent,
	                        subString: "Netscape",
	                        identity: "Netscape"
	                },
	                {
	                        string: navigator.userAgent,
	                        subString: "MSIE",
	                        identity: "Explorer",
	                        versionSearch: "MSIE"
	                },
	                {
	                        string: navigator.userAgent,
	                        subString: "Gecko",
	                        identity: "Mozilla",
	                        versionSearch: "rv"
	                },
	                { 		// for older Netscapes (4-)
	                        string: navigator.userAgent,
	                        subString: "Mozilla",
	                        identity: "Netscape",
	                        versionSearch: "Mozilla"
	                }
	        ],
	        dataOS : [
	                {
	                        string: navigator.platform,
	                        subString: "Win",
	                        identity: "Windows"
	                },
	                {
	                        string: navigator.platform,
	                        subString: "Mac",
	                        identity: "Mac"
	                },
	                {
	                           string: navigator.userAgent,
	                           subString: "iPhone",
	                           identity: "iPhone/iPod"
	            },
	                {
	                        string: navigator.platform,
	                        subString: "Linux",
	                        identity: "Linux"
	                }
	        ]
	
	};
	BrowserDetect.init();
	
	if( ((BrowserDetect.browser == "Firefox") && (BrowserDetect.version < "4")) || ((BrowserDetect.browser == "Chrome") && (BrowserDetect.version < "16")) || ((BrowserDetect.browser == "Explorer") && (BrowserDetect.version < "10")) || ((BrowserDetect.browser == "Safari") && (BrowserDetect.version < "6")) || (BrowserDetect.browser == "Safari") ){
		$('html').removeClass('csstransitions').addClass('no-csstransitions');
	}
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
	if(isAndroid) {
		$('html').removeClass('csstransitions').addClass('no-csstransitions');
	}
	
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
	$(".page-link").on('click', closeCases);
	
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
	
	function openCases(event){
		event.preventDefault();
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
		if ($('html').hasClass('csstransitions')) {
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
	}
	
	function changePage() {
		$('body').removeClass();
		thisLink.filter('.work-link').closest('body').addClass('work');
		thisLink.filter('.home-link').closest('body').addClass('home');
		thisLink.filter('.contact-link').closest('body').addClass('contact');
	}
	
});