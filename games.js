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
        const response = await fetch('game_data.json');
        const gameData = await response.json();

        // Populate games grid
        const gamesGrid = document.querySelector('.games-grid');
        if (gamesGrid) {
            gamesGrid.innerHTML = ''; // Clear any existing content
            
            gameData.forEach(game => {
                const gameCard = document.createElement('div');
                gameCard.className = 'game-card';
                
                // Create the game card HTML
                gameCard.innerHTML = `
                    <img src="${game.image_url}" alt="${game.title}" draggable="false">
                    <h3>${game.title}</h3>
                    <button class="cta-button" onclick="window.location.href='${game.link}'">Play Now</button>
                `;
                
                // Add animation delay based on position
                gameCard.style.animation = `fadeIn 0.5s ease ${gamesGrid.children.length * 0.1}s forwards`;
                gameCard.style.opacity = '0';
                
                gamesGrid.appendChild(gameCard);
            });
        }
    } catch (error) {
        console.error('Error loading game data:', error);
        const gamesGrid = document.querySelector('.games-grid');
        if (gamesGrid) {
            gamesGrid.innerHTML = '<p style="color: white; text-align: center; grid-column: 1/-1;">Error loading games. Please try again later.</p>';
        }
    }
} 