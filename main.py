from agent import Agent
from agent_profile import generate_agent_profile 

if __name__ == "__main__":
    # ユーザー入力を受け取る
    name1 = input("1人目の偉人の名前: ")
    name2 = input("2人目の偉人の名前: ")
    theme = input("議論のテーマ: ")
    
    profile1 = generate_agent_profile(name1)
    profile2 = generate_agent_profile(name2)
    
    agent1 = Agent(name1, profile1)
    agent2 = Agent(name2, profile2)
    
    print("\n=== 会話開始 ===\n")
    print(agent1.interact(agent2, theme))