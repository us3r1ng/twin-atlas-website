// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;

        // If this is the header, initialize its JavaScript
        if (elementId === 'header') {
            initializeHeader();
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Header specific initialization
function initializeHeader() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const currentPage = document.querySelector('.current-page');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Set current page in header
    if (currentPage) {
        const pageName = document.title.split('-')[0].trim();
        currentPage.textContent = pageName;
    }

    // Update active state in navigation
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', () => {
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            if (currentPage) {
                currentPage.textContent = link.textContent;
            }
            
            // Close mobile menu when link is clicked
            if (mobileMenuBtn && navLinks) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', '/components/header.html');
    loadComponent('footer', '/components/footer.html');
}); 