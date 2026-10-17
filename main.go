package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"sync"

	"main/hardware"
	"main/memory"
	"main/processes"
)

type SystemStatusResponse struct {
	Processes          []*processes.Process `json:"processes"`
	TotalMemory        int                  `json:"total_memory"`
	UsedMemory         int                  `json:"used_memory"`
	InternalFragment   int                  `json:"internal_fragmentation"`
	ExternalFragment   int                  `json:"external_fragmentation"`
	MemoryBlocks       []memory.MemoryBlock `json:"memory_blocks"`
	Peripherals        map[string]int       `json:"peripherals"`
	CPUUsageTotal      float64              `json:"cpu_usage_total"`
	GlobalQuantum      int                  `json:"global_quantum"`
	DeadlockDetected   bool                 `json:"deadlock_detected"`
	StarvationDetected bool                 `json:"starvation_detected"`
}

var mu sync.Mutex

func getStatusHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	mu.Lock()
	defer mu.Unlock()

	hardware.UpdateCPU()
	internalFrag, externalFrag := memory.GetFragmentationStats()

	status := SystemStatusResponse{
		Processes:          processes.ProcessesList,
		TotalMemory:        memory.TotalMemory,
		UsedMemory:         memory.UsedMemory,
		InternalFragment:   internalFrag,
		ExternalFragment:   externalFrag,
		MemoryBlocks:       memory.MemoryBlocks,
		Peripherals:        hardware.Peripherals,
		CPUUsageTotal:      hardware.CPUUsageTotal,
		GlobalQuantum:      processes.GlobalQuantum,
		DeadlockDetected:   processes.DeadlockDetected,
		StarvationDetected: processes.StarvationDetected,
	}

	json.NewEncoder(w).Encode(status)
}

// Endpoint para controlar el inicio y cierre dinámico de procesos desde el frontend
func processActionHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	pidStr := r.URL.Query().Get("pid")
	action := r.URL.Query().Get("action")

	pid, err := strconv.Atoi(pidStr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	for _, p := range processes.ProcessesList {
		if p.ID == pid {
			if action == "start" {
				p.State = processes.StateReady
			} else if action == "stop" {
				p.State = processes.StateTerminated
				p.CPUUsage = 0
			}
			break
		}
	}

	w.WriteHeader(http.StatusOK)
}

func triggerActionHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	action := r.URL.Query().Get("action")

	mu.Lock()
	defer mu.Unlock()

	switch action {
	case "compact":
		memory.CompactMemory()
	case "deadlock":
		if len(processes.ProcessesList) >= 2 {
			processes.ProcessesList[0].State = processes.StateBlocked
			processes.ProcessesList[0].IsDeadlocked = true
			processes.ProcessesList[0].AssignedDevice = "Impresora (Esperando DiscoDuro)"

			processes.ProcessesList[1].State = processes.StateBlocked
			processes.ProcessesList[1].IsDeadlocked = true
			processes.ProcessesList[1].AssignedDevice = "DiscoDuro (Esperando Impresora)"
		}
	case "resolve_deadlock":
		for _, p := range processes.ProcessesList {
			if p.IsDeadlocked {
				p.State = processes.StateReady
				p.IsDeadlocked = false
				p.AssignedDevice = "Ninguno"
			}
		}
		processes.DeadlockDetected = false
	}

	w.WriteHeader(http.StatusOK)
}

func main() {
	// Inicializar submódulos
	processes.InitProcesses()
	memory.InitMemory()
	hardware.InitHardware()
	processes.StartScheduler()

	// Servir frontend modular
	fs := http.FileServer(http.Dir("./ui"))
	http.Handle("/", fs)

	// Endpoints API estructurados
	http.HandleFunc("/api/status", getStatusHandler)
	http.HandleFunc("/api/process", processActionHandler)
	http.HandleFunc("/api/action", triggerActionHandler)

	fmt.Println("==================================================")
	fmt.Println("🚀 DeskOS Modular Kernel iniciado en http://localhost:8080")
	fmt.Println("==================================================")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
