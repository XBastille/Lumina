document.addEventListener('DOMContentLoaded', function() {
    let grid = document.querySelector('.portfolio-grid');
    let iso;
    let preloadedImages = {};
    
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
    }
    
    if (grid && typeof Isotope !== 'undefined') {
        
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = window.innerWidth < 576 ? 'repeat(1, 1fr)' : 
                                        window.innerWidth < 992 ? 'repeat(2, 1fr)' : 
                                        'repeat(3, 1fr)';
        grid.style.gap = '30px';
        grid.style.width = '100%';
        
        iso = new Isotope(grid, {
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            fitRows: {
                gutter: 30
            },
            transitionDuration: '0.6s',
            stagger: 80,
            resize: false,
            masonry: {
                columnWidth: '.portfolio-item',
                gutter: 30
            }
        });
        
        setTimeout(() => {
            document.querySelectorAll('.portfolio-item').forEach(item => {
                item.style.position = 'relative';
                item.style.left = 'auto';
                item.style.top = 'auto';
            });
            iso.layout();
        }, 100);
        
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.classList.add('loading');
        });
        
        if (typeof imagesLoaded !== 'undefined') {
            imagesLoaded(grid, function() {
                portfolioItems.forEach(item => {
                    item.classList.remove('loading');
                });
                iso.layout();
                AOS.refresh();
            });
        } else {
            setTimeout(() => {
                portfolioItems.forEach(item => {
                    item.classList.remove('loading');
                });
                iso.layout();
                AOS.refresh();
            }, 1000);
        }
        
        function createRippleEffect(button, event) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            button.appendChild(ripple);
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${event.clientX - rect.left - size/2}px`;
            ripple.style.top = `${event.clientY - rect.top - size/2}px`;
            
            ripple.classList.add('active');
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                createRippleEffect(this, event);
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                const itemHeights = {};
                portfolioItems.forEach(item => {
                    const rect = item.getBoundingClientRect();
                    itemHeights[item.id || Math.random()] = rect.height;
                    
                    item.style.minHeight = rect.height + 'px';
                });
                
                if (typeof gsap !== 'undefined') {
                    if (filterValue === '*') {
                        gsap.to(portfolioItems, {
                            opacity: 1,
                            y: 0,
                            stagger: 0.05,
                            duration: 0.5,
                            ease: "power2.out",
                            onComplete: () => {
                                iso.arrange({ filter: '*' });
                                resetItemDimensions();
                            }
                        });
                    } else {
                        const itemsToHide = Array.from(portfolioItems).filter(item => !item.matches(filterValue));
                        const itemsToShow = Array.from(portfolioItems).filter(item => item.matches(filterValue));
                        
                        gsap.to(itemsToHide, {
                            opacity: 0,
                            y: 20,
                            duration: 0.3,
                            stagger: 0.02,
                            ease: "power2.in",
                            onComplete: () => {
                                iso.arrange({ filter: filterValue });
                                
                                gsap.from(itemsToShow, {
                                    opacity: 0,
                                    y: 20,
                                    duration: 0.5,
                                    stagger: 0.05,
                                    ease: "power3.out",
                                    clearProps: "all",
                                    onComplete: resetItemDimensions
                                });
                            }
                        });
                    }
                } else {
                    iso.arrange({ filter: filterValue });
                    setTimeout(resetItemDimensions, 600);
                }
                
                function resetItemDimensions() {
                    grid.style.display = 'grid';
                    grid.style.gridTemplateColumns = window.innerWidth < 576 ? 'repeat(1, 1fr)' : 
                                                    window.innerWidth < 992 ? 'repeat(2, 1fr)' : 
                                                    'repeat(3, 1fr)';
                    grid.style.gap = '10px';
                    
                    portfolioItems.forEach(item => {
                        item.style.position = 'relative';
                        item.style.left = 'auto';
                        item.style.top = 'auto';
                        
                        const imageContainer = item.querySelector('.portfolio-image');
                        if (imageContainer) {
                            imageContainer.style.aspectRatio = '3/4';
                            imageContainer.style.height = '100%';
                            imageContainer.style.width = '100%';
                        }
                        
                        const img = item.querySelector('img');
                        if (img) {
                            img.style.width = '100%';
                            img.style.height = '100%';
                            img.style.objectFit = 'cover';
                        }
                        
                        setTimeout(() => {
                            item.style.minHeight = '';
                        }, 100);
                    });
                    
                    iso.layout();
                }
                
                if (window.innerWidth < 768) {
                    window.scrollTo({
                        top: grid.offsetTop - 120,
                        behavior: 'smooth'
                    });
                }
                
                setTimeout(() => {
                    AOS.refresh();
                }, 800);
            });
        });
    }
    
    const portfolioItems = document.querySelectorAll('.portfolio-expand');
    const lightboxContainer = document.querySelector('.lightbox-container');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxCaptionTitle = document.querySelector('.lightbox-caption h3');
    const lightboxCaptionCategory = document.querySelector('.lightbox-caption span');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    const portfolioImages = [];
    
    if (lightboxContainer && !document.querySelector('.lightbox-counter')) {
        const counterElement = document.createElement('div');
        counterElement.className = 'lightbox-counter';
        lightboxContainer.appendChild(counterElement);
    }
    
    const lightboxCounter = document.querySelector('.lightbox-counter');
    
    if (portfolioItems.length && lightboxContainer) {
        portfolioItems.forEach((item, index) => {
            const imageInfo = {
                src: item.getAttribute('href'),
                title: item.closest('.portfolio-item').querySelector('.portfolio-info h3').textContent,
                category: item.closest('.portfolio-item').querySelector('.portfolio-info span').textContent
            };
            
            portfolioImages.push(imageInfo);
            
            preloadImage(imageInfo.src);
            
            item.addEventListener('click', function(e) {
                e.preventDefault();
                currentIndex = index;
                openLightbox(imageInfo);
            });
        });
        
        function preloadImage(src) {
            if (!preloadedImages[src]) {
                const img = new Image();
                img.src = src;
                preloadedImages[src] = img;
            }
        }
        
        function preloadAdjacentImages() {
            const nextIndex = (currentIndex + 1) % portfolioImages.length;
            const prevIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
            
            preloadImage(portfolioImages[nextIndex].src);
            preloadImage(portfolioImages[prevIndex].src);
        }
        
        function openLightbox(imageInfo) {
            lightboxImage.style.opacity = '0';
            
            lightboxImage.src = imageInfo.src;
            lightboxCaptionTitle.textContent = imageInfo.title;
            lightboxCaptionCategory.textContent = imageInfo.category;
            
            if (lightboxCounter) {
                lightboxCounter.textContent = `${currentIndex + 1} of ${portfolioImages.length}`;
            }
            
            lightboxContainer.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(lightboxContent, 
                    { scale: 0.9, opacity: 0 }, 
                    { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
                );
                
                gsap.to(lightboxImage, { opacity: 1, duration: 0.4, delay: 0.1 });
            } else {
                setTimeout(() => {
                    lightboxImage.style.opacity = '1';
                }, 50);
            }
            
            preloadAdjacentImages();
        }
        
        function closeLightbox() {
            if (typeof gsap !== 'undefined') {
                gsap.to(lightboxContent, { 
                    scale: 0.9, 
                    opacity: 0, 
                    duration: 0.3, 
                    ease: "power2.in",
                    onComplete: () => {
                        lightboxContainer.classList.remove('show');
                        document.body.style.overflow = '';
                    }
                });
            } else {
                lightboxImage.style.opacity = '0';
                setTimeout(() => {
                    lightboxContainer.classList.remove('show');
                    document.body.style.overflow = '';
                }, 300);
            }
        }
        
        lightboxClose.addEventListener('click', closeLightbox);
        
        lightboxContainer.addEventListener('click', function(e) {
            if (e.target === lightboxContainer) {
                closeLightbox();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (!lightboxContainer.classList.contains('show')) return;
            
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'Home':
                    currentIndex = 0;
                    updateLightboxContent();
                    break;
                case 'End':
                    currentIndex = portfolioImages.length - 1;
                    updateLightboxContent();
                    break;
            }
        });
        
        lightboxNext.addEventListener('click', showNextImage);
        lightboxPrev.addEventListener('click', showPrevImage);
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        lightboxContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        lightboxContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const threshold = 50; 
            
            if (touchEndX < touchStartX - threshold) {
                showNextImage();
            } else if (touchEndX > touchStartX + threshold) {
                showPrevImage();
            }
        }
        
        function showNextImage() {
            currentIndex = (currentIndex + 1) % portfolioImages.length;
            updateLightboxContent();
        }
        
        function showPrevImage() {
            currentIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
            updateLightboxContent();
        }
        
        function updateLightboxContent() {
            if (lightboxCounter) {
                lightboxCounter.textContent = `${currentIndex + 1} of ${portfolioImages.length}`;
            }
            
            const imageInfo = portfolioImages[currentIndex];
            
            preloadAdjacentImages();
            
            if (typeof gsap !== 'undefined') {
                gsap.to(lightboxImage, { opacity: 0, duration: 0.2 });
                
                setTimeout(() => {
                    lightboxImage.src = imageInfo.src;
                    lightboxCaptionTitle.textContent = imageInfo.title;
                    lightboxCaptionCategory.textContent = imageInfo.category;
                    
                    gsap.to(lightboxImage, { opacity: 1, duration: 0.3 });
                }, 250);
            } else {
                lightboxImage.style.opacity = '0';
                
                setTimeout(() => {
                    lightboxImage.src = imageInfo.src;
                    lightboxCaptionTitle.textContent = imageInfo.title;
                    lightboxCaptionCategory.textContent = imageInfo.category;
                    
                    setTimeout(() => {
                        lightboxImage.style.opacity = '1';
                    }, 50);
                }, 200);
            }
        }
    }
    
    if (typeof gsap !== 'undefined') {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const overlay = item.querySelector('.portfolio-overlay');
            const info = item.querySelector('.portfolio-info');
            const title = item.querySelector('.portfolio-info h3');
            const category = item.querySelector('.portfolio-info span');
            const expand = item.querySelector('.portfolio-expand');
            const image = item.querySelector('img');
            
            const hoverTimeline = gsap.timeline({ paused: true });
            
            hoverTimeline
                .to(image, { 
                    scale: 1.1, 
                    rotation: 1, 
                    filter: "brightness(0.8) contrast(1.1)", 
                    duration: 0.7, 
                    ease: "power2.out" 
                }, 0)
                
                .to(overlay, { 
                    opacity: 1, 
                    duration: 0.4, 
                    ease: "power2.out" 
                }, 0)
                
                .to(info, { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.5, 
                    ease: "back.out(1.7)" 
                }, 0.1)
                
                .to(title, { 
                    duration: 0.4,
                    onStart: function() {
                        if (title.querySelector('::after')) {
                            gsap.to(title.querySelector('::after'), { 
                                width: '100%', 
                                duration: 0.5,
                                ease: "power2.out" 
                            });
                        }
                    }
                }, 0.2)
                
                .to(category, { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.4, 
                    ease: "power2.out" 
                }, 0.3)
                
                .to(expand, { 
                    opacity: 1, 
                    scale: 1, 
                    x: 0, 
                    y: 0, 
                    duration: 0.5, 
                    ease: "back.out(1.7)" 
                }, 0.2);
            
            item.addEventListener('mouseenter', () => {
                hoverTimeline.play();
            });
            
            item.addEventListener('mouseleave', () => {
                hoverTimeline.reverse();
            });
            
            if (window.matchMedia('(min-width: 1024px)').matches) {
                item.addEventListener('mousemove', (e) => {
                    const rect = item.getBoundingClientRect();
                    const mouseX = (e.clientX - rect.left) / rect.width - 0.5; 
                    const mouseY = (e.clientY - rect.top) / rect.height - 0.5; 
                    
                    gsap.to(item, {
                        rotationY: mouseX * 5, 
                        rotationX: -mouseY * 5,
                        transformPerspective: 1000,
                        duration: 0.3,
                        ease: "power1.out"
                    });
                });
                
                item.addEventListener('mouseleave', () => {
                    gsap.to(item, {
                        rotationY: 0,
                        rotationX: 0,
                        duration: 0.5,
                        ease: "power3.out"
                    });
                });
            }
        });
    }
    
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 500);
    }
    
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.2);
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s linear;
                z-index: 0;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    function setupPortfolioAnimations() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.objectPosition = 'center';
                img.style.display = 'block';
            }
            
            const imageContainer = item.querySelector('.portfolio-image');
            if (imageContainer) {
                imageContainer.style.width = '100%';
                imageContainer.style.height = '100%';
                imageContainer.style.aspectRatio = '3/4';
            }
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    
                    if (!item.classList.contains('animated')) {
                        item.classList.add('loading');
                        
                        const img = item.querySelector('img');
                        
                        if (img.complete) {
                            setTimeout(() => {
                                item.classList.remove('loading');
                                item.classList.add('animated');
                                animateItem(item);
                            }, 400);
                        } else {
                            img.onload = function() {
                                item.classList.remove('loading');
                                item.classList.add('animated');
                                animateItem(item);
                            };
                        }
                    }
                    
                    observer.unobserve(item);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        portfolioItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    function animateItem(item) {
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(item, 
                { y: 30, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
            );
        } else {
            item.style.animation = 'itemEntrance 0.6s forwards ease-out';
        }
    }
    
    function fixLightboxNavigation() {
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');
        const lightboxClose = document.querySelector('.lightbox-close');
        
        if (lightboxPrev) {
            lightboxPrev.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-50%) scale(1.05)';
            });
            
            lightboxPrev.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-50%)';
            });
        }
        
        if (lightboxNext) {
            lightboxNext.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-50%) scale(1.05)';
            });
            
            lightboxNext.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-50%)';
            });
        }
        
        if (lightboxClose) {
            lightboxClose.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            lightboxClose.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    }
    
    setupPortfolioAnimations();
    fixLightboxNavigation();
    
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => {
                setupPortfolioAnimations();
            }, 700);
        });
    });
});
