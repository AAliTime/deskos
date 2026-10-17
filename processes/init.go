package processes

import (
	"math/rand"
)

var ProcessesList []*Process
var GlobalQuantum int = 100

func InitProcesses() {
	apps := []string{
		"Explorador de Archivos", "Monitor del Sistema", "Calculadora",
		"Calendario", "Bloc de Notas", "Navegador Web",
		"Reproductor de Musica", "Terminal", "Ajustes", "Paint",
	}

	for i, name := range apps {
		p := &Process{
			ID:             i + 1,
			Name:           name,
			State:          StateNew, // Inician como NUEVOS (inactivos)
			Priority:       rand.Intn(5) + 1,
			Quantum:        GlobalQuantum,
			MemoryNeeded:   (rand.Intn(6) + 2) * 16,
			AssignedDevice: "Ninguno",
		}
		ProcessesList = append(ProcessesList, p)
	}
}
