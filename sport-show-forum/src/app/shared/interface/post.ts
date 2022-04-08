import { User } from "./user";
import { Comment } from "./comment";

export interface Post {
    id?: string;
    keyword?: string;
    title?: string;
    image?: string;
    description?: string;
    userId?: string;
    likes?: string[];
    comments?: Comment[];
    created_at?: any;
}
