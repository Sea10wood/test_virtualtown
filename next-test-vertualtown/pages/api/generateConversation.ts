import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name1, name2, theme } = req.body

  const prompt1 = `${name1}が${name2}と「${theme}」について語っています。`
  const prompt2 = `${name2}が${name1}の発言に対して返答します。`

  try {
    const response1 = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: '入力された歴史上の人物同士が入力されたテーマに対して議論する対話を生成するAIです。',
        },
        { role: 'user', content: prompt1 },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const speech1 = response1.choices[0]?.message?.content?.trim() || ''

    const response2 = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: '哲学者や作家が議論する対話を生成するAIです。',
        },
        { role: 'user', content: prompt2 },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const speech2 = response2.choices[0]?.message?.content?.trim() || ''

    const conversation = `${name1}: ${speech1}\n${name2}: ${speech2}`

    // 対談後のプロフィールを生成
    const postProfilePrompt = `${name1}の現在のプロフィール: ${speech1}\n\n会話の内容: ${conversation}\n\nこの会話を元に${name1}の新しいプロフィールを作成してください。以下の情報を含めてください：\n1. 何か対談の中で${name1}の価値観に影響する考え方はあったか\n2. この対談での結論は何か\n3. この対談での${name1}の新しい発見や気づきは何か\n4. この対談で最後に${name1}が伝えたいことは何か\n5. この対談を経て${name1}が次に話したいテーマは何か`

    const postProfileResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'あなたは歴史上の人物の詳細なプロフィールを作成するAIです。',
        },
        { role: 'user', content: postProfilePrompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const postProfile = postProfileResponse.choices[0]?.message?.content?.trim() || ''

    // プロフィールを保存
    const filename = `${name1}_${name2}_profile_after.txt`
    const filePath = path.join(process.cwd(), 'profiles', filename)
    fs.writeFileSync(filePath, `${name1}のプロフィール:\n${postProfile}\n`, 'utf8')

    res.status(200).json({ conversation, postProfile })
  } catch (error) {
    res.status(500).json({ error: (error as any).message })
  }
}