import { useState } from 'react'

interface ProfileFormProps {
  onProfileGenerated: (name1: string, name2: string, conversation: string, preProfile1: string, preProfile2: string, postProfile1: string, postProfile2: string) => void
}

export default function ProfileForm({ onProfileGenerated }: ProfileFormProps) {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [theme, setTheme] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // プロフィール1を生成
    const response1 = await fetch('/api/generateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name1 }),
    })
    const data1 = await response1.json()
    const preProfile1 = data1.profile

    // プロフィール2を生成
    const response2 = await fetch('/api/generateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name2 }),
    })
    const data2 = await response2.json()
    const preProfile2 = data2.profile

    // 対話を生成
    const response3 = await fetch('/api/generateConversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name1, name2, theme }),
    })
    const data3 = await response3.json()
    const conversation = data3.conversation
    const postProfile1 = data3.postProfile1
    const postProfile2 = data3.postProfile2

    onProfileGenerated(name1, name2, conversation, preProfile1, preProfile2, postProfile1, postProfile2)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mx-auto p-4 bg-gray-800 border border-gray-700 rounded" style={{ width: '20%' }}>
      <div>
        <label htmlFor="name1" className="block text-white">名前1</label>
        <input
          type="text"
          id="name1"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
        />
      </div>
      <div>
        <label htmlFor="name2" className="block text-white">名前2</label>
        <input
          type="text"
          id="name2"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
        />
      </div>
      <div>
        <label htmlFor="theme" className="block text-white">テーマ</label>
        <input
          type="text"
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
        />
      </div>
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded" disabled={loading}>
        {loading ? '生成中...' : '生成'}
      </button>
    </form>
  )
}