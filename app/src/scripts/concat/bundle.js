console.log('Logging from library.js');

$(document).ready(function(){


// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

});

console.log('Logging from Test1.js');

const a = 1;
console.log(a);


	;( function ( document, window, index ) {
		'use strict';

		var elSelector = '.header',
			elClassHidden	= 'header--hidden',
			throttleTimeout	= 500,
			element	= document.querySelector( elSelector );

		if( !element ) return true;

		var dHeight	= 0,
			wHeight	= 0,
			wScrollCurrent = 0,
			wScrollBefore	= 0,
			wScrollDiff	= 0,

hasElementClass		= function( element, className ){
   return element.classList ? element.classList.contains( className ) : new RegExp( '(^| )' + className + '( |$)', 'gi' ).test( element.className );
},

addElementClass		= function( element, className ){
   element.classList ? element.classList.add( className ) : element.className += ' ' + className;
},

removeElementClass	= function( element, className ){
   element.classList ? element.classList.remove( className ) : element.className = element.className.replace( new RegExp( '(^|\\b)' + className.split( ' ' ).join( '|' ) + '(\\b|$)', 'gi' ), ' ' );
},

			throttle = function( delay, fn )
			{
				var last, deferTimer;
				return function()
				{
					var context = this, args = arguments, now = +new Date;
					if( last && now < last + delay )
					{
						clearTimeout( deferTimer );
						deferTimer = setTimeout( function(){ last = now; fn.apply( context, args ); }, delay );
					}
					else
					{
						last = now;
						fn.apply( context, args );
					}
				};
			};

		window.addEventListener( 'scroll', throttle( throttleTimeout, function()
		{
			dHeight			= document.body.offsetHeight;
			wHeight			= window.innerHeight;
			wScrollCurrent	= window.pageYOffset;
			wScrollDiff		= wScrollBefore - wScrollCurrent;

			if( wScrollCurrent <= 0 ) // scrolled to the very top; element sticks to the top
				removeElementClass( element, elClassHidden );

			else if( wScrollDiff > 0 && hasElementClass( element, elClassHidden ) ) // scrolled up; element slides in
				removeElementClass( element, elClassHidden );

			else if( wScrollDiff < 0 ) // scrolled down
			{
				if( wScrollCurrent + wHeight >= dHeight && hasElementClass( element, elClassHidden ) ) // scrolled to the very bottom; element slides in
					removeElementClass( element, elClassHidden );

				else // scrolled down; element slides out
					addElementClass( element, elClassHidden );
			}

			wScrollBefore = wScrollCurrent;
		}));

	}( document, window, 0 ));
