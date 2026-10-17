package memory

func GetFragmentationStats() (int, int) {
	return InternalFragment, ExternalFragment
}
