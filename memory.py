class MemoryStream:
    def __init__(self):
        self.memories = []

    def add_memory(self, event):
        self.memories.append(event)

    def generate_reflections(self):
        return [f"重要な記憶: {m}" for m in self.memories if "重要" in m]
