import React, { useState } from 'react'
import DocAssistant from './components/DocAssistant'
import LlamaDocAssistant from './components/LlamaDocAssistant'

function App() {
  const [useLocal, setUseLocal] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto mb-4">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">AI Document Assistant Demo</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Using: {useLocal ? 'Local Llama' : 'ChatGPT'}</span>
            <button
              onClick={() => setUseLocal(!useLocal)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Switch to {useLocal ? 'ChatGPT' : 'Local Llama'}
            </button>
          </div>
        </div>
      </div>
      
      {useLocal ? <LlamaDocAssistant /> : <DocAssistant />}
    </div>
  )
}

export default App
