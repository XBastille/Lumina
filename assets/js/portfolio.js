document.addEventListener('DOMContentLoaded', function() {
    let grid = document.querySelector('.portfolio-grid');
    let iso;
    
    if (grid && typeof Isotope !== 'undefined') {
        iso = new Isotope(grid, {
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            transitionDuration: '0.6s'
        });
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                if (filterValue === '*') {
                    iso.arrange({ filter: '*' });
                } else {
                    iso.arrange({ filter: filterValue });
                }
                
                setTimeout(() => {
                    AOS.refresh();
                }, 600);
            });
        });
    }
    
    const portfolioItems = document.querySelectorAll('.portfolio-expand');
    const lightboxContainer = document.querySelector('.lightbox-container');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxCaptionTitle = document.querySelector('.lightbox-caption h3');
    const lightboxCaptionCategory = document.querySelector('.lightbox-caption span');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    const portfolioImages = [];
    
    if (portfolioItems.length && lightboxContainer) {
        portfolioItems.forEach((item, index) => {
            const imageInfo = {
                src: item.getAttribute('href'),
                title: item.closest('.portfolio-item').querySelector('.portfolio-info h3').textContent,
                category: item.closest('.portfolio-item').querySelector('.portfolio-info span').textContent
            };
            
            portfolioImages.push(imageInfo);
            
            item.addEventListener('click', function(e) {
                e.preventDefault();
                currentIndex = index;
                openLightbox(imageInfo);
            });
        });
        
        function openLightbox(imageInfo) {
            lightboxImage.src = imageInfo.src;
            lightboxCaptionTitle.textContent = imageInfo.title;
            lightboxCaptionCategory.textContent = imageInfo.category;
            
            setTimeout(() => {
                lightboxContainer.classList.add('show');
                document.body.style.overflow = 'hidden';
            }, 10);
        }
        
        lightboxClose.addEventListener('click', closeLightbox);
        lightboxContainer.addEventListener('click', function(e) {
            if (e.target === lightboxContainer) {
                closeLightbox();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightboxContainer.classList.contains('show')) {
                closeLightbox();
            }
            
            if (lightboxContainer.classList.contains('show')) {
                if (e.key === 'ArrowRight') {
                    showNextImage();
                }
                if (e.key === 'ArrowLeft') {
                    showPrevImage();
                }
            }
        });
        
        function closeLightbox() {
            lightboxContainer.classList.remove('show');
            document.body.style.overflow = '';
            
            setTimeout(() => {
                lightboxImage.src = '';
            }, 300);
        }
        
        lightboxNext.addEventListener('click', showNextImage);
        lightboxPrev.addEventListener('click', showPrevImage);
        
        function showNextImage() {
            currentIndex = (currentIndex + 1) % portfolioImages.length;
            updateLightboxContent();
        }
        
        function showPrevImage() {
            currentIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
            updateLightboxContent();
        }
        
        function updateLightboxContent() {
            lightboxImage.style.opacity = '0';
            
            setTimeout(() => {
                const imageInfo = portfolioImages[currentIndex];
                lightboxImage.src = imageInfo.src;
                lightboxCaptionTitle.textContent = imageInfo.title;
                lightboxCaptionCategory.textContent = imageInfo.category;
                
                setTimeout(() => {
                    lightboxImage.style.opacity = '1';
                }, 50);
            }, 200);
        }
    }
    
    AOS.refresh();
    
    if (typeof gsap !== 'undefined') {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const overlay = item.querySelector('.portfolio-overlay');
            const info = item.querySelector('.portfolio-info');
            const expand = item.querySelector('.portfolio-expand');
            const image = item.querySelector('img');
            
            const hoverTimeline = gsap.timeline({ paused: true });
            
            hoverTimeline
                .to(image, { scale: 1.1, duration: 0.6, ease: "power2.out" }, 0)
                .to(overlay, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0)
                .to(info, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, 0.1)
                .to(expand, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, 0.2);
            
            item.addEventListener('mouseenter', () => hoverTimeline.play());
            item.addEventListener('mouseleave', () => hoverTimeline.reverse());
        });
    }
});