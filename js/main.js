document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    const accountSection = document.getElementById('accountSection');
    const logoutBtn = document.getElementById('logoutBtn');


    const isLoggedIn = localStorage.getItem('pradaLoggedIn') === 'true';

    if (!isLoggedIn) {

        accountSection.style.display = 'none';
    }

    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('pradaLoggedIn');
        window.location.reload();
    });


    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(el => {
                el.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});