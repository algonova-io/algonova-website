export type Sender = 'user' | 'model';

export interface ChatMessage {
    sender: Sender;
    content: string;
    createdAt: number; // ISO string for consistency
}

export interface ChatOption {
    id: string;
    label: string;
}