// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all product cards with hover effect
    const initImageHover = () => {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const primaryImg = card.querySelector('.primary-img');
            const secondaryImg = card.querySelector('.secondary-img');

            if (!primaryImg || !secondaryImg) return;

            // Preload secondary image
            const img = new Image();
            img.src = secondaryImg.src;

            card.addEventListener('mouseenter', () => {
                primaryImg.style.opacity = "0";
                secondaryImg.style.opacity = "1";
                secondaryImg.style.transition = "all 0.5s cubic-bezier(.4,0,.2,1)";
            });

            card.addEventListener('mouseleave', () => {
                primaryImg.style.opacity = "1";
                secondaryImg.style.opacity = "0";
            });

        });
    };


    initImageHover();

    const showMoreBtn = document.getElementById('showMoreBtn');
    const hiddenItems = document.getElementById('hiddenItems');

    if (showMoreBtn && hiddenItems) {
        showMoreBtn.addEventListener('click', function () {
            hiddenItems.classList.remove('hidden');
            showMoreBtn.classList.add('hidden');

            // Re-initialize hover effects for newly shown items
            initImageHover();

            // Smooth scroll to the new items
            hiddenItems.scrollIntoView({ behavior: 'smooth' });
        });

        // Hide button if there are no hidden items
        if (hiddenItems.children.length === 0) {
            showMoreBtn.classList.add('hidden');
        }
    }
});