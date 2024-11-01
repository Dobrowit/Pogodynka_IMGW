let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    // Zapobiegamy wyświetleniu domyślnego monitu
    event.preventDefault();
    // Zapisujemy event, aby móc go wywołać później
    deferredPrompt = event;

    // Wyświetl przycisk instalacji
    showInstallButton();
});

function showInstallButton() {
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block';

    installButton.addEventListener('click', async () => {
        installButton.style.display = 'none';
        
        if (deferredPrompt) {
            deferredPrompt.prompt();  // Wyświetla monit o instalację

            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('Użytkownik zaakceptował instalację.');
            } else {
                console.log('Użytkownik odrzucił instalację.');
            }

            deferredPrompt = null;  // Wyczyść deferredPrompt
        }
    });
}

window.addEventListener('appinstalled', () => {
    console.log('Aplikacja została zainstalowana');
    document.getElementById('installButton').style.display = 'none';
});

// <button id="installButton" style="display: none;">Zainstaluj aplikację</button>
