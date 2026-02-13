import { localDB } from "@/lib/db";
import { CreateValentineInput, ValentineData } from "./valentine";

function generateId(): string {
    return `prempotro_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

async function compressImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image()
            img.src = event.target?.result as string
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')

                const MAX_WIDTH = 1200
                const MAX_HEIGHT = 1200
                let width = img.width
                let height = img.height

                if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
                } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
                }

                canvas.width = width;
                canvas.height = height;

                ctx?.drawImage(img, 0, 0, width, height)
                resolve(canvas.toDataURL('image/jpeg', 0.6))
            }
            img.onerror = reject
        }
        reader.onerror = reject
    })
}

export async function createValentine(input: CreateValentineInput): Promise<ValentineData> {
    const id = generateId()

    const photoUrls = await Promise.all(
        input.photos.map(file => compressImage(file))
    )
    const valentineData: ValentineData = {
        id,
        name: input.name,
        partnerName: input.partnerName,
        photos: photoUrls,
        loveMessage: input.loveMessage,
        createdAt: new Date()
    };

    try {
        await localDB.save(id, valentineData)
    } catch (error) {
        console.error('Failed to save valentine data:', error)
        throw new Error('Storage limit exceeded or permission denied')
    }

    return valentineData
}

export async function getValentine(id:string): Promise<ValentineData | null> {
    try {
        const data = await localDB.get(id)
        if(!data) return null;
        return {
            ...data,
            createdAt: new Date(data.createdAt)
        }
    } catch (error) {
        console.error('Error retrieving valentine:', error);
        return null;
    }
}

export async function deleteValentine(id:string): Promise<void> {
    console.log('Delete not implemented for localDB wrapper yet')    
}