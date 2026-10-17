const fileSystem = {
    "/home/user": [
        { name: "Carpeta1", type: "folder" },
        { name: "nota.txt", type: "file" }
    ],
    "/Documents": [
        { name: "Proyecto", type: "folder" },
        { name: "informe.txt", type: "file" }
    ],
    "/Downloads": [
        { name: "archivo.zip", type: "file" }
    ]
};

export function initFileExplorerContent(container) {
    let currentPath = "/home/user";

    function render() {
        const items = fileSystem[currentPath] || [];

        container.innerHTML = `
            <div class="file-explorer-container">
                <div class="explorer-sidebar">
                    <div class="explorer-sidebar-title">Directorios</div>
                    <div class="explorer-sidebar-item ${currentPath === '/home/user' ? 'active' : ''}" data-path="/home/user">/home/user</div>
                    <div class="explorer-sidebar-item ${currentPath === '/Documents' ? 'active' : ''}" data-path="/Documents">/Documents</div>
                    <div class="explorer-sidebar-item ${currentPath === '/Downloads' ? 'active' : ''}" data-path="/Downloads">/Downloads</div>
                </div>
                <div class="explorer-main">
                    <div class="explorer-path">Ruta: ${currentPath}</div>
                    <div class="file-grid">
                        ${items.map(item => `
                            <div class="file-item" data-name="${item.name}" data-type="${item.type}">
                                ${item.type === 'folder' 
                                    ? '<img src="icons/file_explorer.png" alt="Carpeta" class="file-icon-img" />' 
                                    : '<div class="file-icon-badge">TXT</div>'
                                }
                                <span class="file-label">${item.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        container.querySelectorAll('.explorer-sidebar-item').forEach(el => {
            el.addEventListener('click', () => {
                currentPath = el.getAttribute('data-path');
                render();
            });
        });

        container.querySelectorAll('.file-item').forEach(el => {
            el.addEventListener('dblclick', () => {
                const type = el.getAttribute('data-type');
                const name = el.getAttribute('data-name');
                if (type === 'folder') {
                    currentPath = `${currentPath === '/' ? '' : currentPath}/${name}`;
                    if (!fileSystem[currentPath]) {
                        fileSystem[currentPath] = [];
                    }
                    render();
                }
            });
        });
    }

    render();
}