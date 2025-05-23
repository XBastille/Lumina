# Lumina 

A professional, responsive photography portfolio website built with modern web technologies. Lumina showcases stunning photography work with smooth animations, dynamic galleries, and an elegant dark theme design.

## 🌟 Features

### Core Functionality
- **Responsive Design** - Optimized for all devices (desktop, tablet, mobile)
- **Dark Theme** - Elegant dark color scheme with golden accents
- **Portfolio Gallery** - Dynamic grid layout with filtering capabilities
- **Lightbox Viewer** - Full-screen image viewing with navigation
- **Contact Forms** - Professional contact and inquiry forms
- **Blog System** - Photography journal and articles
- **About Page** - Comprehensive photographer profile

### Technical Features
- **Smooth Animations** - GSAP-powered transitions and scroll effects
- **Lazy Loading** - Optimized image loading with skeleton loaders
- **Isotope Filtering** - Advanced portfolio categorization
- **Swiper Integration** - Touch-friendly testimonial sliders
- **AOS Animations** - Scroll-triggered reveal animations
- **Form Validation** - Client-side form validation
- **SEO Optimized** - Proper meta tags and semantic HTML

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Custom styling with Flexbox and Grid
- **JavaScript (ES6+)** - Modern JavaScript features
- **GSAP** - Professional animation library
- **Swiper.js** - Touch slider functionality
- **Isotope** - Dynamic layout and filtering
- **AOS** - Animate On Scroll library

### Fonts & Icons
- **Google Fonts** - Playfair Display & Montserrat
- **Font Awesome** - Professional icon set

### Build Tools
- **Vanilla JS** - No framework dependencies
- **CSS Custom Properties** - Modern CSS variables
- **Responsive Design** - Mobile-first approach

## 📁 Project Structure

```
Lumina/
├── index.html                 # Homepage
├── assets/
│   ├── css/
│   │   ├── reset.css         # CSS reset/normalize
│   │   ├── dark-theme.css    # Color scheme variables
│   │   ├── main.css          # Core styles
│   │   ├── animations.css    # Animation definitions
│   │   ├── responsive.css    # Responsive breakpoints
│   │   ├── about.css         # About page styles
│   │   ├── portfolio.css     # Portfolio page styles
│   │   ├── blog.css          # Blog page styles
│   │   └── contact.css       # Contact page styles
│   ├── js/
│   │   ├── main.js           # Core functionality
│   │   ├── animations.js     # Animation controllers
│   │   ├── gallery.js        # Portfolio gallery logic
│   │   ├── about.js          # About page interactions
│   │   ├── portfolio.js      # Portfolio page logic
│   │   ├── blog.js           # Blog functionality
│   │   ├── contact.js        # Contact form handling
│   │   ├── slider.js         # Slider components
│   │   └── form-validation.js # Form validation
│   ├── img/
│   │   ├── hero/             # Hero section images
│   │   ├── gallery/          # Portfolio images
│   │   ├── about/            # About page images
│   │   ├── blog/             # Blog post images
│   │   ├── logo/             # Logo and favicon
│   │   └── icons/            # Custom icons
│   └── fonts/                # Custom fonts (if any)
└── pages/
    ├── about.html            # About page
    ├── portfolio.html        # Portfolio gallery
    ├── blog.html             # Blog/journal
    └── contact.html          # Contact page
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local web server (recommended for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/XBastille/Lumina.git
   cd Lumina
   ```

2. **Open with a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000` in your web browser

### Quick Start
Simply open `index.html` in your browser, though a local server is recommended for full functionality.

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 991px
- **Desktop**: 992px - 1199px
- **Large Desktop**: 1200px+

## 🎨 Customization

### Colors
Edit the color scheme in `assets/css/dark-theme.css`:
```css
:root {
    --color-primary: #b3946a;     /* Golden accent */
    --color-bg-primary: #0a0a0a;  /* Main background */
    --color-text-primary: #ffffff; /* Primary text */
    /* ... more variables */
}
```

### Fonts
Update font imports in HTML head sections:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@400;500;600&display=swap" rel="stylesheet">
```

### Images
Replace images in the `assets/img/` directory with your own photography work.

## 🔧 Configuration

### Portfolio Categories
Edit portfolio filters in portfolio.html:
```html
<button class="filter-btn" data-filter=".your-category">Your Category</button>
```

### Contact Information
Update contact details in `pages/contact.html` and `assets/js/contact.js`.

### Social Media Links
Modify social links in the footer sections of all pages.

## 📊 Performance Features

- **Optimized Images** - Proper sizing and lazy loading
- **Minimal Dependencies** - Only essential libraries loaded
- **Smooth Animations** - Hardware-accelerated transitions
- **Fast Loading** - Optimized CSS and JavaScript
- **SEO Friendly** - Semantic HTML and meta tags

## 🌐 Browser Support

- **Chrome** 60+
- **Firefox** 60+
- **Safari** 12+
- **Edge** 79+
- **Mobile Browsers** - iOS Safari, Chrome Mobile

## 📞 Support

For support, create an issue.

---

**Live Demo**: View Demo  
**Documentation**: Full Docs  
**Portfolio**: Author's Work

Made with ❤️ by XBastille
