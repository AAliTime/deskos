package memory

func CompactMemory() {
	currentAddr := 0
	var newBlocks []MemoryBlock
	InternalFragment = 0

	for _, block := range MemoryBlocks {
		if block.Used {
			block.Address = currentAddr
			currentAddr += block.Size
			newBlocks = append(newBlocks, block)
		}
	}

	ExternalFragment = TotalMemory - currentAddr
	MemoryBlocks = newBlocks
	UsedMemory = currentAddr
}
