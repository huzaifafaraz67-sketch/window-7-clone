# 🖥️ Windows 7 Web OS Clone

A fully functional, browser-based Windows 7 Web OS simulation built with **pure HTML5, CSS3, and Vanilla JavaScript** (no frameworks!).

## ✨ Features

- **Authentic Windows 7 UI** with Aero Glass effects and real window management
- **Draggable Windows** - Move, minimize, maximize, and close windows
- **Multi-App Support** - Run multiple applications simultaneously
- **Start Menu** - Fully functional Start menu to launch applications
- **Live System Clock** - Real-time clock on the taskbar
- **Desktop Icons** - Double-click to launch apps
- **Taskbar Management** - See all open apps, minimize/restore functionality

## 📂 Project Structure

```
root/
├── index.html                     (Main entry point)
├── README.md                      (This file)
│
├── System32/                      (Core OS Engine)
│   ├── css/
│   │   ├── aero.css              (Glass effects & styling)
│   │   ├── desktop.css           (Desktop grid & icons)
│   │   ├── taskbar.css           (Taskbar & Start menu)
│   │   └── window.css            (Window frames & controls)
│   └── js/
│       ├── kernel.js             (System boot & state)
│       ├── windowManager.js       (Window engine)
│       └── taskbar.js            (Taskbar controls)
│
└── ProgramFiles/                 (Applications)
    ├── Notepad/
    │   ├── notepad.css
    │   └── notepad.js
    ├── FileExplorer/
    │   ├── explorer.css
    │   └── explorer.js
    ├── DeviceManager/
    │   ├── devmgr.css
    │   └── devmgr.js
    └── ControlPanel/
        ├── control.css
        └── control.js
```

## 🚀 Quick Start

### Open in Browser
Simply click the link below to launch Windows 7 Web OS:

### 📌 **[👉 CLICK HERE TO LAUNCH WINDOWS 7 WEB OS 👈](https://huzaifafaraz67-sketch.github.io/window-7-clone/)**

Or manually open `index.html` in your modern web browser (Chrome, Firefox, Safari, Edge).

### Alternative - Embed as iFrame
To embed this OS in another webpage, use:
```html
<iframe 
  src="https://huzaifafaraz67-sketch.github.io/window-7-clone/index.html" 
  style="width: 100%; height: 100vh; border: none;">
</iframe>
```

## 🎮 How to Use

1. **Double-click** Desktop icons or **Start Menu** items to launch apps
2. **Drag** windows by the title bar to move them around
3. **Click minimize/maximize/close** buttons in the window controls
4. **Click taskbar buttons** to switch between open windows
5. **Click Start button** to toggle the Start Menu

## 📱 Applications Included

### 📝 **Notepad**
- Full text editor with syntax styling
- Auto-save to browser localStorage
- Load/save functionality
- Word count display

### 📁 **File Explorer**
- Virtual file system navigation
- Desktop, Documents, C:\ Drive folders
- File tree browser with icons
- Dummy file structure for browsing

### 🖥️ **Device Manager**
- Hardware information display
- Collapsible categories (Processors, Display, Storage)
- HTML `<details>` tree view
- System specs simulation

### ⚙️ **Control Panel**
- Change desktop wallpaper
- Toggle dark mode theme
- Adjust glass transparency slider
- Live settings preview
- Settings persist in localStorage

## 🛠️ Technical Details

### Window Manager Engine
- **Z-Index Management** - Automatic layering of windows
- **Drag & Drop** - Smooth window movement with boundary constraints
- **Window Controls** - Minimize, Maximize, Close functionality
- **Multi-Instance** - Multiple windows of same app supported

### System Kernel
- **Global State Management** - Centralized application state
- **Settings Persistence** - localStorage integration
- **Event System** - Coordinated app lifecycle

### Aero Glass Effects
- **Backdrop Blur** - CSS backdrop-filter for glass effect
- **Gradient Styling** - Windows 7 authentic gradients
- **Smooth Animations** - Transition effects on interactions
- **Custom Scrollbars** - Styled Aero scrollbars

## 🎨 Customization

### Change Wallpaper
Open **Control Panel** → Select a wallpaper preset or paste a custom URL

### Adjust Glass Opacity
Use the **opacity slider** in Control Panel to customize the Aero glass effect

### Dark Mode
Toggle **dark mode** in Control Panel for a darker theme

### Modify Apps
Edit files in `ProgramFiles/` folder to customize individual applications

## 📊 Browser Compatibility

- ✅ Chrome/Chromium (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ⚠️ Requires CSS backdrop-filter support for Aero effects

## 🚀 Performance

- **Lightweight** - No external dependencies
- **Fast Loading** - Minimal CSS/JS files
- **Smooth Animations** - GPU-accelerated transforms
- **Efficient State** - Only active windows rendered

## 📝 Code Highlights

### Window Creation
```javascript
WindowManager.createWindow('Notepad');
```

### Z-Index Management
```javascript
const zIndex = Kernel.getNextZIndex();
```

### Settings Persistence
```javascript
Kernel.saveSettings();
Kernel.loadSettings();
```

## 🎯 Future Enhancements

- [ ] More applications (Calculator, Paint, Media Player)
- [ ] File drag-and-drop between windows
- [ ] Window snapping/tiling
- [ ] System sounds and notifications
- [ ] Terminal/Command Prompt emulator
- [ ] Registry editor simulation
- [ ] System restore points
- [ ] Error handling dialogs

## 📄 License

This project is free to use and modify. No license restrictions.

## 👨‍💻 Author

Created as a Windows 7 nostalgia project demonstrating modern web capabilities.

---

### 💡 Pro Tips

1. **Open Multiple Windows** - Launch the same app multiple times from the taskbar
2. **Dark Mode** - Go to Control Panel to enable dark mode for eye comfort
3. **Keyboard Shortcuts** - (Future feature) Customize keyboard shortcuts
4. **Themes** - Swap between different Aero color schemes

---

**Enjoy your Windows 7 Web OS experience!** 🎉

*Made with ❤️ using vanilla HTML5, CSS3, and JavaScript*
