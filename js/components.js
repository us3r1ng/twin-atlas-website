// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Header initialization
function initializeHeader() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const currentPage = document.querySelector('.current-page');
    
    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Get current page from URL
    const path = window.location.pathname;
    const currentFile = path.includes('index.html') || path === '/' || path === '' ? 'index.html' : path.split('/').pop();

    console.log('Current file:', currentFile, 'Path:', path);
    
    // Update navigation state
    document.querySelectorAll('.nav-links a').forEach(link => {
        // Skip external links
        if (link.target === '_blank') return;

        const href = link.getAttribute('href');
        console.log('Checking link:', href);
        
        // Check if this link matches current page
        if (href === currentFile) {
            link.classList.add('active');
            if (currentPage) {
                currentPage.textContent = link.textContent;
            }
        }

        // Handle click events
        link.addEventListener('click', () => {
            if (link.target === '_blank') return;
            
            // Update active states
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Update current page text
            if (currentPage) {
                currentPage.textContent = link.textContent;
            }
            
            // Close mobile menu
            if (mobileMenuBtn && navLinks) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load header
        await loadComponent('header', 'components/header.html');
        // Initialize header after loading
        initializeHeader();

        // Load footer
        await loadComponent('footer', 'components/footer.html');
    } catch (error) {
        console.error('Error loading components:', error);
    }
}); 