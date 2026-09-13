/* Window Manager - Window Creation, Focus, Drag, Minimize, Maximize */

const WindowManager = {
    draggingWindow: null,
    dragOffset: { x: 0, y: 0 },

    createWindow(appName) {
        const windowContainer = document.getElementById('window-container');
        const appConfig = this.getAppConfig(appName);

        const windowEl = document.createElement('div');
        windowEl.className = `window ${appConfig.className}`;
        windowEl.id = `window-${appName}`;
        windowEl.style.zIndex = Kernel.getNextZIndex();
        windowEl.style.width = appConfig.width;
        windowEl.style.height = appConfig.height;
        windowEl.style.left = appConfig.left;
        windowEl.style.top = appConfig.top;

        windowEl.innerHTML = `
            <div class="window-titlebar">
                <div class="window-titlebar-text">
                    <span class="window-titlebar-icon">${appConfig.icon}</span>
                    ${appConfig.title}
                </div>
                <div class="window-controls">
                    <button class="window-btn minimize" title="Minimize">−</button>
                    <button class="window-btn maximize" title="Maximize">□</button>
                    <button class="window-btn close" title="Close">✕</button>
                </div>
            </div>
            <div class="window-content" id="content-${appName}"></div>
        `;

        windowContainer.appendChild(windowEl);

        // Event listeners
        this.setupWindowControls(appName, windowEl);
        this.setupTitleBarDrag(appName, windowEl);

        // Initialize app content
        if (window[appConfig.appModule]) {
            window[appConfig.appModule].initialize(appName);
        }

        Kernel.registerWindow(appName, windowEl);
        this.focusWindow(appName);

        // Add to taskbar
        Taskbar.addAppButton(appName, appConfig);
    },

    getAppConfig(appName) {
        const configs = {
            Notepad: {
                title: 'Notepad',
                icon: '📝',
                className: 'notepad-window',
                appModule: 'Notepad',
                width: '500px',
                height: '400px',
                left: '50px',
                top: '50px'
            },
            FileExplorer: {
                title: 'File Explorer',
                icon: '📁',
                className: 'explorer-window',
                appModule: 'FileExplorer',
                width: '600px',
                height: '450px',
                left: '100px',
                top: '100px'
            },
            DeviceManager: {
                title: 'Device Manager',
                icon: '🖥️',
                className: 'devmgr-window',
                appModule: 'DeviceManager',
                width: '550px',
                height: '420px',
                left: '150px',
                top: '150px'
            },
            ControlPanel: {
                title: 'Control Panel',
                icon: '⚙️',
                className: 'control-window',
                appModule: 'ControlPanel',
                width: '520px',
                height: '480px',
                left: '200px',
                top: '200px'
            }
        };
        return configs[appName];
    },

    setupWindowControls(appName, windowEl) {
        const minimizeBtn = windowEl.querySelector('.window-btn.minimize');
        const maximizeBtn = windowEl.querySelector('.window-btn.maximize');
        const closeBtn = windowEl.querySelector('.window-btn.close');

        let isMaximized = false;
        const originalState = {
            width: windowEl.style.width,
            height: windowEl.style.height,
            left: windowEl.style.left,
            top: windowEl.style.top
        };

        minimizeBtn.addEventListener('click', () => {
            windowEl.classList.toggle('minimized');
            Taskbar.updateAppButton(appName, windowEl.classList.contains('minimized'));
        });

        maximizeBtn.addEventListener('click', () => {
            if (isMaximized) {
                // Restore
                windowEl.style.width = originalState.width;
                windowEl.style.height = originalState.height;
                windowEl.style.left = originalState.left;
                windowEl.style.top = originalState.top;
                windowEl.style.borderRadius = '4px';
            } else {
                // Maximize
                windowEl.style.width = 'calc(100% - 10px)';
                windowEl.style.height = 'calc(100vh - 50px)';
                windowEl.style.left = '5px';
                windowEl.style.top = '5px';
                windowEl.style.borderRadius = '0px';
            }
            isMaximized = !isMaximized;
        });

        closeBtn.addEventListener('click', () => {
            windowEl.remove();
            Kernel.unregisterWindow(appName);
            Taskbar.removeAppButton(appName);
        });
    },

    setupTitleBarDrag(appName, windowEl) {
        const titleBar = windowEl.querySelector('.window-titlebar');

        titleBar.addEventListener('mousedown', (e) => {
            if (e.target.closest('.window-controls')) return;

            this.draggingWindow = windowEl;
            const rect = windowEl.getBoundingClientRect();
            this.dragOffset.x = e.clientX - rect.left;
            this.dragOffset.y = e.clientY - rect.top;

            this.focusWindow(appName);
            windowEl.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (this.draggingWindow) {
                let newX = e.clientX - this.dragOffset.x;
                let newY = e.clientY - this.dragOffset.y;

                // Boundary constraints
                newX = Math.max(0, Math.min(newX, window.innerWidth - 100));
                newY = Math.max(0, Math.min(newY, window.innerHeight - 40));

                this.draggingWindow.style.left = newX + 'px';
                this.draggingWindow.style.top = newY + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            if (this.draggingWindow) {
                this.draggingWindow.style.cursor = 'default';
                this.draggingWindow = null;
            }
        });
    },

    focusWindow(appName) {
        // Remove active class from all windows
        document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));

        // Add active class and update z-index
        const windowEl = document.getElementById(`window-${appName}`);
        if (windowEl) {
            windowEl.classList.add('active');
            windowEl.style.zIndex = Kernel.getNextZIndex();
            windowEl.classList.remove('minimized');
            Taskbar.updateAppButton(appName, false);
        }
    }
};

document.addEventListener('click', (e) => {
    if (e.target.closest('.window')) {
        const windowEl = e.target.closest('.window');
        const appName = windowEl.id.replace('window-', '');
        WindowManager.focusWindow(appName);
    }
});

console.log('🔧 System32/js/windowManager.js loaded');