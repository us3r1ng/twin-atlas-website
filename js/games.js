// Wait for components to load before initializing
document.addEventListener('DOMContentLoaded', () => {
    // Wait for components to be loaded
    const checkComponentsLoaded = setInterval(() => {
        const header = document.querySelector('.main-nav');
        const footer = document.querySelector('.footer-content');
        
        if (header && footer) {
            clearInterval(checkComponentsLoaded);
            initializeApp();
        }
    }, 100);
});

async function initializeApp() {
    try {
        // Load game data
        const response = await fetch('data/updated_game_data.json');
        const gameData = await response.json();

        // Group games by category and sort each category by visits
        const gamesByCategory = {
            original: gameData.filter(game => game.category === 'original').sort((a, b) => b.visits - a.visits),
            brand: gameData.filter(game => game.category === 'brand').sort((a, b) => b.visits - a.visits),
            event: gameData.filter(game => game.category === 'event').sort((a, b) => b.visits - a.visits)
        };

        // Function to populate a specific category grid
        const populateCategoryGrid = (games, gridId) => {
            const grid = document.getElementById(gridId);
            if (!grid) return;

            grid.innerHTML = ''; // Clear any existing content
            
            games.forEach(game => {
                const gameCard = document.createElement('div');
                gameCard.className = 'game-card';
                
                // Create the game card HTML
                gameCard.innerHTML = `
                    <img src="${game.image_url}" alt="${game.title}" draggable="false">
                    <h3>${game.title}</h3>
                    <a href="https://www.roblox.com/games/${game.place_id}" class="cta-button">Play Now</a>
                `;
                
                // Add animation delay based on position
                gameCard.style.animation = `fadeIn 0.5s ease ${grid.children.length * 0.1}s forwards`;
                gameCard.style.opacity = '0';
                
                grid.appendChild(gameCard);
            });

            // Hide empty category sections
            const section = grid.closest('section');
            if (section) {
                const heading = section.querySelector('h2');
                if (heading) {
                    heading.style.display = games.length ? 'block' : 'none';
                }
                grid.style.display = games.length ? 'grid' : 'none';
            }
        };

        // Populate each category grid
        populateCategoryGrid(gamesByCategory.original, 'original-games');
        populateCategoryGrid(gamesByCategory.brand, 'brand-games');
        populateCategoryGrid(gamesByCategory.event, 'event-games');

    } catch (error) {
        console.error('Error loading game data:', error);
        ['original-games', 'brand-games', 'event-games'].forEach(gridId => {
            const grid = document.getElementById(gridId);
            if (grid) {
                grid.innerHTML = '<p style="color: white; text-align: center; grid-column: 1/-1;">Error loading games. Please try again later.</p>';
            }
        });
    }
} 