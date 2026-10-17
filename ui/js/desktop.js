function updateClock() {
    const clockDisplay = document.getElementById("clock-display");
    const dateDisplay = document.getElementById("date-display");
    
    if (!clockDisplay || !dateDisplay) return;

    const now = new Date();
    clockDisplay.textContent = now.toLocaleTimeString();
    dateDisplay.textContent = now.toLocaleDateString();
}

export function initDesktop() {
    const desktop = document.getElementById("desktop") || document.body;
    const contextMenu = document.getElementById("context-menu");
    
    const modal = document.getElementById("input-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalInput = document.getElementById("modal-input");
    const modalCancel = document.getElementById("modal-cancel");
    const modalOk = document.getElementById("modal-ok");

    let currentAction = null;

    // Evento Clic Derecho para abrir menú contextual
    document.addEventListener("contextmenu", (e) => {
        // Evitar que abra el menú contextual del navegador
        e.preventDefault();
        if (contextMenu) {
            contextMenu.style.top = `${e.clientY}px`;
            contextMenu.style.left = `${e.clientX}px`;
            contextMenu.style.display = "block";
        }
    });

    document.addEventListener("click", () => {
        if (contextMenu) {
            contextMenu.style.display = "none";
        }
    });

    function openModal(title, actionType) {
        modalTitle.textContent = title;
        modalInput.value = "";
        modal.style.display = "flex";
        modalInput.focus();
        currentAction = actionType;
    }

    function closeModal() {
        modal.style.display = "none";
        currentAction = null;
    }

    const btnFolder = document.getElementById("menu-nueva-carpeta");
    if (btnFolder) {
        btnFolder.addEventListener("click", (e) => {
            e.stopPropagation();
            openModal("Nueva Carpeta", "folder");
        });
    }

    const btnFile = document.getElementById("menu-nuevo-archivo");
    if (btnFile) {
        btnFile.addEventListener("click", (e) => {
            e.stopPropagation();
            openModal("Nuevo Archivo", "file");
        });
    }

    modalCancel.addEventListener("click", closeModal);

    modalOk.addEventListener("click", () => {
        const name = modalInput.value.trim();
        if (!name) return;

        if (currentAction === "folder") {
            const folder = document.createElement("div");
            folder.className = "desktop-folder";
            folder.innerHTML = `
                <div class="desktop-folder-icon"></div>
                <span class="desktop-folder-label">${name}</span>
            `;
            desktop.appendChild(folder);
        } else if (currentAction === "file") {
            const file = document.createElement("div");
            file.className = "desktop-file";
            file.innerHTML = `
                <div class="desktop-file-icon"></div>
                <span class="desktop-file-label">${name}</span>
            `;
            desktop.appendChild(file);
        }

        closeModal();
    });

    modalInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            modalOk.click();
        } else if (e.key === "Escape") {
            closeModal();
        }
    });

    // Iniciar Reloj
    updateClock();
    setInterval(updateClock, 1000);
}