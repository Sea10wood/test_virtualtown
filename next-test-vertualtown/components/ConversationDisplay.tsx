import React from 'react'

interface ConversationDisplayProps {
  name1: string
  name2: string
  conversation: string
}

const ConversationDisplay: React.FC<ConversationDisplayProps> = ({ name1, name2, conversation }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">対談結果</h2>
      <div className="bg-gray-700 p-4 rounded-lg space-y-4">
        {conversation.split('\n').map((line, index) => {
          const isName1 = line.startsWith(name1)
          return (
            <div key={index} className={`p-2 rounded ${isName1 ? 'bg-gray-800 text-left' : 'bg-gray-600 text-right'}`}>
              <strong>{isName1 ? name1 : name2}:</strong> {line.replace(`${isName1 ? name1 : name2}:`, '').trim()}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ConversationDisplay