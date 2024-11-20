import {Component, OnInit} from "@angular/core";
import {UserService} from "../_service/user.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {IfAuthenticatedDirective} from "../../shared/directives/if-authenticated.directive";
import {MovieService} from '../_service/movie.service';
import {Person} from '../models/person.model';
import {Movie} from '../models/movie';
import {FormsModule} from '@angular/forms';
import {MovieFormComponent} from './form/movie-form.component';


@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  imports: [
    RouterLinkActive,
    RouterLink,
    AsyncPipe,
    NgIf,
    IfAuthenticatedDirective,
    FormsModule,
    NgForOf,
    MovieFormComponent,
  ],
  standalone: true,
  styleUrls: ["./edit.css"]
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  sortProperty: 'id' | 'name' | 'goldenPalmCount' | 'genre' | 'length' | 'coordinates' | 'mpaaRating' | 'owner_id' | 'budget' | 'oscarsCount' | 'director' | 'operator' = 'id';
  page = 0;
  pageSize: 5 | 10 | 25 = 10
  isShow = false;
  personToShow: any = null;
  isAdd = false

  constructor(
    protected readonly userService: UserService,
    private readonly movieService: MovieService,
  ) {
  }

  ngOnInit(): void {
    this.fetchMovie()
  }


  fetchMovie(): void {
    this.movieService.getMovie(this.sortDirection, this.sortProperty, this.page, this.pageSize)
      .subscribe({
        next: (data) => {
          this.movies = data;
        },
        error: (err) => {
          alert(err["error"]["error"]);
        }
      });
  }

  openEditModal(movie: Movie) {

  }

  decrementPage() {
    this.page -= this.page > 0 ? 1 : 0;
    this.fetchMovie();
  }

  incrementPage() {
    this.page += 1;
    this.fetchMovie();
  }

  addMovie() {
    this.isAdd = true;
  }

  showPerson(person: Person): void {
    this.isShow = true
    this.personToShow = person
  }

  closeShow() {
    this.isShow = false;
  }
}
