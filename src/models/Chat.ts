export type Sender = 'user' | 'assistant' | 'system';

export interface ChatMessage {
    id: string;
    sender: Sender;
    text: string;
    createdAt: string; // ISO string for consistency
}

export interface ChatOption {
    id: string;
    label: string;
}