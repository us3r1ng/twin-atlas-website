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

document.addEventListener('DOMContentLoaded', async function () {
    // Form handlers for bizdev and support buttons
    const formButtons = Array.from(document.getElementsByClassName('contact-form-button'));
    const form = document.getElementById('contact-form');

    if (form) {
        const closeButton = form.querySelector('.close-button');
        const exitTrigger = form.querySelector('.contact-popup-exit');
        const formFrame = form.querySelector('iframe');

        formButtons.forEach(button => button.addEventListener('click', () => {
            if (form.classList.contains('popup-active') || form.classList.contains('popup-closing'))
                return;

            formFrame.src = `https://forms.twinatlas.com/form/${button.attributes['data-form-id'].value}`;
            form.classList.add('popup-active');
            document.body.classList.add('contact-form-active');
        }));

        const close = e => {
            e.preventDefault();
            e.stopPropagation();
            form.classList.add('popup-closing');
            form.classList.remove('popup-active');
            document.body.classList.remove('contact-form-active');
            setTimeout(() => {
                formFrame.src = '';
                form.classList.remove('popup-closing');
            }, 400);
        }

        closeButton.addEventListener('click', close);
        exitTrigger.addEventListener('click', close);
    }
});
