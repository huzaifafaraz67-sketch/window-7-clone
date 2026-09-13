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

    boot() {
        console.log('🖥️ Kernel: Initializing System32...');
        this.initializeEventListeners();
        this.loadSettings();
        console.log('✅ Kernel: Boot Complete. Ready to launch applications.');
    },

    initializeEventListeners() {
        // Desktop icon double-click to launch apps
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.addEventListener('dblclick', (e) => {
                const appName = e.currentTarget.getAttribute('data-app');
                this.launchApp(appName);
                e.currentTarget.classList.add('launching');
                setTimeout(() => e.currentTarget.classList.remove('launching'), 300);
            });
        });

        // Start menu items
        document.querySelectorAll('.start-menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const appName = item.getAttribute('data-app');
                this.launchApp(appName);
                Taskbar.toggleStartMenu();
            });
        });

        // Shutdown button
        document.querySelector('.start-menu-shutdown').addEventListener('click', () => {
            if (confirm('🛑 Shut down Windows 7 Web OS?')) {
                console.log('System shutting down...');
                document.body.style.opacity = '0.5';
                setTimeout(() => location.reload(), 500);
            }
        });
    },

    launchApp(appName) {
        if (this.windows[appName]) {
            // App already open - focus it
            WindowManager.focusWindow(appName);
        } else {
            // Launch new app
            WindowManager.createWindow(appName);
        }
    },

    registerWindow(appName, windowElement) {
        this.windows[appName] = windowElement;
        console.log(`✅ Kernel: Window registered - ${appName}`);
    },

    unregisterWindow(appName) {
        delete this.windows[appName];
        console.log(`🗑️ Kernel: Window unregistered - ${appName}`);
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
        // Apply dark mode
        if (this.settings.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        // Apply wallpaper
        document.getElementById('desktop').style.background = this.settings.wallpaper;

        // Apply glass opacity to all windows
        const glassElements = document.querySelectorAll('.glass-effect, .glass-dark');
        glassElements.forEach(el => {
            if (el.classList.contains('glass-dark')) {
                el.style.opacity = this.settings.glassOpacity;
            }
        });
    }
};

console.log('🔧 System32/js/kernel.js loaded');