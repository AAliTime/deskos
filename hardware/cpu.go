package hardware

import "math/rand"

var CPUUsageTotal float64 = 0.0

func UpdateCPU() {
	CPUUsageTotal = float64(rand.Intn(30) + 20)
}
