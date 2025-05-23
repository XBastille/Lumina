document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('about-page');
    
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        pageHeader.classList.add('about-page-header');
    }
    
    const testimonialSwiper = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoHeight: true, 
        autoplay: {
            disableOnInteraction: true, 
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        speed: 800,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        grabCursor: true,
        on: {
            init: function() {
                const slides = document.querySelectorAll('.testimonial-item');
                let maxHeight = 0;
                
                slides.forEach(slide => {
                    const height = slide.offsetHeight;
                    maxHeight = Math.max(maxHeight, height);
                });
                
                const wrapper = document.querySelector('.swiper-wrapper');
                if (wrapper) {
                    wrapper.style.minHeight = maxHeight + 'px';
                }
                
                setTimeout(() => {
                    this.update();
                }, 300);
            },
            slideChange: function() {
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    const wrapper = document.querySelector('.swiper-wrapper');
                    if (wrapper) {
                        wrapper.style.minHeight = activeSlide.offsetHeight + 'px';
                    }
                }
            }
        }
    });
    
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.to('.page-header::before', {
            y: '20%',
            ease: "none",
            scrollTrigger: {
                trigger: ".page-header",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
        
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                gsap.to(this.querySelector('img'), {
                    scale: 1.1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });
            
            item.addEventListener('mouseleave', function() {
                gsap.to(this.querySelector('img'), {
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    function adjustLayoutForScreenSize() {
        const width = window.innerWidth;
        
        const specialtiesGallery = document.querySelector('.specialties-gallery');
        if (specialtiesGallery) {
            if (width < 400) {
                specialtiesGallery.style.gridTemplateColumns = '1fr';
                specialtiesGallery.style.gap = '15px';
                
                const galleryItems = specialtiesGallery.querySelectorAll('.gallery-item');
                galleryItems.forEach(item => {
                    item.style.aspectRatio = '4/3';
                });
            } else if (width < 768) {
                specialtiesGallery.style.gridTemplateColumns = 'repeat(2, 1fr)';
                specialtiesGallery.style.gap = '8px';
                
                const galleryItems = specialtiesGallery.querySelectorAll('.gallery-item');
                galleryItems.forEach(item => {
                    item.style.aspectRatio = '1/1';
                });
            } else {
                specialtiesGallery.style.gridTemplateColumns = 'repeat(2, 1fr)';
                specialtiesGallery.style.gap = '20px';
                
                const galleryItems = specialtiesGallery.querySelectorAll('.gallery-item');
                galleryItems.forEach(item => {
                    item.style.aspectRatio = '';
                });
            }
        }
        
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            const icon = card.querySelector('.service-icon');
            const details = card.querySelector('.service-details');
            const serviceOptions = card.querySelector('.service-options');
            
            if (width < 768) {
                card.style.flexDirection = 'column';
                card.style.alignItems = 'center';
                card.style.textAlign = 'center';
                
                if (icon) {
                    icon.style.marginBottom = '2rem';
                    icon.style.marginRight = '0';
                    
                    icon.style.width = '6rem';
                    icon.style.height = '6rem';
                    icon.style.display = 'flex';
                    icon.style.alignItems = 'center';
                    icon.style.justifyContent = 'center';
                    icon.style.backgroundColor = 'rgba(179, 148, 106, 0.1)';
                    icon.style.borderRadius = '50%';
                }
                
                if (details) {
                    details.style.textAlign = 'center';
                    details.style.width = '100%';
                }
                
                if (serviceOptions) {
                    serviceOptions.style.textAlign = 'left';
                    serviceOptions.style.display = 'inline-block';
                    serviceOptions.style.margin = '0 auto';
                    serviceOptions.style.paddingLeft = '1.8rem';
                }
            } else {
                card.style.flexDirection = 'row';
                card.style.alignItems = 'flex-start';
                card.style.textAlign = 'left';
                
                if (icon) {
                    icon.style.marginBottom = '0';
                    icon.style.marginRight = '2rem';
                    
                    icon.style.width = '';
                    icon.style.height = '';
                    icon.style.backgroundColor = '';
                    icon.style.borderRadius = '';
                }
                
                if (details) {
                    details.style.textAlign = 'left';
                    details.style.width = '';
                }
                
                if (serviceOptions) {
                    serviceOptions.style.margin = '';
                    serviceOptions.style.display = '';
                }
            }
        });
        
        const publicationLogos = document.querySelector('.publication-logos');
        if (publicationLogos) {
            if (width < 576) {
                publicationLogos.style.gap = '1.5rem';
                publicationLogos.style.flexWrap = 'wrap';
                
                const logos = publicationLogos.querySelectorAll('img');
                logos.forEach(logo => {
                    logo.style.height = '2.8rem';
                    logo.style.maxWidth = '90px';
                });
            } else if (width < 992) {
                publicationLogos.style.gap = '3rem';
                publicationLogos.style.flexWrap = 'wrap';
                
                const logos = publicationLogos.querySelectorAll('img');
                logos.forEach(logo => {
                    logo.style.height = '3.5rem';
                    logo.style.maxWidth = '120px';
                });
            } else {
                publicationLogos.style.gap = '4rem';
                
                const logos = publicationLogos.querySelectorAll('img');
                logos.forEach(logo => {
                    logo.style.height = '4rem';
                    logo.style.maxWidth = '150px';
                });
            }
        }
        
        function equalizeHeights(selector, parentSelector) {
            document.querySelectorAll(selector).forEach(item => {
                item.style.height = 'auto';
            });
            
            if (width >= 768) {
                const rows = document.querySelectorAll(parentSelector);
                rows.forEach(row => {
                    let maxHeight = 0;
                    row.querySelectorAll(selector).forEach(item => {
                        const height = item.scrollHeight;
                        maxHeight = height > maxHeight ? height : maxHeight;
                    });
                    
                    row.querySelectorAll(selector).forEach(item => {
                        item.style.height = maxHeight + 'px';
                    });
                });
            }
        }
        
        equalizeHeights('.value-item', '.philosophy-values .row');
        equalizeHeights('.award-item', '.awards-list .row');
        
        if (testimonialSwiper && typeof testimonialSwiper.update === 'function') {
            testimonialSwiper.update();
        }
        
        if (width <= 767) {
            document.querySelectorAll('.container').forEach(container => {
                container.style.display = 'flex';
                container.style.flexDirection = 'column';
                container.style.alignItems = 'center';
                container.style.textAlign = 'center';
                container.style.width = '100%';
                container.style.maxWidth = '100%';
                container.style.paddingLeft = '20px';
                container.style.paddingRight = '20px';
            });
            
            document.querySelectorAll('.row').forEach(row => {
                row.style.display = 'flex';
                row.style.flexDirection = 'column';
                row.style.alignItems = 'center';
                row.style.justifyContent = 'center';
                row.style.width = '100%';
                row.style.maxWidth = '500px';
                row.style.margin = '0 auto';
            });
            
            document.querySelectorAll('[class*="col-"]').forEach(col => {
                col.style.width = '100%';
                col.style.maxWidth = '500px';
                col.style.margin = '0 auto';
                col.style.display = 'flex';
                col.style.flexDirection = 'column';
                col.style.alignItems = 'center';
                col.style.textAlign = 'center';
            });
            
            const specialtiesGallery = document.querySelector('.specialties-gallery');
            if (specialtiesGallery) {
                specialtiesGallery.style.width = '100%';
                specialtiesGallery.style.maxWidth = '400px';
                specialtiesGallery.style.margin = '0 auto';
                specialtiesGallery.style.display = 'grid';
                specialtiesGallery.style.gridTemplateColumns = width < 400 ? '1fr' : 'repeat(2, 1fr)';
                specialtiesGallery.style.gap = '10px';
                specialtiesGallery.style.justifyContent = 'center';
            }
            
            document.querySelectorAll('.service-card').forEach(card => {
                card.style.width = '100%';
                card.style.maxWidth = '450px';
                card.style.margin = '0 auto 2rem auto';
                card.style.display = 'flex';
                card.style.flexDirection = 'column';
                card.style.alignItems = 'center';
                card.style.textAlign = 'center';
            });
            
            document.querySelectorAll('.specialty-item').forEach(item => {
                item.style.width = '100%';
                item.style.maxWidth = '450px';
                item.style.margin = '0 auto 2rem auto';
            });
            
            const testimonialSlider = document.querySelector('.testimonials-slider');
            if (testimonialSlider) {
                testimonialSlider.style.width = '100%';
                testimonialSlider.style.maxWidth = '500px';
                testimonialSlider.style.margin = '0 auto';
            }
        }
    }
    
    adjustLayoutForScreenSize();
    window.addEventListener('resize', adjustLayoutForScreenSize);
    window.addEventListener('orientationchange', adjustLayoutForScreenSize);
    
    window.addEventListener('load', function() {
        adjustLayoutForScreenSize();
        
        setTimeout(adjustLayoutForScreenSize, 500);
    });
    
    document.addEventListener('aos:in:testimonials-slider', function() {
        if (testimonialSwiper) {
            testimonialSwiper.update();
        }
    });
    
    setTimeout(adjustLayoutForScreenSize, 100);
});