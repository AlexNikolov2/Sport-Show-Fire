import { Post } from "./post";

export interface Comment {
    id: string;
    userId: string;
    content: string;  
    created_at: any ;
    user: string
}
