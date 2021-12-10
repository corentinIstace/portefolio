const hamburger = document.querySelector("#hambIcon");
const socialMenu = document.querySelector("#link");
const navMenu = document.querySelector("#navbar");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    socialMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
    console.log("ok");
};

const navLink = document.querySelectorAll("li");

navLink.forEach(l => l.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    socialMenu.classList.toggle("active");
    navMenu.classList.remove("active");
};

$(document).ready(function(){
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            let hash = this.hash;
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){     
                window.location.hash = hash;
            });
        }
    });
});


