document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    
    initAccordion();
    
    initSmoothScroll();
    
    initMapInteraction();
    
    if (window.innerWidth >= 992) {
        initCustomCursor();
    }
});

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const formGroups = contactForm.querySelectorAll('.form-group');
    const successMessage = contactForm.querySelector('.success-message');
    const errorMessage = contactForm.querySelector('.error-message');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (!input) return;
        
        input.addEventListener('focus', function() {
            group.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                group.classList.remove('focused');
            }
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        resetFormErrors();
        hideFormMessages();
        
        if (validateForm()) {
            simulateFormSubmission();
        }
    });
    
    function validateForm() {
        let isValid = true;
        
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        const emailInput = document.getElementById('email');
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        const subjectInput = document.getElementById('subject');
        if (!subjectInput.value.trim()) {
            showError(subjectInput, 'Please enter a subject');
            isValid = false;
        }
        
        const messageInput = document.getElementById('message');
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Please enter your message');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        const privacyCheckbox = document.getElementById('privacy');
        if (!privacyCheckbox.checked) {
            showError(privacyCheckbox, 'You must agree to the privacy policy');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        formGroup.classList.add('has-error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function resetFormErrors() {
        formGroups.forEach(group => {
            group.classList.remove('has-error');
            const errorElement = group.querySelector('.form-error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    }
    
    function hideFormMessages() {
        if (successMessage) successMessage.classList.remove('show');
        if (errorMessage) errorMessage.classList.remove('show');
    }
  
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function simulateFormSubmission() {
        const submitButton = contactForm.querySelector('.submit-btn');
        
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        }
        
        setTimeout(function() {
            const isSuccess = Math.random() < 0.95;
            
            if (isSuccess) {
                if (successMessage) successMessage.classList.add('show');
                
                contactForm.reset();
                formGroups.forEach(group => group.classList.remove('focused'));
            } else {
                if (errorMessage) errorMessage.classList.add('show');
            }
            
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
            }
        }, 1500);
    }
}

function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (!accordionItems.length) return;
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        if (!header || !content) return;
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // accordionItems.forEach(accItem => {
            //     accItem.classList.remove('active');
            // });
            
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

function initSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a.smooth-scroll');
    if (!smoothScrollLinks.length) return;
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (!targetElement) return;
            
            const headerOffset = 100; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}


function initMapInteraction() {
    const mapContainer = document.querySelector('.map-container');
    const mapCard = document.querySelector('.map-card');
    
    if (!mapContainer || !mapCard) return;
    
    mapCard.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 25px 35px rgba(0, 0, 0, 0.3)';
    });
    
    mapCard.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow-lg)';
    });
}

function initCustomCursor() {
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursor || !cursorOutline) return;
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        setTimeout(() => {
            cursorOutline.style.left = `${e.clientX}px`;
            cursorOutline.style.top = `${e.clientY}px`;
        }, 50);
    });
    
    const clickables = document.querySelectorAll('a, button, input, .accordion-header, .social-icon');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorOutline.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorOutline.classList.remove('active');
        });
    });
}

window.addEventListener('load', function() {
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.remove('loading');
            }, 300);
        }
    }, 500);
    
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});