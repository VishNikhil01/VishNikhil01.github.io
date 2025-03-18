// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach((section) => {
    observer.observe(section);
});

// Lightbox functionality
function openLightbox(imgElement) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    
    lightboxImg.src = imgElement.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add zoom effect
    setTimeout(() => {
        lightboxImg.style.transform = 'scale(1)';
    }, 50);
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    
    lightboxImg.style.transform = 'scale(0.9)';
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close lightbox with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Typing Animation for Name
function typeWriter(element, text, speed = 100) {
    let displayText = '';
    let i = 0;
    let isDeleting = false;
    let isPaused = false;
    let pauseTime = 2000; // Time to pause at full text

    function type() {
        if (!isDeleting && i < text.length) {
            // Typing forward
            displayText += text.charAt(i);
            element.textContent = displayText;
            i++;
            setTimeout(type, speed);
        } else if (!isDeleting && i === text.length && !isPaused) {
            // Pause at the end
            isPaused = true;
            setTimeout(type, pauseTime);
        } else if (!isDeleting && isPaused) {
            // Start deleting
            isDeleting = true;
            isPaused = false;
            setTimeout(type, speed);
        } else if (isDeleting && displayText.length > 0) {
            // Deleting
            displayText = displayText.slice(0, -1);
            element.textContent = displayText;
            setTimeout(type, speed / 2);
        } else if (isDeleting && displayText.length === 0) {
            // Reset for next loop
            isDeleting = false;
            i = 0;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animations when document loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded");
    
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        console.log("Found hamburger and navLinks");
        
        // Make sure we have the right icon initially
        const icon = hamburger.querySelector('i');
        if (icon) {
            if (!icon.classList.contains('fa-bars')) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
        
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Hamburger clicked!');
            
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            } else {
                navLinks.classList.add('active');
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    } else {
        console.log("Could not find hamburger or navLinks");
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks && hamburger && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target) && 
            navLinks.classList.contains('active')) {
            
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });

    // Close menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    });

    // Start name typing animation
    const nameElement = document.querySelector('.typing-name');
    if (nameElement) {
        typeWriter(nameElement, 'Hi Iam , Nikhil', 100);
    }

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        console.log("Found contact form");
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Form submitted");
            
            // Get the form message element
            const formMessage = document.getElementById('formMessage');
            
            // Show loading message
            formMessage.textContent = 'Sending message...';
            formMessage.style.color = '#333';
            formMessage.className = 'form-message';
            
            // Get submit button and disable it during submission
            const submitButton = contactForm.querySelector('.submit-button');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }

            // Create template parameters object
            const templateParams = {
                user_name: document.getElementById('user_name').value,
                user_email: document.getElementById('user_email').value,
                to_email: document.getElementById('to_email').value,
                message: document.getElementById('message').value
            };
            
            console.log("Sending email with params:", templateParams);
            
            // Send the email using EmailJS - using send method instead of sendForm
            emailjs.send(
                'service_nv3ejpx', 
                'template_vmyegga',
                templateParams
            )
            .then(function(response) {
                console.log('EmailJS SUCCESS!', response.status, response.text);
                
                // Show success message
                formMessage.textContent = 'Message sent successfully!';
                formMessage.style.color = 'green';
                formMessage.className = 'form-message success';
                
                // Reset the form
                contactForm.reset();
                
                // Re-enable the submit button
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                }
            }, function(error) {
                console.error('EmailJS FAILED...', error);
                
                // Show detailed error message
                formMessage.textContent = `Failed to send message: ${error.text}. Please try again.`;
                formMessage.style.color = 'red';
                formMessage.className = 'form-message error';
                
                // Re-enable the submit button
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                }
            });
        });
    } else {
        console.log("Contact form not found");
    }

    // Loading screen animation
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1000);

    // Project slider functionality
    let currentSlide = 0;
    const projectCards = document.querySelectorAll('.project-card');
    const totalSlides = Math.ceil(projectCards.length / 2);

    window.slideProjects = function(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        const offset = currentSlide * -100;
        document.querySelector('.project-cards').style.transform = `translateX(${offset}%)`;
    };
});

// Resume section functionality
function showResume() {
    const resumeSection = document.getElementById('resume');
    if (resumeSection) {
        resumeSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Project filter functionality
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        const projectCategory = project.getAttribute('data-category');
        
        if (category === 'all' || projectCategory === category) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 50);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// Dark mode toggled
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.5s ease;
    }

    .notification.success {
        background: #28a745;
    }

    .notification.error {
        background: #dc3545;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);