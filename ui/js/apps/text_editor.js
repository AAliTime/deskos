export function initTextEditorContent(container) {
    container.innerHTML = `
        <div class="text-editor-container">
            <div class="text-editor-toolbar">
                <button class="text-editor-btn" data-action="clear">Limpiar</button>
                <button class="text-editor-btn" data-action="save">Guardar</button>
            </div>
            <textarea class="text-editor-textarea" placeholder="Escribe algo aquí..."></textarea>
        </div>
    `;

    const textarea = container.querySelector(".text-editor-textarea");
    
    container.querySelectorAll(".text-editor-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const action = btn.getAttribute("data-action");
            if (action === "clear") {
                textarea.value = "";
            } else if (action === "save") {
                alert("Contenido guardado temporalmente en el bloc de notas.");
            }
        });
    });
}