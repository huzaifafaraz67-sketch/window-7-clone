/* Global Kernel - System State & Boot Logic */

const Kernel = {
    topZIndex: 1000,
    windows: {},
    apps: {},
    settings: {
        glassOpacity: 0.95,
        darkMode: false,
        wallpaper: 'linear-gradient(135deg, #0a47a0 0%, #2e7ad1 100%)'
    },
    booted: false,

    boot() {
        console.log('[KERNEL] Initializing System32...');
        
        // Wait for DOM to be fully ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.completeBootSequence());
        } else {
            this.completeBootSequence();
        }
    },

    completeBootSequence() {
        setTimeout(() => {
            this.initializeEventListeners();
            this.loadSettings();
            this.booted = true;
            console.log('[KERNEL] Boot Complete. Ready to launch applications.');
        }, 500);
    },

    initializeEventListeners() {
        // Wait for desktop icons to exist
        const desktopIcons = document.querySelectorAll('.desktop-icon');
        if (desktopIcons.length > 0) {
            desktopIcons.forEach(icon => {
                icon.addEventListener('dblclick', (e) => {
                    const appName = e.currentTarget.getAttribute('data-app');
                    if (appName) {
                        this.launchApp(appName);
                        e.currentTarget.classList.add('launching');
                        setTimeout(() => e.currentTarget.classList.remove('launching'), 300);
                    }
                });
            });
        }

        // Start menu items
        const startMenuItems = document.querySelectorAll('.start-menu-item');
        if (startMenuItems.length > 0) {
            startMenuItems.forEach(item => {
                item.addEventListener('click', () => {
                    const appName = item.getAttribute('data-app');
                    if (appName) {
                        this.launchApp(appName);
                        Taskbar.toggleStartMenu();
                    }
                });
            });
        }

        // Shutdown button
        const shutdownBtn = document.querySelector('.start-menu-shutdown');
        if (shutdownBtn) {
            shutdownBtn.addEventListener('click', () => {
                if (confirm('Shut down Windows 7 Web OS?')) {
                    console.log('[SYSTEM] Shutting down...');
                    document.body.style.opacity = '0.5';
                    setTimeout(() => location.reload(), 500);
                }
            });
        }
    },

    launchApp(appName) {
        if (!this.booted) {
            console.warn('[KERNEL] System not ready');
            return;
        }

        if (this.windows[appName]) {
            WindowManager.focusWindow(appName);
        } else {
            WindowManager.createWindow(appName);
        }
    },

    registerWindow(appName, windowElement) {
        this.windows[appName] = windowElement;
        console.log(`[KERNEL] Window registered - ${appName}`);
    },

    unregisterWindow(appName) {
        delete this.windows[appName];
        console.log(`[KERNEL] Window unregistered - ${appName}`);
    },

    getNextZIndex() {
        return ++this.topZIndex;
    },

    loadSettings() {
        const saved = localStorage.getItem('Windows7Settings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
            this.applySettings();
        }
    },

    saveSettings() {
        localStorage.setItem('Windows7Settings', JSON.stringify(this.settings));
        this.applySettings();
    },

    applySettings() {
        if (this.settings.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        const desktop = document.getElementById('desktop');
        if (desktop) {
            desktop.style.background = this.settings.wallpaper;
        }
    }
};

console.log('[SYSTEM32] kernel.js loaded');