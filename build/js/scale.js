"use strict";!function(){var e=document.querySelector(".resize__control--minus"),r=document.querySelector(".resize__control--plus"),c=document.querySelector(".resize__control--value"),l=document.querySelector(".img-upload__preview img");e.addEventListener("click",function(){var e,r,t;r=e=25,t=+c.value.replace("%",""),e<t&&(t-=r,l.style.transform="scale("+t/100+")",t+="%",c.value=t)}),r.addEventListener("click",function(){var e,r,t;e=100,r=25,(t=+c.value.replace("%",""))<e&&(t+=r,l.style.transform="scale("+t/100+")",t+="%",c.value=t)})}();