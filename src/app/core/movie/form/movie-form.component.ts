import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Movie, MovieGenre, MpaaRating} from '../../models/movie';
import {Person} from '../../models/person.model';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  standalone: true,
  styleUrls: ["form.css"]
})
export class MovieFormComponent implements OnInit {
  movieForm!: FormGroup;
  genres = Object.values(MovieGenre);
  ratings = Object.values(MpaaRating);

  existingPersons: Person[] = [
    { id: 1, name: 'John Doe', eyeColor: 'BLUE', hairColor: 'BLACK', weight: 75, location: { name: 'Paris', x: 48.8566, y: 2.3522 }, nationality: 'France', owner_id: 123 },
    { id: 2, name: 'Jane Smith', eyeColor: 'GREEN', hairColor: 'BROWN', weight: 65, location: { name: 'Berlin', x: 52.52, y: 13.405 }, nationality: 'Germany', owner_id: 123 },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.movieForm = this.fb.group({
      name: ['', Validators.required],
      coordinates: this.fb.group({
        x: [0, Validators.required],
        y: [0, Validators.required],
      }),
      creationDate: [new Date(), Validators.required],
      oscarsCount: [0, [Validators.required, Validators.min(0)]],
      budget: [0, [Validators.required, Validators.min(0)]],
      totalBoxOffice: [0, [Validators.required, Validators.min(0)]],
      mpaaRating: [null, Validators.required],
      genre: [null, Validators.required],
      directorId: [null],
      newDirector: this.fb.group({
        name: [''],
        eyeColor: [''],
        hairColor: [''],
        weight: [0],
        location: this.fb.group({
          name: [''],
          x: [0],
          y: [0],
        }),
        nationality: [''],
      }),
      screenwriterId: [null],
      operatorId: [null],
      length: [0, [Validators.required, Validators.min(0)]],
      goldenPalmCount: [0, [Validators.required, Validators.min(0)]],
    });
  }

  submitForm(): void {
    if (this.movieForm.invalid) {
      alert('Форма заполнена некорректно!');
      return;
    }

    const formValue = this.movieForm.value;

    const newMovie: Movie = {
      ...formValue,
      director: formValue.directorId
        ? this.existingPersons.find(person => person.id === formValue.directorId)
        : formValue.newDirector,
    };

    console.log('Создан фильм:', newMovie);
    alert('Фильм успешно создан!');
  }
}
