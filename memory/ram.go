package memory

type MemoryBlock struct {
	Address int  `json:"address"`
	Size    int  `json:"size"`
	Used    bool `json:"used"`
	PID     int  `json:"pid"`
}

var TotalMemory int = 1024
var UsedMemory int = 0
var InternalFragment int = 0
var ExternalFragment int = 0
var MemoryBlocks []MemoryBlock
