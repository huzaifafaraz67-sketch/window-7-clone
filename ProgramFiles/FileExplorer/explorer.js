/* File Explorer Application */

const FileExplorer = {
    currentPath: 'C:\\',
    fileSystem: {
        'C:\\': {
            type: 'drive',
            icon: '💾',
            contents: {
                'Users': { type: 'folder', icon: '👤' },
                'Windows': { type: 'folder', icon: '🪟' },
                'Program Files': { type: 'folder', icon: '📂' },
                'Documents': { type: 'folder', icon: '📄' }
            }
        },
        'Desktop': {
            type: 'folder',
            icon: '🖥️',
            contents: {
                'Photo1.jpg': { type: 'file', icon: '🖼️' },
                'Video.mp4': { type: 'file', icon: '🎬' },
                'Music.mp3': { type: 'file', icon: '🎵' }
            }
        },
        'Documents': {
            type: 'folder',
            icon: '📋',
            contents: {
                'Resume.docx': { type: 'file', icon: '📄' },
                'Projects': { type: 'folder', icon: '📂' },
                'Reports': { type: 'folder', icon: '📊' },
                'Notes.txt': { type: 'file', icon: '📝' }
            }
        }
    },

    initialize(appName) {
        const contentEl = document.getElementById(`content-${appName}`);
        contentEl.innerHTML = `
            <div class="explorer-toolbar">
                <button class="explorer-toolbar-btn" id="btn-back">⬅️ Back</button>
                <button class="explorer-toolbar-btn" id="btn-forward">➡️ Forward</button>
                <button class="explorer-toolbar-btn" id="btn-home">🏠 Home</button>
                <button class="explorer-toolbar-btn" id="btn-refresh">🔄 Refresh</button>
                <button class="explorer-toolbar-btn" id="btn-newfolder">📁 New Folder</button>
            </div>
            <div style="display: flex; flex: 1; overflow: hidden;">
                <div class="explorer-sidebar">
                    <div class="explorer-sidebar-section">
                        <div class="explorer-sidebar-header">Favorites</div>
                        <div class="explorer-sidebar-item active" data-path="Desktop">🖥️ Desktop</div>
                        <div class="explorer-sidebar-item" data-path="Documents">📋 Documents</div>
                        <div class="explorer-sidebar-item" data-path="C:\\">💾 Computer</div>
                    </div>
                </div>
                <div class="explorer-main">
                    <div class="explorer-addressbar">
                        <span style="font-weight: bold;">Location:</span>
                        <input type="text" class="explorer-addressbar-input" id="address-bar" value="Desktop" readonly>
                        <button class="explorer-toolbar-btn" id="btn-browse" style="padding: 2px 6px;">📂</button>
                    </div>
                    <div class="explorer-content" id="explorer-files"></div>
                </div>
            </div>
            <div class="explorer-statusbar">
                <span id="explorer-status">Ready</span>
                <span id="explorer-itemcount">0 items</span>
            </div>
        `;

        this.setupEventListeners(appName);
        this.navigate('Desktop');
    },

    setupEventListeners(appName) {
        const btnBack = document.getElementById('btn-back');
        const btnHome = document.getElementById('btn-home');
        const btnRefresh = document.getElementById('btn-refresh');
        const btnNewFolder = document.getElementById('btn-newfolder');

        btnBack.addEventListener('click', () => this.goBack());
        btnHome.addEventListener('click', () => this.navigate('Desktop'));
        btnRefresh.addEventListener('click', () => this.refresh());
        btnNewFolder.addEventListener('click', () => this.createFolder());

        // Sidebar navigation
        document.querySelectorAll('[data-path]').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('[data-path]').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                this.navigate(item.getAttribute('data-path'));
            });
        });
    },

    navigate(path) {
        this.currentPath = path;
        const filesDiv = document.getElementById('explorer-files');
        filesDiv.innerHTML = '';

        const folderData = this.fileSystem[path];
        if (!folderData || !folderData.contents) {
            filesDiv.innerHTML = '<p style="padding: 20px; color: #666;">Empty folder</p>';
            this.updateStatus(`${path} - (empty)`, 0);
            return;
        }

        const contents = folderData.contents;
        let itemCount = 0;

        // Sort folders first, then files
        const sortedEntries = Object.entries(contents).sort((a, b) => {
            if (a[1].type === 'folder' && b[1].type !== 'folder') return -1;
            if (a[1].type !== 'folder' && b[1].type === 'folder') return 1;
            return a[0].localeCompare(b[0]);
        });

        sortedEntries.forEach(([name, item]) => {
            const folderDiv = document.createElement('div');
            folderDiv.className = 'explorer-folder';
            folderDiv.innerHTML = `
                <div class="explorer-folder-icon">${item.icon}</div>
                <div class="explorer-folder-name" title="${name}">${name}</div>
            `;

            folderDiv.addEventListener('click', () => {
                document.querySelectorAll('.explorer-folder').forEach(f => f.classList.remove('selected'));
                folderDiv.classList.add('selected');

                if (item.type === 'folder') {
                    setTimeout(() => this.navigate(name), 200);
                }
            });

            folderDiv.addEventListener('dblclick', () => {
                if (item.type === 'folder') {
                    this.navigate(name);
                }
            });

            filesDiv.appendChild(folderDiv);
            itemCount++;
        });

        document.getElementById('address-bar').value = path;
        this.updateStatus(`${path}`, itemCount);
    },

    goBack() {
        if (this.currentPath !== 'Desktop') {
            this.navigate('Desktop');
        }
    },

    refresh() {
        this.navigate(this.currentPath);
        this.updateStatus(`${this.currentPath} (refreshed)`, 0);
    },

    createFolder() {
        const folderName = prompt('New Folder Name:', 'New Folder');
        if (folderName) {
            alert(`✅ Created folder: ${folderName}`);
            this.refresh();
        }
    },

    updateStatus(path, itemCount) {
        document.getElementById('explorer-status').textContent = path;
        document.getElementById('explorer-itemcount').textContent = `${itemCount} items`;
    }
};

console.log('📁 ProgramFiles/FileExplorer/explorer.js loaded');
