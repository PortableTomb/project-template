!function e(n,t,r){function o(a,s){if(!t[a]){if(!n[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(i)return i(a,!0);var f=new Error("Cannot find module '"+a+"'");throw f.code="MODULE_NOT_FOUND",f}var l=t[a]={exports:{}};n[a][0].call(l.exports,function(e){var t=n[a][1][e];return o(t||e)},l,l.exports,e,n,t,r)}return t[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,n,t){"use strict";console.log("Logging from library.js"),$(document).ready(function(){$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(e){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var n=$(this.hash);(n=n.length?n:$("[name="+this.hash.slice(1)+"]")).length&&(e.preventDefault(),$("html, body").animate({scrollTop:n.offset().top},1e3,function(){var e=$(n);if(e.focus(),e.is(":focus"))return!1;e.attr("tabindex","-1"),e.focus()}))}})}),console.log("Logging from Test1.js");console.log(1),function(e,n,t){var r=e.querySelector(".header");if(!r)return!0;var o=0,i=0,a=0,s=0,c=0,f=function(e,n){return e.classList?e.classList.contains(n):new RegExp("(^| )"+n+"( |$)","gi").test(e.className)},l=function(e,n){e.classList?e.classList.remove(n):e.className=e.className.replace(new RegExp("(^|\\b)"+n.split(" ").join("|")+"(\\b|$)","gi")," ")};n.addEventListener("scroll",function(e,n){var t,r;return function(){var o=this,i=arguments,a=+new Date;t&&a<t+e?(clearTimeout(r),r=setTimeout(function(){t=a,n.apply(o,i)},e)):(t=a,n.apply(o,i))}}(500,function(){o=e.body.offsetHeight,i=n.innerHeight,a=n.pageYOffset,c=s-a,a<=0?l(r,"header--hidden"):c>0&&f(r,"header--hidden")?l(r,"header--hidden"):c<0&&(a+i>=o&&f(r,"header--hidden")?l(r,"header--hidden"):function(e,n){e.classList?e.classList.add(n):e.className+=" "+n}(r,"header--hidden")),s=a}))}(document,window)},{}]},{},[1]);
//# sourceMappingURL=bundle.js.map
