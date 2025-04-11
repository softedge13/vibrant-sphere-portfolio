
// DOM Elements
const navHeader = document.querySelector('.nav-header');
const menuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const toastCloseBtn = document.querySelector('.toast-close');
const heroTypingText = document.getElementById('hero-typing-text');

// State
let activeSection = 'home';
let isMenuOpen = false;
let isTyping = false;
let typingInterval = null;
let typingIndex = 0;
let typingText = "Creative 3D Developer";

// Functions
function handleScroll() {
  if (window.scrollY > 20) {
    navHeader.classList.add('scrolled');
  } else {
    navHeader.classList.remove('scrolled');
  }
}

function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  menuBtn.classList.toggle('active', isMenuOpen);
  mobileNav.classList.toggle('active', isMenuOpen);
}

function changeSection(sectionId) {
  activeSection = sectionId;
  
  // Update active section
  sections.forEach(section => {
    if (section.id === sectionId) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
  
  // Update active nav item
  navItems.forEach(item => {
    if (item.dataset.section === sectionId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
  
  // Close mobile menu if open
  if (isMenuOpen) {
    toggleMenu();
  }
}

function initTypingAnimation() {
  // Reset
  typingIndex = 0;
  heroTypingText.textContent = '';
  heroTypingText.classList.add('typing');
  
  // Start typing
  typingInterval = setInterval(() => {
    if (typingIndex < typingText.length) {
      heroTypingText.textContent += typingText.charAt(typingIndex);
      typingIndex++;
    } else {
      // Typing complete
      clearInterval(typingInterval);
      setTimeout(() => {
        heroTypingText.classList.remove('typing');
      }, 1500);
    }
  }, 100); // Typing speed
}

function showToast() {
  toast.classList.add('active');
  
  setTimeout(() => {
    toast.classList.remove('active');
  }, 5000);
}

// Event Listeners
window.addEventListener('scroll', handleScroll);

menuBtn.addEventListener('click', toggleMenu);

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const sectionId = item.dataset.section;
    changeSection(sectionId);
  });
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Show loading state
  const submitBtn = contactForm.querySelector('.submit-btn');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.classList.add('loading');
  submitBtn.innerHTML = `
    <svg class="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span>Sending...</span>
  `;
  
  // Simulate form submission
  setTimeout(() => {
    // Reset form
    contactForm.reset();
    
    // Reset button
    submitBtn.classList.remove('loading');
    submitBtn.innerHTML = originalBtnText;
    
    // Show toast notification
    showToast();
  }, 1500);
});

toastCloseBtn.addEventListener('click', () => {
  toast.classList.remove('active');
});

// Handle clicks on card buttons
document.querySelectorAll('.card-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    // Handle card button click
    console.log('Card button clicked');
  });
});

// Handle card hover effects
document.querySelectorAll('.animated-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.card-back').style.opacity = '1';
  });
  
  card.addEventListener('mouseleave', () => {
    card.querySelector('.card-back').style.opacity = '0';
  });
});

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  // Set initial active section
  changeSection(activeSection);
  
  // Init typing animation
  setTimeout(initTypingAnimation, 500);
  
  // Check scroll position
  handleScroll();
});
