const belgImages = document.querySelectorAll('.belg-carousel img');
let belgCurrent = 0;

setInterval(() => {
    belgImages[belgCurrent].classList.remove('active');
    belgCurrent = (belgCurrent + 1) % belgImages.length;
    belgImages[belgCurrent].classList.add('active');
}, 3000);