import { useState } from 'react'

interface ProfileFormProps {
  onProfileGenerated: (name1: string, name2: string, conversation: string, preProfile1: string, preProfile2: string, postProfile1: string, postProfile2: string) => void
}

const ProfileForm = ({ onProfileGenerated }: ProfileFormProps) => {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [theme, setTheme] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // 1人目のプロフィールを生成
    const response1 = await fetch('/api/generateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name1 }),
    })
    const data1 = await response1.json()
    const preProfile1 = data1.profile

    // 2人目のプロフィールを生成
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-4 bg-gray-700 rounded-md">
      <label htmlFor="name1" className="text-lg font-semibold">
        1人目の名前を入力してください
      </label>
      <input
        type="text"
        id="name1"
        value={name1}
        onChange={(e) => setName1(e.target.value)}
        placeholder="名前1"
        required
        className="p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label htmlFor="name2" className="text-lg font-semibold">
        2人目の名前を入力してください
      </label>
      <input
        type="text"
        id="name2"
        value={name2}
        onChange={(e) => setName2(e.target.value)}
        placeholder="名前2"
        required
        className="p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label htmlFor="theme" className="text-lg font-semibold">
        テーマを入力してください
      </label>
      <input
        type="text"
        id="theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        placeholder="テーマ"
        required
        className="p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="p-2 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {loading ? '生成中...' : '生成'}
      </button>
    </form>
  )
}

export default ProfileForm