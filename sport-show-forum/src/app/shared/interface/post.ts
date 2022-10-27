import { User } from "./user";
import { Comment } from "./comment";

export interface Post {
    id: string;
    title: string;
    image: string;
    description: string;
    userId: string | null;
    likes: string[];
    comments: Comment[];
    created_at: any;
    user: User;
}
