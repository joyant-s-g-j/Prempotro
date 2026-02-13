export interface ValentineData {
    id: string;
    name: string;
    partnerName: string;
    photos: string[];
    loveMessage: string;
    createdAt: Date;
}

export interface CreateValentineInput {
    name: string;
    partnerName: string;
    photos: File[];
    loveMessage: string;
}