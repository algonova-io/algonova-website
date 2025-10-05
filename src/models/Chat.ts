export type Role = 'user' | 'model';

export interface ChatMessage {
    id:string;
    role: Role;
    content: string;
    createdAt: number;
}

export interface ChatOption {
    id: string;
    label: string;
}