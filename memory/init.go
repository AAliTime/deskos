package memory

import "main/processes"

func InitMemory() {
	for _, p := range processes.ProcessesList {
		p.MemoryAddress = UsedMemory
		UsedMemory += p.MemoryNeeded

		leftover := p.MemoryNeeded % 32
		if leftover > 0 {
			InternalFragment += (32 - leftover)
		}

		MemoryBlocks = append(MemoryBlocks, MemoryBlock{
			Address: p.MemoryAddress,
			Size:    p.MemoryNeeded,
			Used:    true,
			PID:     p.ID,
		})
	}
}
