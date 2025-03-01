
document.addEventListener('DOMContentLoaded', async function () {
    // Initialize stats variable at the top level
    let stats = {
        experienceCount: { target: 0, current: 0 },
        likeRatio: { target: 0, current: 0, suffix: '%' },
        communitySize: { target: 0, current: 0, format: true }
    };

    // Load game data and studio data
    try {
        // Load studio data first
        const studioResponse = await fetch('data/dynamic/studio_data.json');
        const studioData = await studioResponse.json();
        stats.communitySize.target = studioData.communitySize;

        // Then load the updated game data for everything else
        const response = await fetch('data/dynamic/game_data.json');
        const gameData = await response.json();
        const totalGames = gameData.length;
        
        console.log(gameData);

        // Number formatting function
        function formatNumber(number) {
            if (number >= 1000000000) {
                return (number / 1000000000).toFixed(1) + 'B';
            }
            if (number >= 1000000) {
                return (number / 1000000).toFixed(1) + 'M';
            }
            if (number >= 1000) {
                return (number / 1000).toFixed(1) + 'K';
            }
            return number.toString();
        }

        // Calculate average rating from total up and down votes
        const totalUpVotes = gameData.reduce((sum, game) => sum + game.up_votes, 0);
        const totalDownVotes = gameData.reduce((sum, game) => sum + game.down_votes, 0);
        const averageRating = totalUpVotes + totalDownVotes > 0 
            ? Math.round((totalUpVotes / (totalUpVotes + totalDownVotes)) * 100) 
            : 0;

        console.log('Vote Metrics:', {
            totalUpVotes,
            totalDownVotes,
            totalVotes: totalUpVotes + totalDownVotes,
            averageRating: averageRating + '%'
        });

        // Update stats targets
        stats.experienceCount.target = totalGames;
        stats.likeRatio.target = averageRating;

        // Create an Intersection Observer for stats
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate stats when they come into view
                    const experienceCount = document.getElementById('experienceCount');
                    const likeRatio = document.getElementById('likeRatio');
                    const communitySize = document.getElementById('communitySize');

                    // Animate experience count
                    let currentExp = 0;
                    const animateExp = setInterval(() => {
                        currentExp++;
                        if (currentExp >= totalGames) {
                            clearInterval(animateExp);
                            experienceCount.textContent = `${totalGames}+`;
                        } else {
                            experienceCount.textContent = currentExp;
                        }
                    }, 2000 / totalGames);

                    // Animate like ratio
                    let currentRatio = 0;
                    const animateRatio = setInterval(() => {
                        currentRatio++;
                        if (currentRatio >= averageRating) {
                            clearInterval(animateRatio);
                            likeRatio.textContent = `${averageRating}%`;
                        } else {
                            likeRatio.textContent = `${currentRatio}%`;
                        }
                    }, 2000 / averageRating);

                    // Animate community size
                    let currentCommunity = 0;
                    const targetCommunity = stats.communitySize.target;
                    const communitySizeSteps = 100;
                    const communityIncrement = targetCommunity / communitySizeSteps;
                    const animateCommunity = setInterval(() => {
                        currentCommunity += communityIncrement;
                        if (currentCommunity >= targetCommunity) {
                            clearInterval(animateCommunity);
                            communitySize.textContent = formatNumber(targetCommunity);
                        } else {
                            communitySize.textContent = formatNumber(Math.floor(currentCommunity));
                        }
                    }, 2000 / communitySizeSteps);

                    // Stop observing after animation
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        // Start observing the stats section
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Sort games by visits and filter for pinned games
        const pinnedGames = gameData.filter(game => game.pinned);
        const sortedGames = [...pinnedGames].sort((a, b) => b.visits - a.visits);

        // Populate games
        const gamesSlider = document.querySelector('.games-slider');
        gamesSlider.innerHTML = ''; // Clear any existing content
        
        sortedGames.forEach(game => {
            console.log("got game", game)
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            
            gameCard.innerHTML = `
                <img src="${game.image_url}" alt="${game.title}" draggable="false">
                <h3>${game.title}</h3>
                <div class="game-stats">
                    <span>${formatNumber(game.visits)} visits</span>
                    <span>${formatNumber(game.up_votes)} likes</span>
                </div>
                <button class="cta-button" onclick="window.location.href='https://www.roblox.com/games/${game.place_id}'">Play Now</button>
            `;
            
            gamesSlider.appendChild(gameCard);
        });

        // Add view all button after the slider
        const viewAllContainer = document.createElement('div');
        viewAllContainer.className = 'view-all-container';
        viewAllContainer.innerHTML = `
            <a href="${getAssetPath('games')}" class="view-all-button">View All Games</a>
        `;
        gamesSlider.parentElement.after(viewAllContainer);

        // !!!! DO NOT REPLACE OR MODIFY THE CODE BELOW - SCROLL FUNCTIONALITY WORKS PERFECTLY !!!!
        // Setup slider controls
        const prevButton = document.querySelector('.slider-control.prev');
        const nextButton = document.querySelector('.slider-control.next');
        const cardWidth = 270 + 24; // card width + gap
        let autoScrollInterval = null;
        let autoScrollTimeout = null;
        let isAutoScrolling = false;

        const startAutoScroll = () => {
            // Only start if not already auto-scrolling
            if (isAutoScrolling) return;
            
            // Clear any existing timers
            stopAutoScroll();
            
            autoScrollTimeout = setTimeout(() => {
                isAutoScrolling = true;
                autoScrollInterval = setInterval(() => {
                    const isAtEnd = gamesSlider.scrollLeft + gamesSlider.clientWidth >= gamesSlider.scrollWidth;
                    if (isAtEnd) {
                        gamesSlider.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        gamesSlider.scrollBy({ left: cardWidth, behavior: 'smooth' });
                    }
                }, 3000); // Scroll every 3 seconds once started
            }, 30000); // Wait 30 seconds before starting auto-scroll
        };

        const stopAutoScroll = () => {
            isAutoScrolling = false;
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
            if (autoScrollTimeout) {
                clearTimeout(autoScrollTimeout);
                autoScrollTimeout = null;
            }
        };

        // Start auto-scroll initially
        startAutoScroll();

        // Pause auto-scroll on user interaction
        gamesSlider.addEventListener('mouseenter', stopAutoScroll);
        gamesSlider.addEventListener('mouseleave', startAutoScroll);
        gamesSlider.addEventListener('touchstart', stopAutoScroll);
        gamesSlider.addEventListener('touchend', startAutoScroll);
        gamesSlider.addEventListener('scroll', () => {
            // Stop auto-scroll during manual scrolling
            if (!isAutoScrolling) {
                stopAutoScroll();
                // Restart auto-scroll after a brief delay
                clearTimeout(autoScrollTimeout);
                autoScrollTimeout = setTimeout(startAutoScroll, 30000);
            }
        });

        // Click and drag functionality
        let isDown = false;
        let startX;
        let scrollLeft;
        let isDragging = false;

        gamesSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = false;
            gamesSlider.style.scrollBehavior = 'auto';
            startX = e.pageX - gamesSlider.offsetLeft;
            scrollLeft = gamesSlider.scrollLeft;
            stopAutoScroll();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            isDragging = true;
            const x = e.pageX - gamesSlider.offsetLeft;
            const walk = (x - startX);
            gamesSlider.scrollLeft = scrollLeft - walk;
        });

        document.addEventListener('mouseup', () => {
            if (!isDown) return;
            isDown = false;
            isDragging = false;
            gamesSlider.style.scrollBehavior = 'smooth';
            // Don't immediately start auto-scroll, wait for the delay
            clearTimeout(autoScrollTimeout);
            autoScrollTimeout = setTimeout(startAutoScroll, 30000);
        });

        gamesSlider.addEventListener('mouseleave', () => {
            if (!isDown) {
                startAutoScroll();
            }
        });

        // Handle click events on game cards
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (isDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        });

        prevButton.addEventListener('click', () => {
            stopAutoScroll();
            gamesSlider.scrollBy({
                left: -cardWidth,
                behavior: 'auto'
            });
            // Restart auto-scroll after delay
            clearTimeout(autoScrollTimeout);
            autoScrollTimeout = setTimeout(startAutoScroll, 30000);
        });

        nextButton.addEventListener('click', () => {
            stopAutoScroll();
            gamesSlider.scrollBy({
                left: cardWidth,
                behavior: 'auto'
            });
            // Restart auto-scroll after delay
            clearTimeout(autoScrollTimeout);
            autoScrollTimeout = setTimeout(startAutoScroll, 30000);
        });
        // !!!! DO NOT REPLACE OR MODIFY THE CODE ABOVE - SCROLL FUNCTIONALITY WORKS PERFECTLY !!!!

        // Hide scroll buttons at ends
        const checkScrollPosition = () => {
            const isAtStart = gamesSlider.scrollLeft === 0;
            const isAtEnd = gamesSlider.scrollLeft + gamesSlider.clientWidth >= gamesSlider.scrollWidth;
            
            prevButton.style.opacity = isAtStart ? '0.5' : '1';
            nextButton.style.opacity = isAtEnd ? '0.5' : '1';
        };

        gamesSlider.addEventListener('scroll', checkScrollPosition);
        checkScrollPosition(); // Initial check
    } catch (error) {
        console.error('Error loading game data:', error);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });

    function animateCounter(element, stat) {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepDuration = duration / steps;
        const increment = (stat.target - stat.current) / steps;

        function updateCounter() {
            stat.current += increment;
            if (stat.current >= stat.target) {
                stat.current = stat.target;
            }
            
            let displayValue = stat.format ? formatNumber(Math.floor(stat.current)) : Math.floor(stat.current);
            if (stat.suffix) {
                displayValue += stat.suffix;
            }
            element.textContent = displayValue;

            if (stat.current < stat.target) {
                setTimeout(updateCounter, stepDuration);
            }
        }

        updateCounter();
    }

    // Shopify Products Fetching
    async function fetchTopProducts() {
        const shopifyEndpoint = 'https://6f67a8-82.myshopify.com/api/2024-01/graphql.json';
        const query = `
            query {
                products(first: 20) {
                    edges {
                        node {
                            id
                            title
                            handle
                            availableForSale
                            variants(first: 5) {
                                edges {
                                    node {
                                        id
                                        availableForSale
                                        currentlyNotInStock
                                    }
                                }
                            }
                            priceRange {
                                minVariantPrice {
                                    amount
                                    currencyCode
                                }
                            }
                            featuredImage {
                                url
                                altText
                            }
                        }
                    }
                }
            }
        `;

        try {
            const response = await fetch(shopifyEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': 'b23e28d926aae067f2dfeec79746922e'
                },
                body: JSON.stringify({ query })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            console.log(data);

            // Filter available products
            const availableProducts = data.data.products.edges.filter(({ node }) => {
                // Check if product is marked as available
                if (!node.availableForSale) return false;

                // Check if any variant is actually in stock
                const hasInStockVariant = node.variants.edges.some(({ node: variant }) => 
                    variant.availableForSale && !variant.currentlyNotInStock
                );

                return hasInStockVariant;
            });

            return availableProducts;
        } catch (error) {
           // console.error('Error fetching Shopify products:', error);
            return [];
        }
    }

    // Update merch slider with Shopify products
    async function updateMerchSlider() {
        const products = await fetchTopProducts();
        if (products.length === 0) return;

        const merchItems = document.querySelector('.merch-items');
        if (!merchItems) return;

        // Clear existing placeholder items
        merchItems.innerHTML = '';

        // Get unique products
        const uniqueProducts = [...new Map(products.map(item => [item.node.id, item])).values()];

        // Create three sets of products for infinite scroll
        for (let i = 0; i < 3; i++) {
            uniqueProducts.forEach(({ node }) => {
                const merchItem = document.createElement('div');
                merchItem.className = 'merch-item';
                
                if (node.featuredImage) {
                    merchItem.style.backgroundImage = `url(${node.featuredImage.url})`;
                }

                // Create tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'merch-tooltip';
                tooltip.textContent =  node.title;
                merchItem.appendChild(tooltip);

                // Handle click/tap to open product
                merchItem.addEventListener('click', () => {
                    const url = `https://merch.twinatlas.com/products/${node.handle}`;
                    window.open(url, '_blank');
                });

                merchItems.appendChild(merchItem);
            });
        }
    }

    function formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: price.currencyCode
        }).format(price.amount);
    }

    // Call updateMerchSlider when document is loaded
    updateMerchSlider();

    // Function to generate brand frames
    async function initializeBrandsSlider() {
        try {
            const response = await fetch('data/static/brand_data.json');
            const brandData = await response.json();
            const brandsContainer = document.querySelector('.brands-container');
            
            // Function to create a single set of brand frames
            const createBrandSet = () => {
                const fragment = document.createDocumentFragment();
                brandData.forEach(brand => {
                    const brandFrame = document.createElement('div');
                    brandFrame.className = 'brand-frame';
                    const img = document.createElement('img');
                    img.src = brand.image_url;
                    img.alt = brand.title;
                    img.draggable = false;
                    brandFrame.appendChild(img);
                    fragment.appendChild(brandFrame);
                });
                return fragment;
            };

            // Create three sets for seamless scrolling
            brandsContainer.appendChild(createBrandSet());
            brandsContainer.appendChild(createBrandSet());
            brandsContainer.appendChild(createBrandSet());

            // Start automatic scrolling
            let scrollPosition = 0;
            const scrollSpeed = 1;
            
            function scrollBrands() {
                scrollPosition += scrollSpeed;
                if (scrollPosition >= brandsContainer.scrollWidth / 3) {
                    scrollPosition = 0;
                }
                brandsContainer.scrollLeft = scrollPosition;
                requestAnimationFrame(scrollBrands);
            }
            
            scrollBrands();
        } catch (error) {
            console.error('Error loading brand data:', error);
        }
    }

    // Initialize both sliders
    await initializeBrandsSlider();
});