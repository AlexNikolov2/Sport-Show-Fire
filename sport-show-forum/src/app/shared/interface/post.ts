import { User } from "./user";
import { Comment } from "./comment";

export interface Post {
    id?: string;
    keyword?: string;
    title?: string;
    content?: string;
    img?: string;
    user?: User;
    likes?: string[];
    comments?: Comment[];
    created_at?: string;
    updated_at?: string;
}
