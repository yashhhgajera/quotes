import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private blogAPI = "http://localhost:4040/api/blog";
  private commentAPI = "http://localhost:4040/api/comment/";

  constructor(private http:HttpClient) { }

  createBlog(data:any){
    return this.http.post(this.blogAPI,data);
  }
  updateBlog(data:any,id:any){
    return this.http.put(this.blogAPI+`/${id}`,data);
  }
  deleteBlog(id:any){
    return this.http.delete(this.blogAPI+`/${id}`);
  }
  getallBlog(){
    return this.http.get(this.blogAPI);
  }
  getuserBlog(id:any){
    return this.http.get(this.blogAPI+`/${id}`);
  }
  putLike(blogId: any, userId:any){
    return this.http.put(this.blogAPI+`/${blogId}/like`, userId);
  }
  postComment(blogId: any, data: any){
    return this.http.post(this.commentAPI+`${blogId}`, data);
  }
  getAllComment(blogId: any){
    return this.http.get(this.commentAPI+`${blogId}`);
  }
  deleteComment(commentId: any){
    return this.http.delete(this.commentAPI+`${commentId}`)
  }
}
