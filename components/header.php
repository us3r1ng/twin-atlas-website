<header id="header">
    <nav class="main-nav">
        <a href="/" class="logo">
            <img src="icon/ta_circle.png" alt="Twin Atlas Logo" class="logo-img">
            <img src="icon/textual_logo.png" alt="Twin Atlas" class="logo-text">
        </a>
        <span class="current-page">Home</span>
        <button class="mobile-menu-btn">
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </button>
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="https://merch.twinatlas.com" target="_blank">Merch</a>
            <a href="/games">Games</a>
            <a href="/careers">Careers</a>
        </div>
    </nav>
    <script>
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
            const { pathname: path, href } = window.location;

            // Update navigation state
            document.querySelectorAll('.nav-links a').forEach(link => {
                // Skip external links
                if (link.target === '_blank') return;

                const linkHref = link.getAttribute('href');

                // Update href to include base path
                if (!link.target) {
                    link.href = getAssetPath(linkHref);
                }

                // Check if this link matches current page
                if (new URL(linkHref, href).href === href) {
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

            // Update logo image paths
            document.querySelectorAll('.logo img').forEach(img => {
                img.src = getAssetPath(img.getAttribute('src'));
            });
        }

        // Run initialization immediately
        initializeHeader();
    </script>
</header> 