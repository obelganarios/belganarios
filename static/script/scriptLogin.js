document.addEventListener('DOMContentLoaded', function () {
    const rememberButton = document.getElementById('rememberButton');
    const rememberMeHidden = document.getElementById('rememberMeHidden');
    let isRemembered = false;

    function updateRememberMeState() {
        if (isRemembered) {
            rememberButton.classList.add('active');
            rememberMeHidden.value = 'true';
            rememberButton.setAttribute('aria-checked', 'true');
        } else {
            rememberButton.classList.remove('active');
            rememberMeHidden.value = 'false';
            rememberButton.setAttribute('aria-checked', 'false');
        }
    }

    updateRememberMeState();

    rememberButton.addEventListener('click', function (event) {
        event.preventDefault();
        isRemembered = !isRemembered;
        updateRememberMeState();
    });
});
