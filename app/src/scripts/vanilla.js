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


// booking reservation
const submit = document.getElementById('f2');
const from = document.getElementById("from");
const to = document.getElementById("to");
const adult = document.getElementById("book-adult");
const child = document.getElementById("book-child");

// amount total dummy data via rand#
  function getRandAmount() {
  const min = 325,
        max = 5000;
  return (Math.random() * (max - min + 1) + min).toFixed(2);
  }
  let randAmount = getRandAmount();

// book now button
submit.addEventListener("click", function(e) {
  e.preventDefault();
  const fromValue = document.getElementById("from").value;
  const toValue = document.getElementById("to").value;
  const adultValue = document.getElementById("book-adult").value;
  const childValue = document.getElementById("book-child").value;

  // handle date input
  const dateFrom = document.getElementById("bookFromDate");
  dateFrom.innerHTML = `From ${fromValue}`;
  const dateTo = document.getElementById("bookToDate");
  dateTo.innerHTML = `To  ${toValue}`;

  // handle guest input
  const adultGuest = document.getElementById("bookAdult");
  const childGuest = document.getElementById("bookChild");
  adultValue >= "1" ? adultGuest.innerHTML=`${adultValue} Adult Guest`: guests.innerHTML=`${adultValue} Adult Guests`
  childValue === "0" ? childGuest.innerHTML="" : (childValue === "1" ? childGuest.innerHTML=`${childValue} Child Guest` : childGuest.innerHTML=`${childValue} Child Guests`);

  // handle amount
  const amount = document.getElementById("book-amount");
  amount.innerHTML = `$${randAmount}`;
});

// modal
var modal = document.querySelector(".confirm-modal");
var trigger = document.querySelector(".trigger-modal");
var closeButton = document.querySelector(".confirm-modal__close");

    function toggleModal() {
      modal.classList.toggle("show-modal");
    }

    function windowOnClick(event) {
      if (event.target === modal) {
          toggleModal();
      }
    }

  trigger.addEventListener("click", toggleModal);
  closeButton.addEventListener("click", toggleModal);
  window.addEventListener("click", windowOnClick);

// handle popup
const confirmPopUp = document.getElementById("confirmPopUp");
confirmPopUp.addEventListener("click", function(e){

  confirmSubmit();
  e.preventDefault();
}, false);

function confirmSubmit() {
  const popup = document.getElementById("myPopup");
  popup.classList.add("show");
  setTimeout(function(){
  popup.classList.remove("show");
  toggleModal();
  }, 3950);
}

// toggle review likes
const btnParent = document.querySelector('div.review__user-btn');
const btns = document.querySelectorAll('.review__user-like');
const btn = document.querySelector(".review__user-like");

Array.prototype.forEach.call( document.querySelectorAll(".review__user-like"), function (element) {
element.onclick = toggleLike;
});

function toggleLike (element) {
  element = this;

  if(element.classList.contains("liked")){
    element.classList.remove("liked");
  } else {
    element.classList.add("liked");
  }
}
