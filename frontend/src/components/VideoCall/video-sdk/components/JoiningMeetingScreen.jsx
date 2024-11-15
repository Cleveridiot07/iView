import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function JoiningMeetingScreen() {
  const [loadingMessage, setLoadingMessage] = useState('Initializing connection...')
  const messages = [
    'Initializing connection...',
    'Checking audio devices...',
    'Verifying video stream...',
    'Syncing with server...',
    'Preparing virtual background...',
    'Almost there...'
  ]

  useEffect(() => {
    let currentIndex = 0
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length
      setLoadingMessage(messages[currentIndex])
    }, 800)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <h2 className="text-2xl font-semibold text-white">Joining Meeting...</h2>
        <p className="text-gray-400 h-6">{loadingMessage}</p>
      </div>
      
      <div className="mt-8 w-full max-w-md">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gay-200 animate-pulse" style={{width: '100%'}}></div>
        </div>
      </div>
      
      <div className="mt-12 text-gray-400 text-sm max-w-md text-center">
        <p>Tip: Ensure you&apos;re in a quiet environment with good lighting for the best meeting experience.</p>
      </div>
    </div>
  )
}