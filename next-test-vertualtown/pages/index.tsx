import { useState, useEffect } from 'react'
import Head from 'next/head'
import ProfileForm from '../components/ProfileForm'
import ProfileDisplay from '../components/ProfileDisplay'
import ConversationDisplay from '../components/ConversationDisplay'

export default function Home() {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [conversation, setConversation] = useState('')
  const [preProfile1, setPreProfile1] = useState('')
  const [preProfile2, setPreProfile2] = useState('')
  const [postProfile1, setPostProfile1] = useState('')
  const [postProfile2, setPostProfile2] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activePage, setActivePage] = useState('input')
  const [pastConversations, setPastConversations] = useState<{ name1: string; name2: string; conversation: string; preProfile1: string; preProfile2: string; postProfile1: string; postProfile2: string; }[]>([])

  useEffect(() => {
    // ローカルストレージから過去の対談を読み込む
    const storedConversations = JSON.parse(localStorage.getItem('pastConversations') || '[]')
    setPastConversations(storedConversations)
  }, [])

  const handleProfileGenerated = (name1: string, name2: string, conversation: string, preProfile1: string, preProfile2: string, postProfile1: string, postProfile2: string) => {
    setName1(name1)
    setName2(name2)
    setConversation(conversation)
    setPreProfile1(preProfile1)
    setPreProfile2(preProfile2)
    setPostProfile1(postProfile1)
    setPostProfile2(postProfile2)

    // 新しい対談をローカルストレージに保存
    const newConversation = { name1, name2, conversation, preProfile1, preProfile2, postProfile1, postProfile2 }
    const updatedConversations = [newConversation, ...pastConversations]
    setPastConversations(updatedConversations)
    localStorage.setItem('pastConversations', JSON.stringify(updatedConversations))
  }

  const formatProfile = (profile: string) => {
    return profile.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ))
  }

  const formatPostProfile = (profile: string) => {
    return profile.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ))
  }

  return (
    <>
      <Head>
        <title>プロフィール生成アプリ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-800 text-gray-200">
        <header className="flex justify-between items-center p-4 bg-gray-900">
          <h1 className="text-2xl font-bold ml-2">🗣️　対談</h1>
          <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            ☰
          </button>
        </header>
        <div className="flex flex-1">
          <aside className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out bg-gray-900 p-4 w-64 md:relative md:translate-x-0`}>
            <ul>
              <li className="mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded" onClick={() => setActivePage('input')}>入力</li>
              <li className="mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded" onClick={() => setActivePage('preProfile')}>対談前プロフィール</li>
              <li className="mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded" onClick={() => setActivePage('conversation')}>対談</li>
              <li className="mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded" onClick={() => setActivePage('postProfile')}>対談後プロフィール</li>
            </ul>
            <div className="mt-auto">
              <h3 className="text-xl font-bold mt-14 mb-2">過去の対談</h3>
              <ul className="space-y-2">
                {pastConversations.map((conv, index) => (
                  <li key={index} className="cursor-pointer hover:bg-gray-700 p-2 rounded" onClick={() => {
                    setName1(conv.name1)
                    setName2(conv.name2)
                    setConversation(conv.conversation)
                    setPreProfile1(conv.preProfile1)
                    setPreProfile2(conv.preProfile2)
                    setPostProfile1(conv.postProfile1)
                    setPostProfile2(conv.postProfile2)
                    setActivePage('conversation')
                  }}>
                    {conv.name1} & {conv.name2}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <main className="flex-1 p-8 space-y-8 ml-64 md:ml-0">
            {activePage === 'input' && (
              <ProfileForm onProfileGenerated={handleProfileGenerated} />
            )}
            {activePage === 'preProfile' && conversation && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">対談前プロフィール</h2>
                <div className="bg-gray-700 p-4 rounded-lg space-y-4">
                  <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-xl font-bold mb-2">プロフィール1</h3>
                    {formatProfile(preProfile1)}
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-xl font-bold mb-2">プロフィール2</h3>
                    {formatProfile(preProfile2)}
                  </div>
                </div>
              </div>
            )}
            {activePage === 'conversation' && conversation && (
              <ConversationDisplay name1={name1} name2={name2} conversation={conversation} />
            )}
            {activePage === 'postProfile' && conversation && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">対談後プロフィール</h2>
                <div className="bg-gray-700 p-4 rounded-lg space-y-4">
                  <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-xl font-bold mb-2">プロフィール1</h3>
                    {formatPostProfile(postProfile1)}
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-xl font-bold mb-2">プロフィール2</h3>
                    {formatPostProfile(postProfile2)}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
        <footer className="w-full bg-gray-900 text-center p-4 mt-auto">
          <p>&copy; Sea10</p>
        </footer>
      </div>
    </>
  )
}