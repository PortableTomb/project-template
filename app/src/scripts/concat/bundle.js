console.log('Logging from Test1');

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

console.log('Logging from Test2');
console.log('Working!');

window.addEventListener('load', function() {

var form  = document.getElementsByTagName('form')[0];
var email = document.getElementById('mail');
var error = document.querySelector('.error');
var close = document.querySelector('.close');

email.addEventListener("input", function (event) {
  if (email.validity.valid) {
    error.innerHTML = "";
    error.className = "error";
  }
}, false);

form.addEventListener("submit", function (event) {

  if (!email.validity.valid) {
    error.innerHTML = "bad email address, try again.";
    error.className = "error active";
    event.preventDefault();
    }
    else if( email.value === "" ) {
    error.innerHTML = "empty form, enter an email.";
    error.className = "error active";
    event.preventDefault();
    }
    else {
    confirmSubmit();
    email.value ="";

    event.preventDefault();
  }

}, false);

function confirmSubmit() {
    var popup = document.getElementById("myPopup");
    popup.classList.add("show");
    setTimeout(function(){
    popup.classList.remove("show");
    }, 3950);
}

console.log('All assets are loaded')
})
