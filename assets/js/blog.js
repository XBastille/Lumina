
document.addEventListener('DOMContentLoaded', function() {
    initCategoryFiltering();
    initSearch();
    initPagination();
    initShareButtons();
    initNewsletterForm();
    initInstagramFeed();
    
    initSmoothScroll();
    
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});


function initCategoryFiltering() {
    const categoryLinks = document.querySelectorAll('.post-category, .categories-list a, .tag');
    if (!categoryLinks.length) return;
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.querySelector('.category-name') 
                ? this.querySelector('.category-name').textContent.trim() 
                : this.textContent.trim();
            
            simulateCategoryFilter(category);
        });
    });
    
    
    function simulateCategoryFilter(category) {
        const feedbackEl = document.createElement('div');
        feedbackEl.className = 'filter-feedback';
        feedbackEl.innerHTML = `<div class="filter-message">
            <i class="fas fa-filter"></i>
            <span>Filtering by: <strong>${category}</strong></span>
        </div>`;
        
        document.body.appendChild(feedbackEl);
        
        const posts = document.querySelectorAll('.blog-post');
        posts.forEach(post => {
            post.style.opacity = '0.5';
            post.style.transform = 'scale(0.98)';
        });
        
        setTimeout(() => {
            posts.forEach(post => {
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
            });
            
            feedbackEl.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(feedbackEl);
            }, 300);
        }, 800);
    }
}


function initSearch() {
    const searchForm = document.querySelector('.search-form');
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchInput = this.querySelector('input');
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm.length < 2) {
            searchInput.classList.add('error');
            setTimeout(() => {
                searchInput.classList.remove('error');
            }, 1000);
            return;
        }
        
        simulateSearch(searchTerm);
    });
    
   
    function simulateSearch(term) {
        const feedbackEl = document.createElement('div');
        feedbackEl.className = 'search-feedback';
        feedbackEl.innerHTML = `<div class="search-message">
            <i class="fas fa-search"></i>
            <span>Searching for: <strong>${term}</strong></span>
        </div>`;
        
        document.body.appendChild(feedbackEl);
        
        const posts = document.querySelectorAll('.blog-post');
        posts.forEach(post => {
            post.style.opacity = '0.5';
            post.style.transform = 'translateY(10px)';
        });
        
        setTimeout(() => {
            posts.forEach(post => {
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
            });
            
            feedbackEl.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(feedbackEl);
            }, 300);
        }, 800);
    }
}


function initPagination() {
    const paginationLinks = document.querySelectorAll('.pagination-numbers a, .pagination-prev, .pagination-next');
    if (!paginationLinks.length) return;
    
    paginationLinks.forEach(link => {
        if (link.classList.contains('disabled')) return;
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelectorAll('.pagination-numbers a').forEach(num => {
                num.classList.remove('active');
            });
            
            if (this.parentElement.classList.contains('pagination-numbers')) {
                this.classList.add('active');
            }
            
            const isNumber = this.parentElement.classList.contains('pagination-numbers');
            const pageTarget = isNumber ? this.textContent.trim() : 
                               this.classList.contains('pagination-next') ? 'next' : 'prev';
            
            simulatePageChange(pageTarget);
        });
    });
    
   
    function simulatePageChange(target) {
        const blogContent = document.querySelector('.blog-content');
        if (blogContent) {
            window.scrollTo({
                top: blogContent.offsetTop - 100,
                behavior: 'smooth'
            });
        }
        
        const posts = document.querySelectorAll('.blog-post');
        posts.forEach(post => {
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
        });
        
        const loadingEl = document.createElement('div');
        loadingEl.className = 'page-loading';
        loadingEl.innerHTML = `<div class="loading-spinner">
            <i class="fas fa-circle-notch fa-spin"></i>
            <span>Loading page ${target}...</span>
        </div>`;
        
        const mainContent = document.querySelector('.col-lg-8');
        if (mainContent) {
            mainContent.appendChild(loadingEl);
        }
        
        setTimeout(() => {
            posts.forEach(post => {
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
            });
            
            if (mainContent && loadingEl) {
                mainContent.removeChild(loadingEl);
            }
        }, 800);
    }
}

function initShareButtons() {
    const shareButtons = document.querySelectorAll('.post-share a');
    if (!shareButtons.length) return;
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const postContainer = this.closest('.blog-post');
            const postTitle = postContainer.querySelector('.post-title a').textContent;
            const postUrl = window.location.href;
            
            const platform = this.querySelector('i').className;
            
            let shareUrl = '';
            
            if (platform.includes('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}&t=${encodeURIComponent(postTitle)}`;
            } else if (platform.includes('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`;
            } else if (platform.includes('pinterest')) {
                const postImage = postContainer.querySelector('.post-image img');
                const imageUrl = postImage ? postImage.src : '';
                shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(postUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(postTitle)}`;
            }
            
            if (shareUrl) {
                window.open(shareUrl, 'share-dialog', 'width=626,height=436');
            }
        });
    });
}


function initNewsletterForm() {
    const newsLetterForms = document.querySelectorAll('.newsletter-form, .subscribe-form');
    if (!newsLetterForms.length) return;
    
    newsLetterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                emailInput.classList.add('error');
                
                let errorMsg = this.querySelector('.form-error');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'form-error';
                    emailInput.parentNode.appendChild(errorMsg);
                }
                
                errorMsg.textContent = 'Please enter a valid email address';
                errorMsg.style.display = 'block';
                
                setTimeout(() => {
                    emailInput.classList.remove('error');
                    errorMsg.style.display = 'none';
                }, 3000);
                
                return;
            }
            
            simulateFormSubmission(this, email);
        });
    });
    
  
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
   
    function simulateFormSubmission(form, email) {
        const submitBtn = form.querySelector('button');
        const emailInput = form.querySelector('input[type="email"]');
        
        submitBtn.disabled = true;
        emailInput.disabled = true;
        
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        
        setTimeout(() => {
            let successMsg = form.querySelector('.form-success');
            if (!successMsg) {
                successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                form.appendChild(successMsg);
            }
            
            successMsg.innerHTML = `<i class="fas fa-check-circle"></i> Thank you for subscribing!`;
            successMsg.style.display = 'block';
            
            form.reset();
            
            submitBtn.innerHTML = originalBtnHTML;
            submitBtn.disabled = false;
            emailInput.disabled = false;
            
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 4000);
        }, 1500);
    }
}

function initInstagramFeed() {
    const instagramItems = document.querySelectorAll('.instagram-item');
    if (!instagramItems.length) return;
    
    instagramItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imageUrl = this.querySelector('img').src;
            
            const modal = document.createElement('div');
            modal.className = 'instagram-modal';
            modal.innerHTML = `
                <div class="instagram-modal-content">
                    <span class="instagram-modal-close">&times;</span>
                    <img src="${imageUrl}" alt="Instagram post">
                    <div class="instagram-modal-caption">
                        <p>Instagram post from Lumina Photography</p>
                        <a href="https://instagram.com" target="_blank" class="instagram-view-link">
                            <i class="fab fa-instagram"></i> View on Instagram
                        </a>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal || e.target.classList.contains('instagram-modal-close')) {
                    modal.classList.remove('show');
                    
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        document.body.style.overflow = '';
                    }, 300);
                }
            });
        });
    });
}


function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
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
});

(function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .filter-feedback, .search-feedback {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            transition: opacity 0.3s ease;
        }
        
        .filter-message, .search-message {
            background-color: var(--color-accent);
            color: var(--color-bg-primary);
            padding: 12px 20px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .filter-message i, .search-message i {
            margin-right: 10px;
            font-size: 16px;
        }
        
        .page-loading {
            display: flex;
            justify-content: center;
            margin: 40px 0;
        }
        
        .loading-spinner {
            display: flex;
            align-items: center;
            color: var(--color-accent);
            font-size: 16px;
        }
        
        .loading-spinner i {
            margin-right: 10px;
            font-size: 20px;
        }
        
        .form-error, .form-success {
            margin-top: 10px;
            padding: 10px;
            border-radius: 3px;
            font-size: 14px;
            display: none;
        }
        
        .form-error {
            background-color: rgba(231, 76, 60, 0.1);
            color: #e74c3c;
        }
        
        .form-success {
            background-color: rgba(46, 204, 113, 0.1);
            color: #2ecc71;
            display: flex;
            align-items: center;
        }
        
        .form-success i {
            margin-right: 8px;
        }
        
        input.error {
            border-color: #e74c3c !important;
        }
        
        .instagram-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(10, 10, 10, 0.9);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .instagram-modal.show {
            opacity: 1;
        }
        
        .instagram-modal-content {
            max-width: 90%;
            max-height: 90%;
            background-color: var(--color-bg-primary);
            border-radius: 4px;
            overflow: hidden;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .instagram-modal.show .instagram-modal-content {
            transform: scale(1);
        }
        
        .instagram-modal-close {
            position: absolute;
            top: 10px;
            right: 15px;
            color: white;
            font-size: 28px;
            cursor: pointer;
            z-index: 10;
            background-color: rgba(0,0,0,0.5);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
        }
        
        .instagram-modal img {
            max-width: 100%;
            max-height: 80vh;
            display: block;
        }
        
        .instagram-modal-caption {
            padding: 15px;
            background-color: var(--color-bg-primary);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .instagram-view-link {
            display: flex;
            align-items: center;
            color: var(--color-accent);
            font-size: 14px;
            transition: color 0.3s ease;
        }
        
        .instagram-view-link i {
            margin-right: 8px;
        }
        
        .instagram-view-link:hover {
            color: var(--color-accent-light);
        }
        
        @media (max-width: 767.98px) {
            .instagram-modal-caption {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }
        }
    `;
    
    document.head.appendChild(style);
})();