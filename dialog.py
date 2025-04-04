import openai
import os
from dotenv import load_dotenv
import time

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

class DialogueSystem:
    def generate_conversation(self, agent1, agent2, theme):
        """2人のエージェントが指定されたテーマについて3往復の会話を行う"""
        conversation = []
        
        for _ in range(1):
            prompt1 = f"{agent1.name}が{agent2.name}と「{theme}」について語っています。"
            try:
                response1 = openai.ChatCompletion.create(
                    model="gpt-4",
                    messages=[{"role": "system", "content": "入力された歴史上の人物同士が入力されたテーマに対して議論する対話を生成するAIです。"},
                              {"role": "user", "content": prompt1}],
                    temperature=0.7,
                    request_timeout=30 
                )
                speech1 = response1['choices'][0]['message']['content']
            except openai.error.Timeout as e:
                print(f"Timeout occurred: {e}")
                time.sleep(5)  # 少し待ってから再試行
                continue
            
            prompt2 = f"{agent2.name}が{agent1.name}の発言に対して返答します。"
            try:
                response2 = openai.ChatCompletion.create(
                    model="gpt-4",
                    messages=[{"role": "system", "content": "哲学者や作家が議論する対話を生成するAIです。"},
                              {"role": "user", "content": prompt2}],
                    temperature=0.7,
                    request_timeout=30 
                )
                speech2 = response2['choices'][0]['message']['content']
            except openai.error.Timeout as e:
                print(f"Timeout occurred: {e}")
                time.sleep(5)  # 少し待ってから再試行
                continue
            
            conversation.append(f"{agent1.name}: {speech1}")
            conversation.append(f"{agent2.name}: {speech2}")
        
        return "\n".join(conversation)

def generate_agent_profile(name):
    prompt = f"{name}のプロフィールを作成してください。"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "あなたは歴史上の人物のプロフィールを作成するAIです。"},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=150
    )
    profile = response['choices'][0]['message']['content'].strip()
    return profile

def save_profile(name, profile, filename):
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(f"{name}のプロフィール:\n{profile}\n")

def update_profile_with_conversation(name, profile, conversation):
    prompt = f"{name}の現在のプロフィール: {profile}\n\n会話の内容: {conversation}\n\nこの会話を元に{name}の新しいプロフィールを作成してください。"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "あなたは歴史上の人物のプロフィールを更新するAIです。"},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=150
    )
    updated_profile = response['choices'][0]['message']['content'].strip()
    return updated_profile
