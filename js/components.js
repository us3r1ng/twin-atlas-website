// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(getAssetPath(componentPath));
        const html = await response.text();
        const container = document.getElementById(elementId);
        container.innerHTML = html;
        
        // Execute any scripts in the loaded content
        const scripts = container.getElementsByTagName('script');
        for (let script of scripts) {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            script.parentNode.replaceChild(newScript, script);
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load header and footer
        await loadComponent('header', 'components/header');
        await loadComponent('footer', 'components/footer');
    } catch (error) {
        console.error('Error loading components:', error);
    }
}); 