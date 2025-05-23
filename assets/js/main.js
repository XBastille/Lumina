document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100, 
        delay: 0,    
        mirror: false,
        anchorPlacement: 'top-bottom' 
    });
    
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        setTimeout(function() {
            preloader.classList.add('hide');
            document.body.classList.remove('loading');
        }, 500);
    });

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        document.addEventListener('mousemove', function(e) {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            
            setTimeout(function() {
                cursorOutline.style.left = e.clientX + 'px';
                cursorOutline.style.top = e.clientY + 'px';
            }, 50);
        });
        
        const hoverElements = document.querySelectorAll('a, button, .gallery-item, .instagram-item');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(179, 148, 106, 0.2)';
                cursorOutline.style.borderWidth = '0px';
            });
            
            element.addEventListener('mouseleave', function() {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderWidth = '2px';
            });
        });
    }

    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            document.body.classList.toggle('nav-open');
        });
    }

    document.addEventListener('click', function(e) {
        if (document.body.classList.contains('nav-open') && 
            !e.target.closest('.nav') && 
            !e.target.closest('.nav-toggle')) {
            document.body.classList.remove('nav-open');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    document.body.classList.remove('nav-open');
                    
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                const successMessage = document.createElement('p');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.style.color = 'var(--color-accent)';
                successMessage.style.marginTop = '1rem';
                
                const previousMessage = this.querySelector('.success-message');
                if (previousMessage) {
                    previousMessage.remove();
                }
                
                this.appendChild(successMessage);
                emailInput.value = '';
            }
        });
    }

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const featuredWork = document.querySelector('.featured-work');
            if (featuredWork) {
                window.scrollTo({
                    top: featuredWork.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }
});