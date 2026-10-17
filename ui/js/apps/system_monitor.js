export function initSystemMonitorContent(container) {
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; height: 100%; padding: 12px; box-sizing: border-box; color: #fff; background: rgba(0,0,0,0.3); font-size: 12px; gap: 10px; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong>Estado del Kernel DeskOS</strong>
                <button id="refresh-monitor" style="background: #3584e4; border: none; color: #fff; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Actualizar</button>
            </div>
            
            <!-- Resumen de Hardware y Memoria -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <div style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 4px;">
                    <div><strong>Uso de CPU:</strong> <span id="cpu-val">0</span>%</div>
                    <div><strong>Memoria Usada:</strong> <span id="mem-val">0</span> / 1024 KB</div>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 4px;">
                    <div><strong>Frag. Interna:</strong> <span id="frag-int">0</span> KB</div>
                    <div><strong>Frag. Externa:</strong> <span id="frag-ext">0</span> KB</div>
                </div>
            </div>

            <!-- Visualización Gráfica de Memoria -->
            <div>
                <div style="margin-bottom: 4px; font-weight: bold;">Mapa de Memoria RAM:</div>
                <div id="memory-map" style="display: flex; height: 24px; background: #111; border-radius: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);"></div>
            </div>

            <!-- Alertas del Sistema (Deadlock / Inanición) -->
            <div id="system-alerts" style="color: #ff5555; font-weight: bold; min-height: 18px;"></div>

            <!-- Tabla de Procesos -->
            <div style="flex: 1; overflow-y: auto;">
                <div style="font-weight: bold; margin-bottom: 4px;">Procesos Activos (10):</div>
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 11px;">
                    <thead>
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                            <th style="padding: 4px;">PID</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Prioridad</th>
                            <th>Memoria</th>
                        </tr>
                    </thead>
                    <tbody id="processes-table-body">
                        <!-- Inyectado dinámicamente -->
                    </tbody>
                </table>
            </div>

            <!-- Botones de Control de Pruebas Académicas -->
            <div style="display: flex; gap: 6px; margin-top: 4px;">
                <button id="btn-compact" style="flex: 1; background: #2ecc71; border: none; padding: 6px; color: #fff; border-radius: 4px; cursor: pointer;">Compactar Memoria</button>
                <button id="btn-deadlock" style="flex: 1; background: #e74c3c; border: none; padding: 6px; color: #fff; border-radius: 4px; cursor: pointer;">Simular Deadlock</button>
                <button id="btn-resolve" style="flex: 1; background: #f39c12; border: none; padding: 6px; color: #fff; border-radius: 4px; cursor: pointer;">Resolver Deadlock</button>
            </div>
        </div>
    `;

    const cpuVal = container.querySelector("#cpu-val");
    const memVal = container.querySelector("#mem-val");
    const fragInt = container.querySelector("#frag-int");
    const fragExt = container.querySelector("#frag-ext");
    const memoryMap = container.querySelector("#memory-map");
    const systemAlerts = container.querySelector("#system-alerts");
    const tableBody = container.querySelector("#processes-table-body");

    async function fetchData() {
        try {
            const res = await fetch("http://localhost:8080/api/status");
            if (!res.ok) return;
            const data = await res.json();

            cpuVal.textContent = data.cpu_usage_total.toFixed(1);
            memVal.textContent = `${data.used_memory} KB`;
            fragInt.textContent = data.internal_fragmentation;
            fragExt.textContent = data.external_fragmentation;

            // Alertas
            let alerts = [];
            if (data.deadlock_detected) alerts.push("⚠️ ¡INTERBLOQUEO (DEADLOCK) DETECTADO!");
            if (data.starvation_detected) alerts.push("⚠️ ¡INANICIÓN (STARVATION) DETECTADA!");
            systemAlerts.textContent = alerts.join(" | ");

            // Renderizar Mapa de Memoria Gráfico
            memoryMap.innerHTML = data.memory_blocks.map(block => {
                const widthPercent = (block.size / data.total_memory) * 100;
                return `<div title="PID ${block.pid} (${block.size} KB)" style="width: ${widthPercent}%; background: ${block.used ? '#3584e4' : '#444'}; border-right: 1px solid #000; height: 100%;"></div>`;
            }).join('');

            // Renderizar Tabla de Procesos
            tableBody.innerHTML = data.processes.map(p => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 4px;">${p.id}</td>
                    <td>${p.name}</td>
                    <td style="color: ${p.state === 'EJECUCION' ? '#2ecc71' : p.state === 'BLOQUEADO' ? '#e74c3c' : '#f1c40f'}">${p.state}</td>
                    <td>P${p.priority}</td>
                    <td>${p.memory_needed} KB</td>
                </tr>
            `).join('');

        } catch (e) {
            console.error("Error conectando con el backend del OS", e);
        }
    }

    // Acciones de los botones de prueba
    container.querySelector("#btn-compact").addEventListener("click", async () => {
        await fetch("http://localhost:8080/api/action?action=compact");
        fetchData();
    });

    container.querySelector("#btn-deadlock").addEventListener("click", async () => {
        await fetch("http://localhost:8080/api/action?action=deadlock");
        fetchData();
    });

    container.querySelector("#btn-resolve").addEventListener("click", async () => {
        await fetch("http://localhost:8080/api/action?action=resolve_deadlock");
        fetchData();
    });

    container.querySelector("#refresh-monitor").addEventListener("click", fetchData);

    // Actualizar automáticamente cada segundo
    fetchData();
    const interval = setInterval(fetchData, 1000);

    // Limpiar intervalo al cerrar la ventana
    container.addEventListener("remove", () => clearInterval(interval));
}