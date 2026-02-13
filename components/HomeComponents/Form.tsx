"use client"
import React, { useCallback, useState } from 'react'
import { Button, Input, PhotoUpload, Textarea } from '../ui'
import { createValentine } from '@/types/valentine-service'
import { useRouter } from 'next/navigation'

const Form = () => {
  const router = useRouter()
  const [name, setName] = useState("")
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

    if (!name.trim()) return setError("Please enter your name")
    if (!partnerName.trim()) return setError("Please enter your partner's name")
    if (!loveMessage.trim()) return setError("Please write your love message")

    setIsSubmitting(true)
    setError(null)

    try {
        const valentine = await createValentine({
            name: name.trim(),
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
    <form onSubmit={handleSubmit} className='space-y-8'>

        <Input 
            label="Your Name"
            type='text'
            placeholder="Enter their your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={50}
        />

        <Input 
            label="Your Partner's Name"
            type='text'
            placeholder="Enter their your partner's name..."
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            required
            maxLength={50}
        />

        <PhotoUpload 
            label="Upload Photos (Optional, max 5)"
            files={photos}
            previews={photosPreviews}
            onFilesChange={handleFilesChange}
            onRemove={handleRemovePhoto}
        />

        <Textarea 
            label="Your Love Message"
            placeholder="Pour your heart out... Write what they mean to you 💕"
            value={loveMessage}
            onChange={(e) => setLoveMessage(e.target.value)}
            required
            rows={6}
            maxLength={2000}
        />

        {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center font-medium animate-shake">
            {error}
            </div>
        )}

        <Button 
            type="submit" 
            fullWidth 
            isLoading={isSubmitting}
        >
            ✨ Generate Letter
        </Button>

        <p className="text-center text-gray-500 text-sm font-medium">
            Your letter will be ready to share in seconds!
        </p>
    </form>
  )
}

export default Form