from agent import Agent
from agent_profile import generate_agent_profile, save_profile, update_profile_with_conversation

if __name__ == "__main__":
    # ユーザー入力を受け取る
    name1 = input("1人目の偉人の名前: ")
    name2 = input("2人目の偉人の名前: ")
    theme = input("議論のテーマ: ")
    
    # 対談前のプロフィールを生成
    profile1 = generate_agent_profile(name1)
    profile2 = generate_agent_profile(name2)
    
    # 対談前のプロフィールを保存
    save_profile(name1, profile1, f"{name1}_profile_before.txt")
    save_profile(name2, profile2, f"{name2}_profile_before.txt")
    
    agent1 = Agent(name1, profile1)
    agent2 = Agent(name2, profile2)
    
    print("\n=== 会話開始 ===\n")
    conversation = agent1.interact(agent2, theme)
    print(conversation)
    
    # 対談後のプロフィールを更新
    post_profile1 = update_profile_with_conversation(name1, profile1, conversation)
    post_profile2 = update_profile_with_conversation(name2, profile2, conversation)
    
    # 対談後のプロフィールを保存
    save_profile(name1, post_profile1, f"{name1}_profile_after.txt")
    save_profile(name2, post_profile2, f"{name2}_profile_after.txt")