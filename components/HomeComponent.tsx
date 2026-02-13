import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'

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
  return (
    <div>HomeComponent</div>
  )
}

export default HomeComponent