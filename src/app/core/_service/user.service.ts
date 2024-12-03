import {Injectable } from "@angular/core";
import {Observable, BehaviorSubject} from "rxjs";


import {map, distinctUntilChanged, tap} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user.model";
import {Router} from "@angular/router";

@Injectable({providedIn: "root"})
export class UserService  {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));
  user: User | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.checkAuthOnStartup()
  }

  checkAuthOnStartup(): void {
    const user = this.getUser();
    if (user) {
      this.currentUserSubject.next(user);
    } else {
      this.currentUserSubject.next(null);
    }
  }

  login(username: string, password: string): Observable<User> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const signInRequest = {
      username: username,
      password: password
    };
    const body = JSON.stringify(signInRequest);
    return this.http
      .post<User>("http://localhost:9090/auth/login", body, {headers})
      .pipe(tap(user => this.setAuth(user)));
  }

  register(username: string, password: string): Observable<User> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const signUpRequest = {
      username: username,
      password: password
    };
    const body = JSON.stringify(signUpRequest);
    return this.http
      .post<User>("http://localhost:9090/auth/register", body, {headers})
      .pipe(
        tap(user => this.setAuth(user)),
      );
  }


  logout(): void {
    this.purgeAuth();
    void this.router.navigate(["/"]);
  }

  // ngOnInit() {
  //   let user: User = this.getUser()
  //   user ? this.setAuth(user) : this.router.navigate(["/login"]);
  // }

  setAuth(user: User): void {
    this.saveUser(user);
    this.currentUserSubject.next(user);
  }

  purgeAuth(): void {
    this.destroyUser()
    this.currentUserSubject.next(null);
  }

  saveUser(user: User): void {
    this.user = user
    window.localStorage["user"] = JSON.stringify(user);
  }

  getUser(): User {
    if (window.localStorage["user"]) {
      console.log(this.user)
      this.user = JSON.parse(window.localStorage["user"]);
      console.log(JSON.parse(window.localStorage["user"]))
      return JSON.parse(window.localStorage["user"]);
    }
    console.log(window.localStorage["user"])
    return window.localStorage["user"]

  }

  destroyUser(): void {
    window.localStorage.removeItem("user");
  }
}
