const hamburgerBtn = document.querySelector('.hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);


            if (isExpanded) {
                mobileMenu.hidden = true;
                hamburgerBtn.classList.remove('active');
            } else {
                mobileMenu.hidden = false;
                hamburgerBtn.classList.add('active');
            }
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.id === 'mobile-services-toggle') {
                    return;
                }
                mobileMenu.hidden = true;
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                hamburgerBtn.classList.remove('active');
            });
        });
        const servicesToggle = document.getElementById('mobile-services-toggle');
        const mobileSubcategories = document.getElementById('mobile-subcategories');

        if (servicesToggle && mobileSubcategories) {
            servicesToggle.addEventListener('click', function (e) {
                e.preventDefault(); // Prevents page jump
                mobileSubcategories.classList.toggle('hidden');
            });
        }
    }
});