const API_BASE_URL = "http://localhost:8080/api";

export async function fetchSystemStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/status`);
        if (!response.ok) throw new Error("Error al conectar con el kernel");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createProcess(name, priority) {
    try {
        const response = await fetch(`${API_BASE_URL}/process`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, priority })
        });
        if (!response.ok) throw new Error("Error al crear el proceso");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}