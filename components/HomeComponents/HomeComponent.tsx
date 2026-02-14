import Header from './Header'
import { FloatingHearts, GlassCard } from '../ui'
import Form from './Form'
import Link from 'next/link'

const HomeComponent = () => {
  return (
    <main className="min-h-dvh relative flex flex-col justify-center items-center overflow-x-hidden vintage-paper">
      <div className="fixed inset-0 vintage-vignette -z-10" />
      <FloatingHearts count={12} />

      <div className="fixed -top-50 -right-25 w-125 h-125 rounded-full bg-linear-to-br from-orange-200/20 to-rose-200/10 blur-3xl pointer-events-none" />
      <div className="fixed -bottom-50 -left-25 w-125 h-125 rounded-full bg-linear-to-tr from-rose-200/20 to-orange-200/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-12 md:py-10">
        <Header />

        <GlassCard className="p-8 md:p-12 animate-fade-in-up vintage-card" style={{ animationDelay: '0.4s' }}>
          <Form />
        </GlassCard>

        <footer className="text-center mt-12 text-[#5c4d3c] text-sm font-medium animate-fade-in space-y-2" style={{ animationDelay: '0.8s' }}>
          <p>Made with 💕 for lovers. Made by{' '}
          <a href="https://www.joyantsgj.dev" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[#2c1810] transition-colors">
            Joyant
          </a></p>
          <p className="opacity-60">
            <Link href="/privacy" className="hover:underline transition-all">গোপনীয়তা নীতিমালা (Privacy Policy)</Link>
          </p>
        </footer>
      </div>
    </main>
  )
}

export default HomeComponent