export function initStartMenu() {
    // Buscar el botón de inicio en la barra de tareas (asumimos el primer botón o ID #start-btn)
    const startBtn = document.getElementById("start-btn") || document.querySelector(".taskbar button");
    
    // Crear el elemento del menú flotante de inicio
    const startMenu = document.createElement("div");
    startMenu.className = "start-menu";
    startMenu.innerHTML = `
        <div class="start-menu-header">DeskOS 1.0</div>
        <div class="start-menu-item" id="menu-restart">🔄 Reiniciar</div>
        <div class="start-menu-item" id="menu-shutdown">⏻ Apagar</div>
    `;
    document.querySelector(".desktop").appendChild(startMenu);

    // Crear la pantalla de apagado (pantalla negra con botón de encendido)
    const shutdownOverlay = document.createElement("div");
    shutdownOverlay.className = "system-overlay";
    shutdownOverlay.id = "shutdown-overlay";
    shutdownOverlay.innerHTML = `
        <div style="margin-bottom: 20px; font-size: 13px; color: #666;">Sistema Apagado</div>
        <div class="power-on-btn" id="power-on-btn" title="Encender equipo">⏻</div>
    `;
    document.body.appendChild(shutdownOverlay);

    // Crear la pantalla de reinicio (pantalla negra con logo)
    const restartOverlay = document.createElement("div");
    restartOverlay.className = "system-overlay";
    restartOverlay.id = "restart-overlay";
    restartOverlay.innerHTML = `
        <div class="restart-logo">DeskOS</div>
        <div style="font-size: 11px; color: #666;">Reiniciando servicios del sistema...</div>
    `;
    document.body.appendChild(restartOverlay);

    // Evento para abrir/cerrar el menú al hacer clic en el botón de inicio
    if (startBtn) {
        startBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            startMenu.classList.toggle("active");
        });
    }

    // Cerrar el menú al hacer clic en cualquier otra parte del escritorio
    document.addEventListener("click", (e) => {
        if (!startMenu.contains(e.target) && startBtn && !startBtn.contains(e.target)) {
            startMenu.classList.remove("active");
        }
    });

    // Acción de Apagar
    const shutdownItem = startMenu.querySelector("#menu-shutdown");
    shutdownItem.addEventListener("click", () => {
        startMenu.classList.remove("active");
        shutdownOverlay.classList.add("active");
    });

    // Acción del botón de encender (después de apagar)
    const powerOnBtn = shutdownOverlay.querySelector("#power-on-btn");
    powerOnBtn.addEventListener("click", () => {
        shutdownOverlay.classList.remove("active");
    });

    // Acción de Reiniciar
    const restartItem = startMenu.querySelector("#menu-restart");
    restartItem.addEventListener("click", () => {
        startMenu.classList.remove("active");
        restartOverlay.classList.add("active");

        // Simular ciclo de reinicio de 2.5 segundos antes de volver al escritorio
        setTimeout(() => {
            restartOverlay.classList.remove("active");
        }, 2500);
    });
}