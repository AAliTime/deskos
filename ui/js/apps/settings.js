export function initSettingsContent(container) {
    container.innerHTML = `
        <div class="settings-container">
            <div class="settings-section">
                <div class="settings-title">Personalización</div>
                <div class="settings-row">
                    <span>Fondo de escritorio:</span>
                    <select class="settings-select" id="setting-wallpaper">
                        <option value="default">Oscuro Clásico</option>
                        <option value="gradient">Degradado Azul</option>
                        <option value="solid">Gris Oscuro</option>
                    </select>
                </div>
            </div>

            <div class="settings-section">
                <div class="settings-title">Sistema</div>
                <div class="settings-row">
                    <span>Nombre del dispositivo:</span>
                    <input type="text" class="settings-input" id="setting-hostname" value="DeskOS-PC" />
                </div>
                <div class="settings-row">
                    <span>Efectos de sonido:</span>
                    <input type="checkbox" id="setting-sounds" checked />
                </div>
            </div>

            <div class="settings-section">
                <div class="settings-title">Acerca de DeskOS</div>
                <div class="settings-row">
                    <span>Versión:</span>
                    <span>1.0.0 Modular</span>
                </div>
                <div class="settings-row">
                    <span>Backend:</span>
                    <span>Go (Port 8080)</span>
                </div>
            </div>

            <div style="text-align: right;">
                <button class="settings-btn" id="save-settings-btn">Guardar Cambios</button>
            </div>
        </div>
    `;

    const wallpaperSelect = container.querySelector("#setting-wallpaper");
    const saveBtn = container.querySelector("#save-settings-btn");
    const desktop = document.querySelector(".desktop");

    saveBtn.addEventListener("click", () => {
        const selectedWallpaper = wallpaperSelect.value;
        
        if (desktop) {
            if (selectedWallpaper === "gradient") {
                desktop.style.background = "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)";
            } else if (selectedWallpaper === "solid") {
                desktop.style.background = "#1a1a1a";
            } else {
                desktop.style.background = "radial-gradient(circle at center, #1b263b 0%, #0d1b2a 100%)";
            }
        }

        alert("Ajustes guardados correctamente.");
    });
}