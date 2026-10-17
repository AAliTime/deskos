package processes

type ProcessState string

const (
	StateNew        ProcessState = "NUEVO"
	StateReady      ProcessState = "LISTO"
	StateRunning    ProcessState = "EJECUCION"
	StateBlocked    ProcessState = "BLOQUEADO"
	StateTerminated ProcessState = "TERMINADO"
)

type Process struct {
	ID             int          `json:"id"`
	Name           string       `json:"name"`
	State          ProcessState `json:"state"`
	Priority       int          `json:"priority"` // 1 (Alta) a 5 (Baja)
	Quantum        int          `json:"quantum"`  // Quantum asignado (ms)
	CPUUsage       float64      `json:"cpu_usage"`
	MemoryNeeded   int          `json:"memory_needed"` // KB
	MemoryAddress  int          `json:"memory_address"`
	AssignedDevice string       `json:"assigned_device"`
	WaitTime       int          `json:"wait_time"` // Para inanición
	IsDeadlocked   bool         `json:"is_deadlocked"`
}
