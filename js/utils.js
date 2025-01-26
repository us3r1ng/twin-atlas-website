// Utility function to get the base path for assets
function getBasePath() {
    return window.location.hostname === 'us3r1ng.github.io' ? '/twin-atlas-website/' : '/';
}

// Utility function to get the full path for an asset
function getAssetPath(path) {
    const basePath = getBasePath();
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return basePath + cleanPath;
} 