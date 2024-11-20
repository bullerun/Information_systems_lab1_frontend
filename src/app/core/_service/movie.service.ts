import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly apiUrl = 'http://localhost:9090/movie';

  constructor(private http: HttpClient) {
  }

  getMovie(sortDirection: 'asc' | 'desc', sortProperty:'id'|'name'|'goldenPalmCount'|'genre'|'length'|'coordinates'|'mpaaRating'|'owner_id'|'budget'|'oscarsCount'|'director'|'operator', page: number, pageSize: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}?sortDirection=${sortDirection}&sortProperty=${sortProperty}&page=${page}&pageSize=${pageSize}`)
  }

  editMovie(movieToEdit: Movie) {
    console.log(movieToEdit);
    console.log(`${this.apiUrl}/edit?id=${movieToEdit.id}`);
    return this.http.patch(`${this.apiUrl}/edit/${movieToEdit.id}`, movieToEdit)

  }

  addMovie(movie: Movie) {
    console.log(movie);
    console.log(`${this.apiUrl}`);
    return this.http.post(`${this.apiUrl}/add`, movie)
  }

}
