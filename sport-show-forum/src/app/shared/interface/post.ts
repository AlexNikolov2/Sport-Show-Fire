import { User } from "./user";
import { Comment } from "./comment";

export interface Post {
    keyword: string;
    title: string;
    content: string;
    _id: string;
    user: User;
    img?: string;
    likes: string[];
    comments: Comment[];
    created_at: string;
    updatedAt: string;
}
