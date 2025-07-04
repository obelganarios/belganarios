const navBar = document.querySelector('nav');

window.addEventListener('scroll', function () {

    if (this.scrollY > 100) {
        navBar.classList.add('slideDown');
    } else {
        navBar.classList.remove('slideDown');
    }

})