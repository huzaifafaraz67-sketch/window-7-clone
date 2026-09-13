/* Notepad Application */

const Notepad = {
    currentFile: 'Untitled',
    isModified: false,
    savedContent: '',

    initialize(appName) {
        const contentEl = document.getElementById(`content-${appName}`);
        contentEl.innerHTML = `
            <div class="notepad-menubar">
                <div class="notepad-menubar-item" data-action="file">File</div>
                <div class="notepad-menubar-item" data-action="edit">Edit</div>
                <div class="notepad-menubar-item" data-action="format">Format</div>
                <div class="notepad-menubar-item" data-action="help">Help</div>
            </div>
            <div class="notepad-toolbar">
                <button class="notepad-toolbar-btn" id="btn-new">📄 New</button>
                <button class="notepad-toolbar-btn" id="btn-open">📂 Open</button>
                <button class="notepad-toolbar-btn" id="btn-save">💾 Save</button>
                <button class="notepad-toolbar-btn" id="btn-cut">✂️ Cut</button>
                <button class="notepad-toolbar-btn" id="btn-copy">📋 Copy</button>
                <button class="notepad-toolbar-btn" id="btn-paste">📌 Paste</button>
            </div>
            <div class="notepad-editor">
                <textarea class="notepad-textarea" id="notepad-text" placeholder="Start typing..."></textarea>
            </div>
            <div class="notepad-statusbar">
                <span id="notepad-filename">Untitled</span>
                <div class="notepad-stats">
                    <span>Lines: <span id="notepad-lines">0</span></span>
                    <span>Words: <span id="notepad-words">0</span></span>
                    <span>Characters: <span id="notepad-chars">0</span></span>
                </div>
            </div>
        `;

        this.setupEventListeners(appName);
        this.loadFromStorage();
        this.updateStats();
    },

    setupEventListeners(appName) {
        const textarea = document.getElementById('notepad-text');
        const btnNew = document.getElementById('btn-new');
        const btnOpen = document.getElementById('btn-open');
        const btnSave = document.getElementById('btn-save');
        const btnCut = document.getElementById('btn-cut');
        const btnCopy = document.getElementById('btn-copy');
        const btnPaste = document.getElementById('btn-paste');

        // Text changes
        textarea.addEventListener('input', () => {
            this.isModified = true;
            this.updateStats();
            this.updateTitle();
        });

        // Toolbar buttons
        btnNew.addEventListener('click', () => this.newDocument());
        btnOpen.addEventListener('click', () => this.openDocument());
        btnSave.addEventListener('click', () => this.saveDocument());
        btnCut.addEventListener('click', () => this.cut());
        btnCopy.addEventListener('click', () => this.copy());
        btnPaste.addEventListener('click', () => this.paste());

        // Menu items
        document.querySelectorAll('[data-action]').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleMenu(action);
            });
        });
    },

    updateStats() {
        const textarea = document.getElementById('notepad-text');
        const text = textarea.value;
        const lines = text.split('\n').length;
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        const chars = text.length;

        document.getElementById('notepad-lines').textContent = lines;
        document.getElementById('notepad-words').textContent = words;
        document.getElementById('notepad-chars').textContent = chars;
    },

    updateTitle() {
        const filename = this.currentFile + (this.isModified ? ' *' : '');
        document.getElementById('notepad-filename').textContent = filename;
    },

    newDocument() {
        if (this.isModified) {
            if (!confirm('Discard changes?')) return;
        }
        document.getElementById('notepad-text').value = '';
        this.currentFile = 'Untitled';
        this.isModified = false;
        this.updateTitle();
        this.updateStats();
    },

    openDocument() {
        const files = this.getStoredFiles();
        if (files.length === 0) {
            alert('No saved files. Save something first!');
            return;
        }
        const filename = prompt('Open file:\n' + files.join('\n'));
        if (filename && files.includes(filename)) {
            this.currentFile = filename;
            const content = localStorage.getItem(`notepad_${filename}`);
            document.getElementById('notepad-text').value = content;
            this.isModified = false;
            this.updateTitle();
            this.updateStats();
        }
    },

    saveDocument() {
        let filename = this.currentFile;
        if (filename === 'Untitled') {
            filename = prompt('Save as:', 'document.txt');
            if (!filename) return;
        }
        const content = document.getElementById('notepad-text').value;
        localStorage.setItem(`notepad_${filename}`, content);
        this.currentFile = filename;
        this.savedContent = content;
        this.isModified = false;
        this.updateTitle();
        alert(`✅ Saved as: ${filename}`);
    },

    getStoredFiles() {
        const files = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('notepad_')) {
                files.push(key.replace('notepad_', ''));
            }
        }
        return files;
    },

    loadFromStorage() {
        const saved = localStorage.getItem('notepad_lastfile');
        if (saved) {
            this.currentFile = saved;
            const content = localStorage.getItem(`notepad_${saved}`);
            if (content) {
                document.getElementById('notepad-text').value = content;
                this.isModified = false;
            }
        }
        this.updateTitle();
    },

    cut() {
        const textarea = document.getElementById('notepad-text');
        if (textarea.selectionStart !== undefined) {
            const selected = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
            navigator.clipboard.writeText(selected);
            textarea.value = textarea.value.substring(0, textarea.selectionStart) + textarea.value.substring(textarea.selectionEnd);
            this.isModified = true;
            this.updateStats();
        }
    },

    copy() {
        const textarea = document.getElementById('notepad-text');
        if (textarea.selectionStart !== undefined) {
            const selected = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
            navigator.clipboard.writeText(selected);
        }
    },

    paste() {
        const textarea = document.getElementById('notepad-text');
        navigator.clipboard.readText().then(text => {
            if (textarea.selectionStart !== undefined) {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end);
            } else {
                textarea.value += text;
            }
            this.isModified = true;
            this.updateStats();
        });
    },

    handleMenu(action) {
        switch (action) {
            case 'file':
                alert('File Menu:\n- New\n- Open\n- Save\n- Exit');
                break;
            case 'edit':
                alert('Edit Menu:\n- Cut\n- Copy\n- Paste\n- Select All');
                break;
            case 'format':
                alert('Format Menu:\n- Font\n- Word Wrap');
                break;
            case 'help':
                alert('Windows 7 Notepad Clone\nVersion 1.0\nMade with ❤️');
                break;
        }
    }
};

console.log('📝 ProgramFiles/Notepad/notepad.js loaded');
