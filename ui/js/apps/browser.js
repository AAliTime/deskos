export function initBrowserContent(container) {
    container.innerHTML = `
        <div class="browser-container">
            <div class="browser-toolbar">
                <button class="browser-btn" id="browser-back" title="Atrás">←</button>
                <button class="browser-btn" id="browser-reload" title="Recargar">↻</button>
                <select class="browser-engine-select" id="browser-engine">
                    <option value="duckduckgo">DuckDuckGo</option>
                    <option value="google">Google</option>
                </select>
                <input type="text" class="browser-address-bar" id="browser-url" placeholder="Escribe una URL o consulta de búsqueda..." />
                <button class="browser-btn" id="browser-go">Ir</button>
            </div>
            <iframe class="browser-content" id="browser-frame" src="https://html.duckduckgo.com/html/"></iframe>
        </div>
    `;

    const addressInput = container.querySelector("#browser-url");
    const goBtn = container.querySelector("#browser-go");
    const reloadBtn = container.querySelector("#browser-reload");
    const frame = container.querySelector("#browser-frame");
    const engineSelect = container.querySelector("#browser-engine");

    function navigate() {
        let query = addressInput.value.trim();
        if (!query) return;

        let targetUrl = "";

        // Verificar si es una URL válida (ej. https://... o dominio.com)
        if (/^(https?:\/\/)/i.test(query)) {
            targetUrl = query;
        } else if (/^[a-zA-Z0-0-]+\.[a-zA-Z]{2,}/.test(query)) {
            targetUrl = `https://${query}`;
        } else {
            // Si es un término de búsqueda, dirigir según el motor seleccionado
            const engine = engineSelect.value;
            if (engine === "google") {
                targetUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&igu=1`;
            } else {
                targetUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
            }
        }

        frame.src = targetUrl;
    }

    goBtn.addEventListener("click", navigate);

    addressInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            navigate();
        }
    });

    reloadBtn.addEventListener("click", () => {
        frame.src = frame.src;
    });
}