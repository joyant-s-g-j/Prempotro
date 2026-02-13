import { FloatingHearts } from '@/components/ui'
import Link from 'next/link'

const NotFound = () => {
  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background */}
      <div className="fixed inset-0 bg-linear-to-br from-pink-50 via-rose-50 to-pink-100 -z-10" />
      
      {/* Floating Hearts */}
      <FloatingHearts count={10} />

      {/* Decorative Blobs */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-linear-to-br from-pink-200/40 to-rose-300/40 rounded-full blur-3xl -z-5" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-rose-200/40 to-pink-300/40 rounded-full blur-3xl -z-5" />

      <div className="text-center max-w-md glass p-10 z-10">
        <div className="text-7xl mb-6">💔</div>
        
        <h1 className="text-4xl font-bold text-rose-700 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg text-rose-600/80 mb-8">
          This surprise seems to have flown away with the butterflies...
        </p>
        
        <Link href="/" className="btn-romantic inline-block">
          💕 Create a Letter
        </Link>
        
        <p className="mt-6 text-sm text-rose-500/60">
          Or maybe the link was typed incorrectly?
        </p>
      </div>
    </main>
  )
}

export default NotFound