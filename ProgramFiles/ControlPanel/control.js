/* Control Panel Application */

const ControlPanel = {
    settings: Kernel.settings,

    initialize(appName) {
        const contentEl = document.getElementById(`content-${appName}`);
        contentEl.innerHTML = `
            <div class="control-tabs">
                <div class="control-tab active" data-tab="display">🖼️ Display</div>
                <div class="control-tab" data-tab="theme">🎨 Appearance</div>
                <div class="control-tab" data-tab="system">⚙️ System</div>
                <div class="control-tab" data-tab="about">ℹ️ About</div>
            </div>

            <!-- Display Tab -->
            <div class="control-content active" id="tab-display">
                <div class="control-section">
                    <div class="control-section-title">Wallpaper</div>
                    <div class="control-item">
                        <div class="control-item-label">Select Wallpaper:</div>
                        <select class="control-select" id="wallpaper-select">
                            <option value="linear-gradient(135deg, #0a47a0 0%, #2e7ad1 100%)">Windows 7 Default</option>
                            <option value="linear-gradient(to right, #667eea 0%, #764ba2 100%)">Purple Gradient</option>
                            <option value="linear-gradient(to right, #f093fb 0%, #f5576c 100%)">Pink Sunset</option>
                            <option value="linear-gradient(to right, #4facfe 0%, #00f2fe 100%)">Cyan Ocean</option>
                            <option value="linear-gradient(to right, #43e97b 0%, #38f9d7 100%)">Green Mint</option>
                            <option value="#1a1a2e">Dark Solid</option>
                            <option value="linear-gradient(to bottom, #0f0f1e, #1a1a3f)">Dark Blue</option>
                        </select>
                        <div class="control-preview" id="wallpaper-preview"></div>
                    </div>
                </div>
            </div>

            <!-- Appearance Tab -->
            <div class="control-content" id="tab-theme">
                <div class="control-section">
                    <div class="control-section-title">Glass Effects</div>
                    <div class="control-item">
                        <div class="control-item-label">Glass Opacity (Aero Effects)</div>
                        <div class="control-item-description">Adjust the transparency of Aero glass effects</div>
                        <input type="range" class="control-slider" id="glass-opacity" min="0.5" max="1" step="0.05" value="0.95">
                        <div class="control-info" id="opacity-info">Current: 95%</div>
                    </div>
                </div>

                <div class="control-section">
                    <div class="control-section-title">Theme</div>
                    <div class="control-item">
                        <label class="control-toggle">
                            <input type="checkbox" class="control-checkbox" id="dark-mode-toggle">
                            <span>Enable Dark Mode</span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- System Tab -->
            <div class="control-content" id="tab-system">
                <div class="control-section">
                    <div class="control-section-title">Storage</div>
                    <div class="control-item">
                        <div class="control-item-label">Browser Storage Usage</div>
                        <div class="control-item-description" id="storage-info">Calculating...</div>
                        <button class="control-button" id="btn-clear-storage">🗑️ Clear Storage</button>
                    </div>
                </div>

                <div class="control-section">
                    <div class="control-section-title">Settings</div>
                    <div class="control-item">
                        <button class="control-button" id="btn-reset">🔄 Reset to Defaults</button>
                        <button class="control-button" id="btn-export">💾 Export Settings</button>
                    </div>
                </div>
            </div>

            <!-- About Tab -->
            <div class="control-content" id="tab-about">
                <div class="control-section">
                    <div class="control-section-title">About Windows 7 Web OS</div>
                    <div class="control-item">
                        <div class="control-item-description" style="line-height: 1.8;">
                            <strong>Windows 7 Web OS Clone</strong><br>
                            Version 1.0.0<br>
                            <br>
                            A fully functional web-based Windows 7 simulation built with:<br>
                            • Pure HTML5<br>
                            • CSS3 (Aero Glass Effects)<br>
                            • Vanilla JavaScript (No frameworks)<br>
                            <br>
                            Features:<br>
                            • Multi-window management<br>
                            • Draggable windows<br>
                            • Complete application suite<br>
                            • Persistent storage<br>
                            • Authentic Windows 7 UI<br>
                            <br>
                            Made with ❤️ for nostalgia lovers
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
        this.updateDisplay();
    },

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.control-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });

        // Wallpaper selection
        const wallpaperSelect = document.getElementById('wallpaper-select');
        wallpaperSelect.addEventListener('change', (e) => {
            this.settings.wallpaper = e.target.value;
            Kernel.saveSettings();
            this.updateWallpaperPreview();
        });

        // Glass opacity slider
        const glassSlider = document.getElementById('glass-opacity');
        glassSlider.addEventListener('input', (e) => {
            this.settings.glassOpacity = parseFloat(e.target.value);
            Kernel.saveSettings();
            const percent = Math.round(this.settings.glassOpacity * 100);
            document.getElementById('opacity-info').textContent = `Current: ${percent}%`;
        });

        // Dark mode toggle
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        darkModeToggle.addEventListener('change', (e) => {
            this.settings.darkMode = e.target.checked;
            Kernel.saveSettings();
        });

        // Storage buttons
        document.getElementById('btn-clear-storage').addEventListener('click', () => {
            if (confirm('Clear all saved data? This cannot be undone.')) {
                localStorage.clear();
                alert('✅ All storage cleared');
                location.reload();
            }
        });

        document.getElementById('btn-reset').addEventListener('click', () => {
            if (confirm('Reset all settings to default?')) {
                Kernel.settings = {
                    glassOpacity: 0.95,
                    darkMode: false,
                    wallpaper: 'linear-gradient(135deg, #0a47a0 0%, #2e7ad1 100%)'
                };
                Kernel.saveSettings();
                alert('✅ Settings reset to defaults');
                location.reload();
            }
        });

        document.getElementById('btn-export').addEventListener('click', () => {
            const settings = JSON.stringify(Kernel.settings, null, 2);
            const blob = new Blob([settings], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Windows7-Settings.json';
            a.click();
            alert('✅ Settings exported');
        });
    },

    updateWallpaperPreview() {
        const preview = document.getElementById('wallpaper-preview');
        preview.style.background = this.settings.wallpaper;
    },

    updateDisplay() {
        // Load current settings
        document.getElementById('wallpaper-select').value = this.settings.wallpaper;
        document.getElementById('glass-opacity').value = this.settings.glassOpacity;
        document.getElementById('dark-mode-toggle').checked = this.settings.darkMode;
        document.getElementById('opacity-info').textContent = `Current: ${Math.round(this.settings.glassOpacity * 100)}%`;

        // Calculate storage
        let storageSize = 0;
        let itemCount = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            storageSize += key.length + value.length;
            itemCount++;
        }
        const storageMB = (storageSize / 1024 / 1024).toFixed(2);
        document.getElementById('storage-info').textContent = `Using ${storageMB} MB (${itemCount} items saved)`;

        this.updateWallpaperPreview();
    },

    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.control-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.control-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected tab
        document.getElementById(`tab-${tabName}`).classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    }
};

console.log('⚙️ ProgramFiles/ControlPanel/control.js loaded');
