package processes

import (
	"math/rand"
	"time"
)

var StarvationDetected bool = false
var DeadlockDetected bool = false

func StartScheduler() {
	go func() {
		for {
			time.Sleep(time.Duration(GlobalQuantum) * time.Millisecond)

			for _, p := range ProcessesList {
				// Si el proceso está NUEVO o TERMINADO, el planificador no lo toca
				if p.State == StateNew || p.State == StateTerminated {
					continue
				}

				if p.State == StateRunning {
					p.State = StateReady
					p.CPUUsage = 0
				} else if p.State == StateReady {
					p.State = StateRunning
					p.CPUUsage = float64(rand.Intn(40) + 10)
					p.WaitTime = 0
				}

				if p.State == StateBlocked || (p.State == StateReady && p.Priority > 4) {
					p.WaitTime += GlobalQuantum
					if p.WaitTime > 1500 {
						StarvationDetected = true
					}
				}
			}

			checkDeadlock()
		}
	}()
}

func checkDeadlock() {
	blockedCount := 0
	for _, p := range ProcessesList {
		if p.State == StateBlocked && p.IsDeadlocked {
			blockedCount++
		}
	}
	DeadlockDetected = blockedCount >= 2
}
