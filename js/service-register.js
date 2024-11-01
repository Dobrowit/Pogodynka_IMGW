if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('js/service-worker.js')
            .then(registration => {
                console.log('Service Worker zarejestrowany:', registration);
            })
            .catch(error => {
                console.log('Rejestracja Service Workera nie powiodła się:', error);
            });
    });
}
