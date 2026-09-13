/* Taskbar Manager - Start Menu, Clock, App Buttons */

const Taskbar = {
    appButtons: {},
    initialized: false,

    initialize() {
        if (this.initialized) return;
        
        this.setupStartButton();
        this.startClock();
        this.initialized = true;
        console.log('[TASKBAR] Initialized');
    },

    setupStartButton() {
        const startBtn = document.getElementById('start-button');
        if (!startBtn) return;

        startBtn.addEventListener('click', () => {
            this.toggleStartMenu();
        });

        document.addEventListener('click', (e) => {
            const startMenu = document.getElementById('start-menu');
            if (startMenu && !e.target.closest('#start-button') && !e.target.closest('#start-menu')) {
                startMenu.classList.add('hidden');
            }
        });
    },

    toggleStartMenu() {
        const startMenu = document.getElementById('start-menu');
        if (startMenu) {
            startMenu.classList.toggle('hidden');
        }
    },

    startClock() {
        const updateClock = () => {
            const clockEl = document.getElementById('system-clock');
            if (clockEl) {
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                clockEl.textContent = `${hours}:${minutes}:${seconds}`;
            }
        };

        updateClock();
        setInterval(updateClock, 1000);
    },

    addAppButton(appName, appConfig) {
        const taskbarApps = document.getElementById('taskbar-apps');
        if (!taskbarApps) return;

        const btn = document.createElement('button');
        btn.className = 'taskbar-app-btn active';
        btn.id = `taskbar-${appName}`;
        btn.innerHTML = `<span class="taskbar-app-icon">${appConfig.icon}</span> ${appConfig.title}`;

        btn.addEventListener('click', () => {
            const windowEl = document.getElementById(`window-${appName}`);
            if (windowEl) {
                if (windowEl.classList.contains('minimized')) {
                    WindowManager.focusWindow(appName);
                } else {
                    windowEl.classList.toggle('minimized');
                    this.updateAppButton(appName, windowEl.classList.contains('minimized'));
                }
            }
        });

        taskbarApps.appendChild(btn);
        this.appButtons[appName] = btn;
    },

    removeAppButton(appName) {
        const btn = document.getElementById(`taskbar-${appName}`);
        if (btn) {
            btn.remove();
            delete this.appButtons[appName];
        }
    },

    updateAppButton(appName, isMinimized) {
        const btn = document.getElementById(`taskbar-${appName}`);
        if (btn) {
            if (isMinimized) {
                btn.classList.remove('active');
            } else {
                btn.classList.add('active');
            }
        }
    }
};

// Auto-initialize taskbar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Taskbar.initialize());
} else {
    Taskbar.initialize();
}

console.log('[SYSTEM32] taskbar.js loaded');