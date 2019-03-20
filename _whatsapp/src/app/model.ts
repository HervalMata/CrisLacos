export interface ChatGroup {
    id?: number;
    name: string;
    photo: File;
    photo_url: string;
    readonly created_at?: {date: string};
    readonly updated_at?: {date: string};
}