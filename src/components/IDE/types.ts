export type AppFile = {
    name: string;
    content: string;
};

export type ChatMessage = {
    role: 'user' | 'model';
    text: string;
};
