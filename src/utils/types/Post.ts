import User from "./User";

export default interface Post {
  message: string;
  author: string;
  user: User;
  createdAt: string;
  postId:string;
}
