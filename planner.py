class Planner:
    def create_daily_plan(self, name, memory):
        return f"{name} の1日計画: {', '.join(memory.memories) if memory.memories else '特に予定なし'}"
