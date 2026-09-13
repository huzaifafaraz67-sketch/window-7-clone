/* Device Manager Application */

const DeviceManager = {
    devices: {
        processors: [
            { name: 'Intel Core i7-9700K', status: '✅ Healthy' },
            { name: 'CPU Cores: 8', status: 'Base: 3.6 GHz' },
            { name: 'L3 Cache: 12MB', status: 'Boost: 4.9 GHz' }
        ],
        displays: [
            { name: 'NVIDIA GeForce RTX 2080', status: '✅ Working' },
            { name: 'Resolution: 1920x1080', status: 'Refresh: 60Hz' },
            { name: 'Memory: 8GB GDDR6', status: 'Driver: 456.71' }
        ],
        storage: [
            { name: 'Samsung 970 EVO SSD', status: '✅ Healthy' },
            { name: 'Capacity: 1TB', status: 'Used: 650GB' },
            { name: 'Speed: NVMe', status: 'S.M.A.R.T: Good' }
        ],
        memory: [
            { name: 'Kingston HyperX RAM', status: '✅ Healthy' },
            { name: 'Capacity: 32GB', status: 'Type: DDR4' },
            { name: 'Speed: 3200MHz', status: 'Timing: 16-18-18-36' }
        ],
        network: [
            { name: 'Realtek Ethernet', status: '✅ Connected' },
            { name: 'IPv4: 192.168.1.100', status: 'Speed: 1000 Mbps' },
            { name: 'Intel Wireless', status: '✅ Connected' }
        ],
        audio: [
            { name: 'Realtek High Definition', status: '✅ Working' },
            { name: 'Output: Speakers', status: 'Volume: 100%' },
            { name: 'Input: Microphone', status: 'Level: -20dB' }
        ]
    },

    initialize(appName) {
        const contentEl = document.getElementById(`content-${appName}`);
        contentEl.innerHTML = `
            <div class="devmgr-toolbar">
                <button class="devmgr-toolbar-btn" id="btn-refresh">🔄 Refresh</button>
                <button class="devmgr-toolbar-btn" id="btn-properties">⚙️ Properties</button>
                <button class="devmgr-toolbar-btn" id="btn-driver">🔧 Update Driver</button>
            </div>
            <div class="devmgr-tree" id="device-tree"></div>
            <div class="devmgr-status">
                <strong>System Status:</strong> ✅ All devices healthy and functioning normally
            </div>
        `;

        this.renderDeviceTree();
        this.setupEventListeners();
    },

    renderDeviceTree() {
        const treeDiv = document.getElementById('device-tree');
        treeDiv.innerHTML = '';

        // Processors
        let html = `
            <details open>
                <summary>💻 Processors</summary>
                ${this.devices.processors.map(proc => `
                    <div class="devmgr-item">
                        <span class="devmgr-item-icon">⚙️</span>
                        <strong>${proc.name}</strong> - ${proc.status}
                    </div>
                `).join('')}
            </details>
        `;

        // Display Adapters
        html += `
            <details open>
                <summary>🖼️ Display Adapters</summary>
                ${this.devices.displays.map(display => `
                    <div class="devmgr-item">
                        <span class="devmgr-item-icon">🎨</span>
                        <strong>${display.name}</strong> - ${display.status}
                    </div>
                `).join('')}
            </details>
        `;

        // Storage
        html += `
            <details open>
                <summary>💾 Storage Devices</summary>
                ${this.devices.storage.map(storage => `
                    <div class="devmgr-item">
                        <span class="devmgr-item-icon">💿</span>
                        <strong>${storage.name}</strong> - ${storage.status}
                    </div>
                `).join('')}
            </details>
        `;

        // Memory
        html += `
            <details open>
                <summary>🧠 Memory</summary>
                ${this.devices.memory.map(mem => `
                    <div class="devmgr-item">
                        <span class="devmgr-item-icon">📦</span>
                        <strong>${mem.name}</strong> - ${mem.status}
                    </div>
                `).join('')}
            </details>
        `;

        // Network
        html += `
            <details>
                <summary>🌐 Network Adapters</summary>
                ${this.devices.network.map(net => `
                    <div class="devmgr-item">
                        <span class="devmgr-item-icon">📡</span>
                        <strong>${net.name}</strong> - ${net.status}
                    </div>
                `).join('')}
            </details>
        `;

        // Audio
        html += `
            <details>
                <summary>🔊 Audio Devices</summary>
                ${this.devices.audio.map(audio => `
                    <div class="devmgr-item">
                        <span class="devmgr-item-icon">🎧</span>
                        <strong>${audio.name}</strong> - ${audio.status}
                    </div>
                `).join('')}
            </details>
        `;

        treeDiv.innerHTML = html;
    },

    setupEventListeners() {
        document.getElementById('btn-refresh').addEventListener('click', () => {
            this.renderDeviceTree();
            alert('🔄 Device list refreshed');
        });

        document.getElementById('btn-properties').addEventListener('click', () => {
            alert('Device Properties:\n\nSystem: Windows 7 Web OS Clone\nProcessor: Intel i7-9700K\nMemory: 32GB DDR4\nGPU: NVIDIA RTX 2080\nStorage: 1TB SSD');
        });

        document.getElementById('btn-driver').addEventListener('click', () => {
            alert('All drivers are up to date! ✅');
        });
    }
};

console.log('🖥️ ProgramFiles/DeviceManager/devmgr.js loaded');
