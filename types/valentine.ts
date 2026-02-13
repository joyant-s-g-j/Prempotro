export interface ValentineData {
    id: string;
    partnerName: string;
    photos: string[];
    loveMessage: string;
    createdAt: Date;
}

export interface CreateValentineInput {
    partnerName: string;
    photos: File[];
    loveMessage: string;
}