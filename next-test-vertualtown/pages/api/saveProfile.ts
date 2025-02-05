import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, profile, type } = req.body
  const filename = `${name}_profile_${type}.txt`
  const filePath = path.join(process.cwd(), 'profiles', filename)

  fs.writeFileSync(filePath, `${name}のプロフィール:\n${profile}\n`, 'utf8')

  res.status(200).json({ message: 'プロフィールが保存されました。' })
}