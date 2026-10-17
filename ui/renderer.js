document.addEventListener("DOMContentLoaded", () => {
    const desktop = document.querySelector(".desktop");

    const contextMenu = document.createElement("div");
    contextMenu.id = "context-menu";
    contextMenu.style.display = "none";
    contextMenu.style.position = "absolute";
    contextMenu.style.backgroundColor = "#161b22";
    contextMenu.style.border = "1px solid #30363d";
    contextMenu.style.borderRadius = "6px";
    contextMenu.style.padding = "4px 0";
    contextMenu.style.zIndex = "10000";
    contextMenu.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.5)";
    
    contextMenu.innerHTML = `
        <div class="menu-item" id="menu-nuevo-archivo" style="padding: 8px 16px; font-size: 12px; cursor: pointer; color: #c9d1d9;">Nuevo Archivo</div>
        <div class="menu-item" id="menu-nueva-carpeta" style="padding: 8px 16px; font-size: 12px; cursor: pointer; color: #c9d1d9;">Nueva Carpeta</div>
    `;
    
    document.body.appendChild(contextMenu);

    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        contextMenu.style.top = `${e.clientY}px`;
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.display = "block";
    });

    document.addEventListener("click", () => {
        contextMenu.style.display = "none";
    });

    document.getElementById("menu-nueva-carpeta").addEventListener("click", () => {
        const folderName = prompt("Nombre de la carpeta:");
        if (folderName) {
            const folder = document.createElement("div");
            folder.style.width = "64px";
            folder.style.height = "64px";
            folder.style.display = "flex";
            folder.style.flexDirection = "column";
            folder.style.alignItems = "center";
            folder.style.gap = "4px";
            folder.style.cursor = "pointer";
            folder.innerHTML = `
                <div style="width: 48px; height: 38px; background-color: #d29922; border-radius: 4px;"></div>
                <span style="font-size: 11px; color: #ffffff; text-align: center; width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${folderName}</span>
            `;
            desktop.appendChild(folder);
        }
    });
});