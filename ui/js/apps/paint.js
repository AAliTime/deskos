export function initPaintContent(container) {
    container.innerHTML = `
        <div class="paint-container">
            <div class="paint-toolbar">
                <input type="color" class="paint-color-picker" id="paint-color" value="#000000" title="Color de Pincel" />
                <select class="paint-btn" id="paint-size">
                    <option value="2">Fino (2px)</option>
                    <option value="5" selected>Medio (5px)</option>
                    <option value="10">Grueso (10px)</option>
                </select>
                <button class="paint-btn" id="paint-clear">Limpiar Lienzo</button>
            </div>
            <div class="paint-canvas-wrapper" id="canvas-wrapper">
                <canvas class="paint-canvas" id="paint-canvas"></canvas>
            </div>
        </div>
    `;

    const canvas = container.querySelector("#paint-canvas");
    const wrapper = container.querySelector("#canvas-wrapper");
    const colorPicker = container.querySelector("#paint-color");
    const sizeSelect = container.querySelector("#paint-size");
    const clearBtn = container.querySelector("#paint-clear");

    const ctx = canvas.getContext("2d");

    // Inicializar dimensiones del canvas según el contenedor al abrir la ventana
    setTimeout(() => {
        canvas.width = wrapper.clientWidth || 350;
        canvas.height = wrapper.clientHeight || 220;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, 50);

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = sizeSelect.value;
        ctx.lineCap = "round";
        ctx.stroke();

        lastX = currentX;
        lastY = currentY;
    });

    window.addEventListener("mouseup", () => {
        isDrawing = false;
    });

    clearBtn.addEventListener("click", () => {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
}