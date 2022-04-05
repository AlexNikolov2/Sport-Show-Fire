import { Post } from "./post";

export interface Comment {
    _id: string;
    username: string;
    content: string;
    likes: string[];
    postId: Post;
    created_at: string;
}
