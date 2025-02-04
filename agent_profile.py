import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_agent_profile(name):
    prompt = (
        f"{name}のプロフィールを作成してください。以下の情報を含めてください：\n"
        "1. 名前\n"
        "2. 国籍\n"
        "3. 生年月日\n"
        "4. 没年月日\n"
        "5. 生い立ち\n"
        "6. 幼少期の出来事\n"
        "7. 名言\n"
        "8. 趣味\n"
        "9. 経歴\n"
        "10. その他の特筆すべき事象\n"
        "{N}が生きていた時の周辺出来事や戦争、争い、紛争といったビッグニュースも調べてください。そのニュースがもしプロフィールの人物に影響を与えていたら、その影響に関しても追記してください。"
    )
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "あなたは歴史上の人物の詳細なプロフィールを作成するAIです。"},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=1000
    )
    profile = response['choices'][0]['message']['content'].strip()
    return profile

def save_profile(name, profile, filename):
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(f"{name}のプロフィール:\n{profile}\n")

def update_profile_with_conversation(name, profile, conversation):
    prompt = (
        f"{name}の現在のプロフィール: {profile}\n\n"
        f"会話の内容: {conversation}\n\n"
        f"この会話を元に{name}の新しいプロフィールを作成してください。以下の情報を含めてください：\n"
         "1. 何か対談の中で{name}の価値観に影響する考え方はあったか\n"
         "2. この対談での結論は何か"
         "3. この対談での{name}の新しい発見や気づきは何か"
         "4. この対談で最後に{name}が伝えたいことは何か"
         "5. この対談を経て{name}が次に話したいテーマは誰か"
        
    )
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "あなたは歴史上の人物の詳細なプロフィールを更新するAIです。"},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=1000
    )
    updated_profile = response['choices'][0]['message']['content'].strip()
    return updated_profile
