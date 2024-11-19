import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Person} from '../models/person.model';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly apiUrl = 'http://localhost:9090/person';

  constructor(private http: HttpClient) {
  }

  getPersons(sortDirection: 'asc' | 'desc', sortProperty: 'id' | 'name' | 'eyeColor' | 'hairColor' | 'location' | 'weight' | 'nationality' | 'owner_id', page: number, pageSize: number): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrl}?sortDirection=${sortDirection}&sortProperty=${sortProperty}&page=${page}&pageSize=${pageSize}`)
  }

  editPerson(personToEdit: Person) {
    console.log(personToEdit);
    console.log(`${this.apiUrl}/edit?id=${personToEdit.id}`);
    return this.http.patch(`${this.apiUrl}/edit?id=${personToEdit.id}`, personToEdit)

  }

  addPerson(person: Person) {
    console.log(person);
    console.log(`${this.apiUrl}`);
    return this.http.post(`${this.apiUrl}/add`, person)
  }
}
