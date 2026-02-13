"use client"
import { createValentine } from '@/types/valentine-service'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import FloatingHearts from '../FloatingHearts'
import Header from './Header'

const HomeComponent = () => {
  const router = useRouter()

  const [partnerName, setPartnerName] = useState("")
  const [photos, setPhotos] = useState<File[]>([])
  const [photosPreviews, setPhotosPreviews] = useState<string[]>([])
  const [loveMessage, setLoveMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFilesChange = useCallback((newFiles: File[]) => {
    const validFiles = newFiles.filter(file => file.size <= 10 * 1024 * 1024)
    if (validFiles.length < newFiles.length) setError("Some files were skipped (max 10MB each)")
    else setError(null)

    const totalFiles = [...photos, ...validFiles].slice(0, 5)
    setPhotos(totalFiles)

    validFiles.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => setPhotosPreviews(prev => [...prev, e.target?.result as string])
        reader.readAsDataURL(file)
    })
  }, [photos])

  const handleRemovePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
    setPhotosPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!partnerName.trim()) return setError("Please enter your partner's name")
    if (!loveMessage.trim()) return setError("Please write your love message")

    setIsSubmitting(true)
    setError(null)

    try {
        const valentine = await createValentine({
            partnerName: partnerName.trim(),
            photos,
            loveMessage: loveMessage.trim()
        })
        router.push(`/success/${valentine.id}`)
    } catch (err) {
        console.error("Error creating valentine:", err);
        setError("Something went wrong. Please try again.");
        setIsSubmitting(false);
    }
  }
  return (
    <main className="min-h-dvh relative flex flex-col justify-center items-center overflow-x-hidden vintage-paper">
      <div className="fixed inset-0 vintage-vignette -z-10" />
      <FloatingHearts count={12} />

      <div className="fixed -top-50 -right-25 w-125 h-125 rounded-full bg-linear-to-br from-orange-200/20 to-rose-200/10 blur-3xl pointer-events-none" />
      <div className="fixed -bottom-50 -left-25 w-125 h-125 rounded-full bg-linear-to-tr from-rose-200/20 to-orange-200/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-12 md:py-10">
        <Header />
      </div>
    </main>
  )
}

export default HomeComponent