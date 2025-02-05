interface ProfileDisplayProps {
  name1: string
  name2: string
  conversation: string
  preProfile1: string
  preProfile2: string
  postProfile1: string
  postProfile2: string
}

const ProfileDisplay = ({ name1, name2, conversation, preProfile1, preProfile2, postProfile1, postProfile2 }: ProfileDisplayProps) => {
  const handleSave = async (type: string) => {
    await fetch('/api/saveProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: `${name1}_${name2}`, profile: type === 'before' ? `${preProfile1}\n\n${preProfile2}` : `${postProfile1}\n\n${postProfile2}`, type }),
    })
  }

  return (
    <div className="mt-8 text-center">
      <h2 className="text-2xl font-bold">対談前のプロフィール</h2>
      <pre className="mt-4 p-4 text-left bg-gray-800 text-white rounded-md whitespace-pre-wrap max-w-2xl mx-auto">
        {name1}のプロフィール: {preProfile1}
      </pre>
      <pre className="mt-4 p-4 text-left bg-gray-800 text-white rounded-md whitespace-pre-wrap max-w-2xl mx-auto">
        {name2}のプロフィール: {preProfile2}
      </pre>
      <h2 className="text-2xl font-bold mt-8">生成された対話</h2>
      <pre className="mt-4 p-4 text-left bg-gray-800 text-white rounded-md whitespace-pre-wrap max-w-2xl mx-auto">
        {conversation}
      </pre>
      <h2 className="text-2xl font-bold mt-8">対談後のプロフィール</h2>
      <pre className="mt-4 p-4 text-left bg-gray-800 text-white rounded-md whitespace-pre-wrap max-w-2xl mx-auto">
        {name1}のプロフィール: {postProfile1}
      </pre>
      <pre className="mt-4 p-4 text-left bg-gray-800 text-white rounded-md whitespace-pre-wrap max-w-2xl mx-auto">
        {name2}のプロフィール: {postProfile2}
      </pre>
      <div className="mt-4">
        <button
          onClick={() => handleSave('before')}
          className="m-2 p-2 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          対談前のプロフィールを保存
        </button>
        <button
          onClick={() => handleSave('after')}
          className="m-2 p-2 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          対談後のプロフィールを保存
        </button>
      </div>
    </div>
  )
}

export default ProfileDisplay