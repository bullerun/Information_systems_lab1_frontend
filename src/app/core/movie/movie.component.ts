import {Component, inject, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {IfAuthenticatedDirective} from "../../shared/directives/if-authenticated.directive";
import {User} from "../models/user.model";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  imports: [
    RouterLinkActive,
    RouterLink,
    AsyncPipe,
    NgIf,
    IfAuthenticatedDirective,
  ],
  standalone: true,
})
export class MovieComponent implements OnInit {
  sortDirection: 'asc' | 'desc' = 'asc';
  sortProperty: 'id' | 'name' | 'eyeColor' | 'hairColor' | 'location' | 'weight' | 'nationality' | 'owner_id' = 'id';
  page = 0;
  pageSize: 5 | 10 | 25 = 10;



  constructor(
    private readonly userService: UserService,
  ) {
  }

  ngOnInit(): void {

  }

  logout(): void {
    this.userService.logout();
  }
}
