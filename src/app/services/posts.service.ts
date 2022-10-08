import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PostModel } from '../models/post.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
  }),
};

@Injectable()
export class PostsService {
  private postsUrl: string = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.postsUrl}/${id}`);
  }

  getPosts(page?: number, size?: number): Observable<any> {
    return this.http.get<PostModel[]>(
      `${this.postsUrl}?_sort=title&_page=${page}&_size=${size}`,
      {
        observe: 'response',
      }
    );
  }
}
