<div align="center">

# 📸 Lumina

<p>
  <strong>A professional, responsive photography portfolio website built with modern web technologies.</strong><br>
  Lumina showcases stunning photography work with smooth animations, dynamic galleries, and an elegant dark theme design.
</p>

<p>
  <a href="https://lumina-knjq.onrender.com" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-b3946a?style=for-the-badge&logoColor=white" alt="Live Demo">
  </a>
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" alt="Version">
</p>

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=white" alt="GSAP">
</p>

---

</div>

## 🌟 Features

<table>
<tr>
<td width="50%">

### 🎯 Core Functionality
- ✅ **Responsive Design** - Optimized for all devices
- 🌙 **Dark Theme** - Elegant design with golden accents
- 🖼️ **Portfolio Gallery** - Dynamic grid with filtering
- 🔍 **Lightbox Viewer** - Full-screen image viewing
- 📧 **Contact Forms** - Professional inquiry forms
- 📝 **Blog System** - Photography journal & articles
- 👤 **About Page** - Comprehensive photographer profile

</td>
<td width="50%">

### ⚡ Technical Features
- 🎬 **Smooth Animations** - GSAP-powered transitions
- 🚀 **Lazy Loading** - Optimized image loading
- 🔄 **Isotope Filtering** - Advanced categorization
- 📱 **Swiper Integration** - Touch-friendly sliders
- 👀 **AOS Animations** - Scroll-triggered reveals
- ✔️ **Form Validation** - Client-side validation
- 🔍 **SEO Optimized** - Proper meta tags & semantic HTML

</td>
</tr>
</table>

## 🛠️ Technology Stack

<details>
<summary><strong>Frontend Technologies</strong></summary>

| Technology | Purpose | Version |
|------------|---------|---------|
| **HTML5** | Semantic markup structure | Latest |
| **CSS3** | Custom styling with Flexbox & Grid | Latest |
| **JavaScript (ES6+)** | Modern JavaScript features | ES2020+ |
| **GSAP** | Professional animation library | 3.x |
| **Swiper.js** | Touch slider functionality | 8.x |
| **Isotope** | Dynamic layout and filtering | 3.x |
| **AOS** | Animate On Scroll library | 2.x |

</details>

<details>
<summary><strong>Design & Assets</strong></summary>

- **Google Fonts** - Playfair Display & Montserrat
- **Font Awesome** - Professional icon set
- **CSS Custom Properties** - Modern CSS variables
- **Mobile-First Design** - Responsive approach

</details>

## 📁 Project Structure

```
📦 Lumina/
├── 🏠 index.html                 # Homepage
├── 📂 assets/
│   ├── 🎨 css/
│   │   ├── reset.css            # CSS reset/normalize
│   │   ├── dark-theme.css       # Color scheme variables
│   │   ├── main.css             # Core styles
│   │   ├── animations.css       # Animation definitions
│   │   ├── responsive.css       # Responsive breakpoints
│   │   ├── about.css            # About page styles
│   │   ├── portfolio.css        # Portfolio page styles
│   │   ├── blog.css             # Blog page styles
│   │   └── contact.css          # Contact page styles
│   ├── ⚡ js/
│   │   ├── main.js              # Core functionality
│   │   ├── animations.js        # Animation controllers
│   │   ├── gallery.js           # Portfolio gallery logic
│   │   ├── about.js             # About page interactions
│   │   ├── portfolio.js         # Portfolio page logic
│   │   ├── blog.js              # Blog functionality
│   │   ├── contact.js           # Contact form handling
│   │   ├── slider.js            # Slider components
│   │   └── form-validation.js   # Form validation
│   └── 🖼️ img/
│       ├── hero/                # Hero section images
│       ├── gallery/             # Portfolio images
│       ├── about/               # About page images
│       ├── blog/                # Blog post images
│       ├── logo/                # Logo and favicon
│       └── icons/               # Custom icons
└── 📄 pages/
    ├── about.html               # About page
    ├── portfolio.html           # Portfolio gallery
    ├── blog.html                # Blog/journal
    └── contact.html             # Contact page
```

## 🚀 Getting Started

### Prerequisites

<blockquote>
<p>✅ Modern web browser (Chrome 60+, Firefox 60+, Safari 12+, Edge 79+)</p>
<p>⚡ Local web server (recommended for development)</p>
</blockquote>

### Installation

<details>
<summary><strong>📥 Clone & Setup</strong></summary>

```bash
# 1️⃣ Clone the repository
git clone https://github.com/XBastille/Lumina.git
cd Lumina

# 2️⃣ Start local server (choose one)

# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000

# 3️⃣ Open in browser
# Navigate to http://localhost:8000
```

</details>

<details>
<summary><strong>⚡ Quick Start</strong></summary>

Simply open `index.html` in your browser, though a local server is recommended for full functionality.

</details>

## 📱 Responsive Design

<table>
<tr>
<td align="center"><strong>📱 Mobile</strong><br><code>320px - 767px</code></td>
<td align="center"><strong>📟 Tablet</strong><br><code>768px - 991px</code></td>
<td align="center"><strong>💻 Desktop</strong><br><code>992px - 1199px</code></td>
<td align="center"><strong>🖥️ Large</strong><br><code>1200px+</code></td>
</tr>
</table>

## 🎨 Customization Guide

<details>
<summary><strong>🎯 Color Scheme</strong></summary>

Edit the color scheme in `assets/css/dark-theme.css`:

```css
:root {
    --color-primary: #b3946a;        /* 🟨 Golden accent */
    --color-bg-primary: #0a0a0a;     /* ⚫ Main background */
    --color-text-primary: #ffffff;    /* ⚪ Primary text */
    --color-accent: #b3946a;          /* ✨ Accent color */
}
```

</details>

<details>
<summary><strong>🔤 Typography</strong></summary>

Update font imports in HTML head sections:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@400;500;600&display=swap" rel="stylesheet">
```

</details>

<details>
<summary><strong>🖼️ Images</strong></summary>

Replace images in the `assets/img/` directory with your own photography work.

</details>

## 🔧 Configuration

<details>
<summary><strong>Portfolio Categories</strong></summary>

Edit portfolio filters in `portfolio.html`:

```html
<button class="filter-btn" data-filter=".your-category">Your Category</button>
```

</details>

<details>
<summary><strong>Contact Information</strong></summary>

Update contact details in `pages/contact.html` and `assets/js/contact.js`.

</details>

<details>
<summary><strong>Social Media Links</strong></summary>

Modify social links in the footer sections of all pages.

</details>

## 📊 Performance & Features

<table>
<tr>
<td width="50%">

### ⚡ Performance
- 🖼️ **Optimized Images** - Proper sizing & lazy loading
- 📦 **Minimal Dependencies** - Essential libraries only
- 🎬 **Smooth Animations** - Hardware-accelerated
- ⚡ **Fast Loading** - Optimized CSS & JavaScript

</td>
<td width="50%">

### 🔍 SEO & Accessibility
- 📱 **Mobile Responsive** - All device optimization
- 🔍 **SEO Friendly** - Semantic HTML & meta tags
- ♿ **Accessible** - WCAG guidelines compliance
- 🌐 **Cross-Browser** - Wide browser support

</td>
</tr>
</table>

## 🌐 Browser Compatibility

<p align="center">
  <img src="https://img.shields.io/badge/Chrome-60+-4285F4?style=flat&logo=googlechrome&logoColor=white" alt="Chrome 60+">
  <img src="https://img.shields.io/badge/Firefox-60+-FF7139?style=flat&logo=firefox&logoColor=white" alt="Firefox 60+">
  <img src="https://img.shields.io/badge/Safari-12+-000000?style=flat&logo=safari&logoColor=white" alt="Safari 12+">
  <img src="https://img.shields.io/badge/Edge-79+-0078D4?style=flat&logo=microsoftedge&logoColor=white" alt="Edge 79+">
</p>

</details>

## 📞 Support & Contact

<div align="center">

<p>
  <strong>Need help or have questions?</strong><br>
  Create an issue in the GitHub repository
</p>

<p>
  <a href="https://github.com/XBastille/Lumina/issues">
    <img src="https://img.shields.io/badge/💬_Support-Create_Issue-b3946a?style=for-the-badge" alt="Support">
  </a>
</p>

</div>

## 🙏 Acknowledgments

<table>
<tr>
<td align="center">
  <strong>🎬 GSAP</strong><br>
  <sub>Animation Library</sub>
</td>
<td align="center">
  <strong>📱 Swiper.js</strong><br>
  <sub>Slider Component</sub>
</td>
<td align="center">
  <strong>🎨 Font Awesome</strong><br>
  <sub>Icon Set</sub>
</td>
<td align="center">
  <strong>🔤 Google Fonts</strong><br>
  <sub>Typography</sub>
</td>
</tr>
</table>

---

<div align="center">

### 🔗 Quick Links

<p>
  <a href="https://lumina-knjq.onrender.com" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-b3946a?style=for-the-badge&logoColor=white" alt="Live Demo">
  </a>
  <a href="https://github.com/XBastille/Lumina" target="_blank">
    <img src="https://img.shields.io/badge/📂_Source_Code-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Source Code">
  </a>
</p>

<p>
  <strong>Made with ❤️ by <a href="https://github.com/XBastille">XBastille</a></strong>
</p>

<p>
  <sub>⭐ Star this repository if you found it helpful!</sub>
</p>

</div>
