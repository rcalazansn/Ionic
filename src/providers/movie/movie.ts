import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Injectable()
export class MovieProvider {

  private baseAPI: string = "https://api.themoviedb.org/3/";

  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }


  private getApiKey(): string {
    let key = "b248aa1d6a9e33c75bebde792b1bcdfb";
    return `api_key=${key}&language=pt-br`;
  }

  getLastedMovies(page = 1) {
    return this.http.get(this.baseAPI + `movie/popular?page=${page}&` + this.getApiKey());
  }

  getMovie(id) {
    return this.http.get(this.baseAPI + `movie/${id}?` + this.getApiKey());
  }

  getImages(id) {
    return this.http.get(this.baseAPI + `movie/${id}/images?` + this.getApiKey());
  }
}
