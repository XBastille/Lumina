document.addEventListener('DOMContentLoaded', function() {
    const featuredSlider = new Swiper('.featured-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        on: {
            init: function() {
                setTimeout(() => {
                    this.slides[this.activeIndex].classList.add('active');
                }, 100);
            },
            slideChangeTransitionStart: function() {
                this.slides.forEach(slide => {
                    slide.classList.remove('active');
                });
            },
            slideChangeTransitionEnd: function() {
                this.slides[this.activeIndex].classList.add('active');
            }
        }
    });

    const testimonialsSlider = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            }
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });

    const heroImages = document.querySelectorAll('.hero-image-container img');
    if (heroImages.length > 1) {
        heroImages.forEach((img, index) => {
            if (index > 0) img.style.display = 'none';
        });
        
        let currentIndex = 0;
        
        function showNextImage() {
            heroImages[currentIndex].style.opacity = 0;
            
            currentIndex = (currentIndex + 1) % heroImages.length;
            
            heroImages[currentIndex].style.display = 'block';
            setTimeout(() => {
                heroImages[currentIndex].style.opacity = 1;
            }, 50);
        }
        
        setInterval(showNextImage, 7000);
    }

    document.querySelectorAll('.gallery-image img').forEach(image => {
        image.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            document.body.appendChild(lightbox);
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            lightbox.appendChild(lightboxContent);
            
            const img = document.createElement('img');
            img.src = this.src;
            img.alt = this.alt;
            lightboxContent.appendChild(img);
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';
            lightboxContent.appendChild(closeBtn);
            
            setTimeout(() => {
                lightbox.classList.add('active');
                lightboxContent.classList.add('active');
            }, 10);
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target === closeBtn) {
                    lightbox.classList.remove('active');
                    lightboxContent.classList.remove('active');
                    
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                    }, 300);
                }
            });
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    lightbox.click();
                }
            });
        });
    });
});