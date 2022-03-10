import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private blogAPI = "http://localhost:4040/api/blog"

  constructor(private http:HttpClient) { }

  createBlog(data:any){
    return this.http.post<any>(this.blogAPI,data);
  }
  editBlog(data:any,id:any){
    return this.http.put(this.blogAPI+`/${id}`,data);
  }
  deleteBlog(id:any){
    return this.http.delete(this.blogAPI+`${id}`);
  }
  getallBlog(){
    return this.http.get(this.blogAPI);
  }
}
