import {Component, DestroyRef, inject, OnInit} from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule, FormsModule,
} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {UserService} from "../services/user.service";
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

interface AuthForm {
  password: FormControl<string>;
  username: FormControl<string>;
}

@Component({
  selector: "app-auth-page",
  templateUrl: "./auth.component.html",
  imports: [RouterLink, NgIf, ReactiveFormsModule, FormsModule, NgClass],
  standalone: true,
})
export default class AuthComponent implements OnInit {
  authType = "";
  title = "";
  isSRequestFailed = false;
  authForm: FormGroup<AuthForm>;
  destroyRef = inject(DestroyRef);
  form: any = {
    username: null,
    password: null
  };
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    this.authForm = new FormGroup<AuthForm>({
      username: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  ngOnInit(): void {
    this.authType = this.route.snapshot.url.at(-1)!.path;
    this.title = this.authType === "login" ? "Sign in" : "Sign up";
  }

  onSubmit(): void {
    const {username, password} = this.form;
    let observable =
      this.authType === "login"
        ? this.userService.login(
          username, password
        )
        : this.userService.register(
          username, password
        );
    observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        void this.router.navigate(["/"])
      },
      error: (err) => {
        this.errorMessage = err;
        this.isSRequestFailed = true;
      },
    });
  }

}
