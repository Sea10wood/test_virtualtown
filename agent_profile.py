import openai

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
    profile = response.choices[0].message["content"].strip()
    return profile
