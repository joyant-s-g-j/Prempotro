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

    if (!name.trim()) return setError("অনুগ্রহ করে আপনার নাম লিখুন")
    if (!partnerName.trim()) return setError("অনুগ্রহ করে আপনার প্রিয়জনের নাম লিখুন")
    if (!loveMessage.trim()) return setError("অনুগ্রহ করে আপনার ভালোবাসার বার্তাটি লিখুন")

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
        setError("কিছু ভুল হয়েছে। দয়া করে আবার চেষ্টা করুন।");
        setIsSubmitting(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className='space-y-8'>

        <Input 
            label="আপনার নাম"
            type='text'
            placeholder="আপনার নাম লিখুন..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={50}
        />

        <Input 
            label="আপনার প্রিয়জনের নাম"
            type='text'
            placeholder="আপনার প্রিয়জনের নাম লিখুন..."
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            required
            maxLength={50}
        />

        <PhotoUpload 
            label="ছবি আপলোড করুন"
            files={photos}
            previews={photosPreviews}
            onFilesChange={handleFilesChange}
            onRemove={handleRemovePhoto}
        />

        <Textarea 
            label="আপনার ভালোবাসার বার্তা"
            placeholder="আপনার হৃদয়ের সবটুকু ভালোবাসা দিয়ে লিখুন... 💕"
            value={loveMessage}
            onChange={(e) => setLoveMessage(e.target.value)}
            required
            rows={6}
            maxLength={12000}
        />

        {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center font-trio font-medium animate-shake">
            {error}
            </div>
        )}

        <Button 
            type="submit" 
            fullWidth 
            isLoading={isSubmitting}
        >
            ✨ প্রেমপত্র তৈরি করুন
        </Button>

        <p className="text-center text-gray-500 text-lg font-trio">
            আপনার প্রেমপত্রটি কয়েক সেকেন্ডের মধ্যেই তৈরি হয়ে যাবে!
        </p>
    </form>
  )
}

export default Form