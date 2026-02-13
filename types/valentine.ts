export interface ValentineData {
    id: string;
    partnerName: string;
    photos: string[];
    loveMessage: string;
    createdAt: string;
}

export interface CreateValentineInput {
    partnerName: string;
    photos: File[];
    loveMessage: string;
}