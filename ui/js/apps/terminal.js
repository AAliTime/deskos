export function initTerminalContent(container) {
    container.innerHTML = `
        <div class="terminal-container">
            <div class="terminal-output" id="terminal-output">
                <div class="terminal-line system">DeskOS Terminal v1.0.0</div>
                <div class="terminal-line system">Escribe 'help' para ver la lista de comandos disponibles.</div>
                <br />
            </div>
            <div class="terminal-input-row">
                <span class="terminal-prompt">user@deskos:~$</span>
                <input type="text" class="terminal-input" id="terminal-input" autofocus />
            </div>
        </div>
    `;

    const output = container.querySelector("#terminal-output");
    const input = container.querySelector("#terminal-input");

    function printLine(text, type = "") {
        const line = document.createElement("div");
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    input.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
            const command = input.value.trim();
            if (!command) return;

            printLine(`user@deskos:~$ ${command}`);
            input.value = "";

            const parts = command.split(" ");
            const cmd = parts[0].toLowerCase();

            switch (cmd) {
                case "help":
                    printLine("Comandos disponibles:");
                    printLine("  help      - Muestra esta lista de ayuda");
                    printLine("  clear     - Limpia la pantalla");
                    printLine("  date      - Muestra la fecha y hora actual");
                    printLine("  ls        - Lista archivos y carpetas del directorio actual");
                    printLine("  status    - Consulta el estado del backend (/api/status)");
                    printLine("  echo      - Imprime un texto en la consola");
                    break;

                case "clear":
                    output.innerHTML = "";
                    break;

                case "date":
                    printLine(new Date().toString());
                    break;

                case "ls":
                    printLine("Documents/   Downloads/   Pictures/   nota.txt");
                    break;

                case "echo":
                    printLine(parts.slice(1).join(" "));
                    break;

                case "status":
                    try {
                        const res = await fetch("/api/status");
                        if (res.ok) {
                            const data = await res.json();
                            printLine(`Estado servidor: ${JSON.stringify(data)}`);
                        } else {
                            printLine(`Error HTTP: ${res.status}`, "error");
                        }
                    } catch (err) {
                        printLine("Error de conexión con el backend", "error");
                    }
                    break;

                default:
                    printLine(`Comando no encontrado: ${cmd}. Escribe 'help' para obtener ayuda.`, "error");
                    break;
            }
        }
    });

    // Enfocar el input al hacer clic en el área de la terminal
    container.addEventListener("click", () => {
        input.focus();
    });
}