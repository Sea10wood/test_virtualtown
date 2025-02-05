import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.body

  const prompt = `${name}のプロフィールを作成してください。以下の情報を含めてください：\n
    1. 名前\n
    2. 国籍\n
    3. 生年月日\n
    4. 没年月日\n
    5. 生い立ち\n
    6. 幼少期の出来事\n
    7. 名言\n
    8. 趣味\n
    9. 経歴\n
    10. その他の特筆すべき事象\n
    また、その人が生きていた時の周辺出来事や戦争、争い、紛争といったビッグニュースも調べてください。そのニュースがもしプロフィールの人物に影響を与えていたら、その影響に関しても追記してください。`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'あなたは歴史上の人物の詳細なプロフィールを作成するAIです。',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const profile = response.choices[0]?.message?.content?.trim() || 'プロフィールの生成に失敗しました。'
    res.status(200).json({ profile })
  } catch (error) {
    res.status(500).json({ error: (error as any).message })
  }
}