// Scriptor PWA Core Logic
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => console.log('Scriptor Service Worker Registrado com Sucesso:', reg.scope))
            .catch((err) => console.warn('Falha no Registro do Service Worker:', err));
    }
});
