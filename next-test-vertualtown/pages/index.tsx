import { useState } from 'react'
import Head from 'next/head'
import ProfileForm from '../components/ProfileForm'
import ProfileDisplay from '../components/ProfileDisplay'

export default function Home() {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [conversation, setConversation] = useState('')
  const [preProfile1, setPreProfile1] = useState('')
  const [preProfile2, setPreProfile2] = useState('')
  const [postProfile1, setPostProfile1] = useState('')
  const [postProfile2, setPostProfile2] = useState('')

  const handleProfileGenerated = (name1: string, name2: string, conversation: string, preProfile1: string, preProfile2: string, postProfile1: string, postProfile2: string) => {
    setName1(name1)
    setName2(name2)
    setConversation(conversation)
    setPreProfile1(preProfile1)
    setPreProfile2(preProfile2)
    setPostProfile1(postProfile1)
    setPostProfile2(postProfile2)
  }

  return (
    <>
      <Head>
        <title>プロフィール生成アプリ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-800 text-gray-200 p-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center">プロフィール生成アプリ</h1>
        </header>
        <main className="space-y-8">
          <ProfileForm onProfileGenerated={handleProfileGenerated} />
          {conversation && (
            <ProfileDisplay
              name1={name1}
              name2={name2}
              conversation={conversation}
              preProfile1={preProfile1}
              preProfile2={preProfile2}
              postProfile1={postProfile1}
              postProfile2={postProfile2}
            />
          )}
        </main>
        <footer className="mt-8 text-center">
          <p>&copy; 2023 プロフィール生成アプリ</p>
        </footer>
      </div>
    </>
  )
}