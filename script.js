// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Desktop Navigation Dropdowns
    const navItems = document.querySelectorAll('.nav-item.has-dropdown');

    navItems.forEach(item => {
        // Select either .nav-link or .search-toggle
        const link = item.querySelector('.nav-link, .search-toggle');

        if (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                // Close other dropdowns
                navItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current dropdown
                item.classList.toggle('active');

                // Focus on search input if this is the search dropdown
                if (link.classList.contains('search-toggle') && item.classList.contains('active')) {
                    setTimeout(() => {
                        const searchInput = item.querySelector('.search-input');
                        if (searchInput) {
                            searchInput.focus();
                        }
                    }, 100);
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-item.has-dropdown')) {
            navItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });


    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    body.appendChild(overlay);

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuToggle.classList.add('active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }

    mobileMenuToggle.addEventListener('click', function () {
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileMenuClose.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    // Mobile Navigation Dropdowns
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item.has-dropdown');

    mobileNavItems.forEach(item => {
        const link = item.querySelector('.mobile-nav-link');

        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Toggle current dropdown
            item.classList.toggle('active');
        });
    });

    // Prevent dropdown menu links from closing mobile menu immediately
    const mobileDropdownLinks = document.querySelectorAll('.mobile-dropdown-menu a');
    mobileDropdownLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Allow the link to work but close the menu after a short delay
            setTimeout(closeMobileMenu, 200);
        });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth >= 992) {
                closeMobileMenu();
            }
        }, 250);
    });

    // Search functionality (you can customize this)
    const searchInputs = document.querySelectorAll('.search-input, .mobile-search-input');
    const searchSubmits = document.querySelectorAll('.search-submit, .mobile-search-submit');

    searchSubmits.forEach((submit, index) => {
        submit.addEventListener('click', function (e) {
            e.preventDefault();
            const input = searchInputs[index];
            const searchQuery = input.value.trim();

            if (searchQuery) {
                // Implement your search logic here
                console.log('Searching for:', searchQuery);
                alert('Search functionality: ' + searchQuery);
                // Example: window.location.href = '/search?q=' + encodeURIComponent(searchQuery);
            }
        });
    });

    // Handle search on Enter key
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchQuery = input.value.trim();

                if (searchQuery) {
                    console.log('Searching for:', searchQuery);
                    alert('Search functionality: ' + searchQuery);
                }
            }
        });
    });
});



const tabBtns = document.querySelectorAll('.tab-btn');
const mobilePrev = document.getElementById('mobilePrev');
const mobileNext = document.getElementById('mobileNext');

function updateActiveTab(index) {
    tabBtns.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

const heroSwiper = new Swiper('.heroSwiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    speed: 800,
    on: {
        slideChange: function () {
            updateActiveTab(this.realIndex);
        }
    }
});

tabBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        const slideIndex = parseInt(this.getAttribute('data-index'));
        heroSwiper.slideToLoop(slideIndex);
    });
});

if (mobilePrev && mobileNext) {
    mobilePrev.addEventListener('click', () => {
        heroSwiper.slidePrev();
    });

    mobileNext.addEventListener('click', () => {
        heroSwiper.slideNext();
    });
}

updateActiveTab(0);




// ============================= Testimonial Swiper =============================
const testimonialTabBtns = document.querySelectorAll('.testimonial-tab-btn');
const testimonialMobilePrev = document.getElementById('testimonialMobilePrev');
const testimonialMobileNext = document.getElementById('testimonialMobileNext');

// Update active testimonial tab
function updateTestimonialActiveTab(index) {
    testimonialTabBtns.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

const testimonialsSwiper = new Swiper('.testimonials-swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    speed: 800,
    allowTouchMove: true,
    on: {
        slideChange: function () {
            updateTestimonialActiveTab(this.realIndex);
        }
    }
});

const testimonialSwiperContainer = document.querySelector('.testimonials-swiper');
if (testimonialSwiperContainer) {
    testimonialSwiperContainer.addEventListener('mouseenter', () => {
        testimonialsSwiper.autoplay.stop();
    });

    testimonialSwiperContainer.addEventListener('mouseleave', () => {
        testimonialsSwiper.autoplay.start();
    });
}

testimonialTabBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        const slideIndex = parseInt(this.getAttribute('data-testimonial-index'));
        testimonialsSwiper.slideToLoop(slideIndex);
    });
});

if (testimonialMobilePrev && testimonialMobileNext) {
    testimonialMobilePrev.addEventListener('click', () => {
        testimonialsSwiper.slidePrev();
    });

    testimonialMobileNext.addEventListener('click', () => {
        testimonialsSwiper.slideNext();
    });
}

updateTestimonialActiveTab(0);


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Initialize Services Swiper
const servicesSwiper = new Swiper('.services-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    autoplay: false,
    speed: 800,
    pagination: {
        el: '.services-swiper .swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 25,
        },
        968: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});

const servicesSwiperContainer = document.querySelector('.services-swiper');
if (servicesSwiperContainer) {
    servicesSwiperContainer.addEventListener('mouseenter', () => {
        servicesSwiper.autoplay.stop();
    });

    servicesSwiperContainer.addEventListener('mouseleave', () => {
        servicesSwiper.autoplay.start();
    });
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Office Bg swiper 
// Get all office tab buttons
const officeTabBtns = document.querySelectorAll('.office-tab-btn');
const officeMobilePrev = document.getElementById('officeMobilePrev');
const officeMobileNext = document.getElementById('officeMobileNext');

// Update active office tab
function updateOfficeActiveTab(index) {
    officeTabBtns.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Initialize Office Hero Swiper
const officeHeroSwiper = new Swiper('.office-hero-swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    speed: 800,
    allowTouchMove: true,
    on: {
        slideChange: function () {
            updateOfficeActiveTab(this.realIndex);
        }
    }
});

// Pause autoplay on mouse enter, resume on mouse leave
const officeHeroSwiperContainer = document.querySelector('.office-hero-swiper');
if (officeHeroSwiperContainer) {
    officeHeroSwiperContainer.addEventListener('mouseenter', () => {
        officeHeroSwiper.autoplay.stop();
    });

    officeHeroSwiperContainer.addEventListener('mouseleave', () => {
        officeHeroSwiper.autoplay.start();
    });
}

// Tab click handler - Change slide on tab click
officeTabBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        const slideIndex = parseInt(this.getAttribute('data-office-index'));
        officeHeroSwiper.slideToLoop(slideIndex);
    });
});

// Mobile navigation arrows
if (officeMobilePrev && officeMobileNext) {
    officeMobilePrev.addEventListener('click', () => {
        officeHeroSwiper.slidePrev();
    });

    officeMobileNext.addEventListener('click', () => {
        officeHeroSwiper.slideNext();
    });
}

updateOfficeActiveTab(0);


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get brands Swiper 
const brandsPrevBtn = document.getElementById('brandsPrevBtn');
const brandsNextBtn = document.getElementById('brandsNextBtn');

const brandsSwiper = new Swiper('.brands-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 600,
    navigation: {
        nextEl: brandsNextBtn,
        prevEl: brandsPrevBtn,
    },
    breakpoints: {
        420: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        640: {
            slidesPerView: 3,
            spaceBetween: 25,
        },
        968: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        1200: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
    },
});



// Desktop Tabs Functionality
const valuesTabBtns = document.querySelectorAll('.values-tab-btn');
const valuesTabContents = document.querySelectorAll('.values-tab-content');

valuesTabBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        const targetTab = this.getAttribute('data-values-tab');

        // Remove active class from all
        valuesTabBtns.forEach(b => b.classList.remove('active'));
        valuesTabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked
        this.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Mobile Accordion Functionality
const valuesAccordionHeaders = document.querySelectorAll('.values-accordion-header');

valuesAccordionHeaders.forEach((header) => {
    header.addEventListener('click', function () {
        const targetAccordion = this.getAttribute('data-values-accordion');
        const targetContent = document.getElementById(targetAccordion);
        const isActive = this.classList.contains('active');

        valuesAccordionHeaders.forEach(h => h.classList.remove('active'));
        document.querySelectorAll('.values-accordion-content').forEach(c => c.classList.remove('active'));

        if (!isActive) {
            this.classList.add('active');
            targetContent.classList.add('active');
        }
    });
});