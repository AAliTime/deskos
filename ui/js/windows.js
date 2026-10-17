import { initSystemMonitorContent } from "./apps/system_monitor.js";
import { initFileExplorerContent } from "./apps/file_explorer.js";
import { initCalculatorContent } from "./apps/calculator.js";
import { initCalendarContent } from "./apps/calendar.js";
import { initTextEditorContent } from "./apps/text_editor.js";
import { initBrowserContent } from "./apps/browser.js";
import { initMusicPlayerContent } from "./apps/music_player.js";
import { initTerminalContent } from "./apps/terminal.js";
import { initSettingsContent } from "./apps/settings.js";
import { initPaintContent } from "./apps/paint.js";

export function initWindows() {
    const monitorBtn = document.getElementById("btn-system-monitor");
    if (monitorBtn) {
        monitorBtn.addEventListener("click", () => {
            createAppWindow("system-monitor-window", "System Monitor", 2, initSystemMonitorContent, "600px", "600px");
        });
    }
    const explorerBtn = document.getElementById("btn-file-explorer");
    if (explorerBtn) {
        explorerBtn.addEventListener("click", () => {
            createAppWindow("file-explorer-window", "File Explorer", 1, initFileExplorerContent, "500px", "300px");
        });
    }
    const desktopCalc = document.getElementById("desktop-calculator");
    if (desktopCalc) {
        desktopCalc.addEventListener("dblclick", () => {
            createAppWindow("calculator-window", "Calculator", 3, initCalculatorContent, "260px", "320px");
        });
    }
    const desktopCal = document.getElementById("desktop-calendar");
    if (desktopCal) {
        desktopCal.addEventListener("dblclick", () => {
            createAppWindow("calendar-window", "Calendar", 4, initCalendarContent, "300px", "280px");
        });
    }
    const desktopTextEditor = document.getElementById("desktop-text-editor");
    if (desktopTextEditor) {
        desktopTextEditor.addEventListener("dblclick", () => {
            createAppWindow("text-editor-window", "Text Editor", 5, initTextEditorContent, "400px", "300px");
        });
    }
    const desktopBrowser = document.getElementById("desktop-browser");
    if (desktopBrowser) {
        desktopBrowser.addEventListener("dblclick", () => {
            createAppWindow("browser-window", "Web Browser", 6, initBrowserContent, "700px", "500px");
        });
    }
    const desktopMusic = document.getElementById("desktop-music-player");
    if (desktopMusic) {
        desktopMusic.addEventListener("dblclick", () => {
            createAppWindow("music-player-window", "Music Player", 7, initMusicPlayerContent, "300px", "320px");
        });
    }
    const desktopTerminal = document.getElementById("desktop-terminal");
    if (desktopTerminal) {
        desktopTerminal.addEventListener("dblclick", () => {
            createAppWindow("terminal-window", "Terminal", 8, initTerminalContent, "500px", "320px");
        });
    }
    const desktopSettings = document.getElementById("desktop-settings");
    if (desktopSettings) {
        desktopSettings.addEventListener("dblclick", () => {
            createAppWindow("settings-window", "Settings", 9, initSettingsContent, "400px", "350px");
        });
    }
    const desktopPaint = document.getElementById("desktop-paint");
    if (desktopPaint) {
        desktopPaint.addEventListener("dblclick", () => {
            createAppWindow("paint-window", "Paint", 10, initPaintContent, "1000px", "1000px");
        });
    }
}

let highestZIndex = 100;

async function createAppWindow(windowId, title, pid, initContentCallback, width = "400px", height = "300px") {
    let existingWindow = document.getElementById(windowId);
    if (existingWindow) {
        existingWindow.style.display = "flex";
        highestZIndex++;
        existingWindow.style.zIndex = highestZIndex;
        return;
    }

    // Notificar al backend de Go que el proceso inició
    try {
        await fetch(`http://localhost:8080/api/process?pid=${pid}&action=start`);
    } catch (e) {
        console.error("No se pudo notificar inicio de proceso al backend", e);
    }

    const win = document.createElement("div");
    win.id = windowId;
    win.className = "window floating-window";
    win.style.width = width;
    win.style.height = height;
    win.style.position = "absolute";
    win.style.top = "80px";
    win.style.left = "80px";
    highestZIndex++;
    win.style.zIndex = highestZIndex;

    win.innerHTML = `
        <div class="window-header">
            <span class="window-title">${title} (PID: ${pid})</span>
            <div class="window-controls">
                <button class="window-control-btn close-btn">X</button>
            </div>
        </div>
        <div class="window-body" style="height: calc(100% - 30px); overflow-y: auto;"></div>
    `;

    document.querySelector(".desktop").appendChild(win);

    // Traer al frente al hacer clic
    win.addEventListener("mousedown", () => {
        highestZIndex++;
        win.style.zIndex = highestZIndex;
    });

    const closeBtn = win.querySelector(".close-btn");
    closeBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        
        // Notificar al backend de Go que el proceso terminó
        try {
            await fetch(`http://localhost:8080/api/process?pid=${pid}&action=stop`);
        } catch (err) {
            console.error("No se pudo notificar cierre de proceso al backend", err);
        }

        win.remove();
    });

    // Lógica para arrastrar la ventana desde la barra de título
    const header = win.querySelector(".window-header");
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    header.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = win.offsetLeft;
        initialTop = win.offsetTop;
        e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        win.style.left = `${initialLeft + dx}px`;
        win.style.top = `${initialTop + dy}px`;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    const bodyContainer = win.querySelector(".window-body");
    initContentCallback(bodyContainer);
}