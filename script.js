// Make body visible immediately
document.body.classList.add('loaded');

// Add page-specific class to body
const pageId = document.body.getAttribute('id') || 'index';
document.body.classList.add(`${pageId}-page`);

// Create floating particles
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particleContainer.appendChild(particle);
    }
    
    document.body.insertBefore(particleContainer, document.body.firstChild);
}

createParticles();

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Parallax effect for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.1;
        section.style.backgroundPositionY = rate + 'px';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            // If it's a different page, navigate normally
            window.location.href = this.getAttribute('href');
        }
    });
});

// Slideshow functionality
function initSlideshow() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (!slideshowContainer) return;
    
    const slides = slideshowContainer.querySelectorAll('.slide');
    const dots = slideshowContainer.querySelectorAll('.slide-dot');
    let currentSlide = 0;
    
    const slideImages = [
        {
            url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80',
            caption: 'Building the Future with Code'
        },
        {
            url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
            caption: 'Collaborating on Innovative Solutions'
        },
        {
            url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80',
            caption: 'Data Science & Machine Learning'
        },
        {
            url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
            caption: 'Exploring New Technologies'
        }
    ];
    
    // Create slides dynamically
    slides.forEach((slide, index) => {
        slide.style.backgroundImage = `url(${slideImages[index].url})`;
        const caption = document.createElement('div');
        caption.className = 'slide-caption';
        caption.textContent = slideImages[index].caption;
        slide.appendChild(caption);
    });
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Auto-advance slides
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
    
    // Pause on hover
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slideshowContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Contact form validation and submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission with animation
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Skill bar animations
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Scroll-triggered animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .info-card, .memory-card, .vision-card, .timeline-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Add animation classes to timeline items
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// Initialize all functions on page load
window.addEventListener('load', function() {
    // Make the body visible
    document.body.classList.add('loaded');
    
    // Initialize slideshow
    initSlideshow();
    
    // Initialize skill bar animations
    animateSkillBars();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize timeline
    initTimeline();
    
    // Animate sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('loaded');
        }, index * 200);
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.info-card, .vision-card, .memory-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
