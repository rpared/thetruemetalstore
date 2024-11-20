import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IReview {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}



@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private url: string = 'https://jsonplaceholder.typicode.com/comments';
  constructor(private http: HttpClient) {}
  //http = Inject(HttpClient)

  getReviews(): Observable<IReview[]> {
    return this.http.get<IReview[]>(this.url);
  }
  deleteReview(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
