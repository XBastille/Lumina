document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const lines = heroTitle.querySelectorAll('.line');
        lines.forEach((line, index) => {
            const text = line.textContent;
            line.innerHTML = '';
            
            for (let i = 0; i < text.length; i++) {
                const letter = document.createElement('span');
                letter.className = 'split-letter';
                letter.textContent = text[i] === ' ' ? '\u00A0' : text[i];
                letter.style.transitionDelay = (0.05 * i) + (0.3 * index) + 's';
                line.appendChild(letter);
            }
        });
        
        setTimeout(() => {
            heroTitle.querySelectorAll('.split-letter').forEach(letter => {
                letter.classList.add('show');
            });
        }, 500);
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            gsap.to(heroImage, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
        
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems.length) {
            gsap.from(galleryItems, {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".featured-work",
                    start: "top 80%"
                }
            });
        }
        
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%"
                }
            });
        });
        
        const instagramItems = document.querySelectorAll('.instagram-item');
        if (instagramItems.length) {
            gsap.from(instagramItems, {
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".instagram-grid",
                    start: "top 80%"
                }
            });
        }
    }

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => observer.observe(el));
    } else {
        animatedElements.forEach(el => el.classList.add('show'));
    }

    const pageLinks = document.querySelectorAll('a[href^="pages/"], a[href="index.html"]');
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.indexOf('#') === -1) {
                e.preventDefault();
                
                const transition = document.createElement('div');
                transition.className = 'page-transition';
                document.body.appendChild(transition);
                
                setTimeout(() => {
                    transition.classList.add('enter');
                    
                    setTimeout(() => {
                        window.location = href;
                    }, 700);
                }, 50);
            }
        });
    });
    
    // Fix for testimonials slider animations
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        // Make sure all slides are visible initially
        const slides = testimonialSlider.querySelectorAll('.swiper-slide');
        slides.forEach(slide => {
            slide.style.opacity = '1';
            slide.style.visibility = 'visible';
        });
        
        // Override fade transitions to be more stable
        if (typeof Swiper !== 'undefined') {
            const swiperInstance = testimonialSlider.swiper;
            if (swiperInstance) {
                swiperInstance.params.fadeEffect.crossFade = true;
                swiperInstance.params.speed = 800;
                
                // Add event listeners for better transition handling
                swiperInstance.on('slideChangeTransitionStart', function() {
                    const activeSlide = this.slides[this.activeIndex];
                    if (activeSlide) {
                        activeSlide.style.opacity = '1';
                        activeSlide.style.visibility = 'visible';
                    }
                });
            }
        }
    }
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 200);
    
    const staggerElements = document.querySelectorAll('.stagger-animation > *');
    staggerElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('show');
        }, 100 * index);
    });
    
    // Additional fix for testimonials after page load
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    testimonialItems.forEach(item => {
        item.style.opacity = '1';
        item.style.visibility = 'visible';
        item.style.height = 'auto';
    });
    
    // Force Swiper update after everything is loaded
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider && testimonialSlider.swiper) {
        setTimeout(() => {
            testimonialSlider.swiper.update();
        }, 500);
    }
});

document.addEventListener('scroll', function() {
    const instagramSection = document.querySelector('.instagram-feed');
    if (instagramSection) {
        const rect = instagramSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            instagramSection.style.opacity = '1';
            instagramSection.style.visibility = 'visible';
        }
    }
});