import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<any>();
  @Input() movie = new EventEmitter<Movie>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.movie) {
      this.populateForm(this.movie); // Заполнить форму, если объект передан
    }
  }
  populateForm(movie: any): void {
    movie.director_id = movie.director.id;
    movie.screenwriter_id = movie.screenwriter.id;
    movie.operator_id = movie.operator.id;
    this.movieForm.patchValue(movie); // Заполнить форму значениями из объекта
  }

  initializeForm(): void {
    this.movieForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      coordinates: this.fb.group({
        x: [0, Validators.required],
        y: [0, Validators.required],
      }),
      oscarsCount: [0, [Validators.required, Validators.min(0)]],
      budget: [0, [Validators.required, Validators.min(0)]],
      totalBoxOffice: [0, [Validators.required, Validators.min(0)]],
      mpaaRating: [null, Validators.required],
      genre: [null, Validators.required],
      director_id: [null, Validators.required],
      // newDirector: this.fb.group({
      //   name: [''],
      //   eyeColor: [''],
      //   hairColor: [''],
      //   weight: [0],
      //   location: this.fb.group({
      //     name: [''],
      //     x: [0],
      //     y: [0],
      //   }),
      //   nationality: [''],
      // }),
      screenwriter_id: [null],
      operator_id: [null, Validators.required],
      length: [0, [Validators.required, Validators.min(0)]],
      goldenPalmCount: [0, [Validators.required, Validators.min(0)]],
    });
  }

  submitForm(): void {
    if (this.movieForm.invalid) {
      alert("Какие-то поля заполнены некорректно");
      return;
    }


    this.saveChanges.emit(this.movieForm.value);
    this.closeEditModal();
  }

  closeEditModal(): void {
    this.closeModal.emit();
  }


}
