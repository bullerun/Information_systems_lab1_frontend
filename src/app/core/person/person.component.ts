import {Component, OnInit} from '@angular/core';
import {PersonService} from '../_service/person.service';
import {Color, Country, Person} from '../models/person.model';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {UserService} from '../_service/user.service';
import {IfAuthenticatedDirective} from '../../shared/directives/if-authenticated.directive';

@Component({
  selector: 'app-person-table',
  templateUrl: './person.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    IfAuthenticatedDirective
  ],
  styleUrls: ["./edit.css"]
})
export class PersonComponent implements OnInit {
  persons: Person[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  sortProperty: 'id' | 'name' | 'eyeColor' | 'hairColor' | 'location' | 'weight' | 'nationality' | 'owner_id' = 'id';
  page = 0;
  pageSize: 5 | 10 | 25 = 10;
  personToEdit: any = null;
  isEditModalOpen = false;
  colors = Object.values(Color);
  countries = Object.values(Country);
  defaultPerson: Person = JSON.parse(JSON.stringify({
    "eyeColor": "BLACK",
    "nationality": "SPAIN",
    "name": "",
    "weight": 1,
    "location": {
      "name": "123",
      "x": 1,
      "y": 1
    },
    "hairColor": "RED"
  }));

  decrementPage() {
    this.page -= this.page > 0 ? 1 : 0;
    this.fetchPersons();
  }

  incrementPage() {
    this.page += 1;
    this.fetchPersons();
  }

  constructor(private personService: PersonService, protected userService: UserService) {
  }

  ngOnInit(): void {
    this.fetchPersons();
  }

  fetchPersons(): void {
    this.personService.getPersons(this.sortDirection, this.sortProperty, this.page, this.pageSize)
      .subscribe({
        next: (data) => {
          this.persons = data;
        },
        error: (err) => {
          alert(err["error"]["error"]);
        }
      });
  }

  openEditModal(person: Person): void {
    this.personToEdit = {...person}
    this.isEditModalOpen = true;
  }

  addPerson(): void {
    this.personToEdit = this.defaultPerson
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.personToEdit = null;
    this.isEditModalOpen = false;
  }

  saveChanges(): void {
    if (this.personToEdit.id) {
      const index = this.persons.findIndex((p) => p.id === this.personToEdit.id);
      if (index !== -1) {
        this.personService.editPerson(this.personToEdit).subscribe({
          next:
            this.persons[index] = {...this.personToEdit},
          error: (err) => {
            console.error(err);
            // TODO: Сделать встраивание ошибки
            alert(err.error.weight);
          },
        });
      }
    } else {
      this.personService.addPerson(this.personToEdit).subscribe({
        next: () => {
          this.fetchPersons();
        },
        error: (err) => {
          console.error(err);
          alert(err.error.weight);
        },
      });
    }

    this.closeEditModal();
  }

  deletePerson(person: Person) {
    this.personService.deletePerson(person.id).subscribe(
      {
        next: () => {
          this.fetchPersons();
        },
        error: (err) => {
          console.error(err);
          alert(err.error.weight);
        },
      }
    )
  }
}
