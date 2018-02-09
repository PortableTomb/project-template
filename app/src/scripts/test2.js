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
