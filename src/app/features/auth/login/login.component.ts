import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import {AuthService} from "../../../core/service/auth.service";
import {MatProgressButtonOptions} from "mat-progress-buttons";

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  error = "";

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private authService: AuthService
  ) {}

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: "Login",
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: "primary",
    spinnerColor: "accent",
    fullWidth: false,
    disabled: false,
    mode: "indeterminate",
    buttonIcon: {
      fontIcon: "favorite",
    },
  };

  ngOnInit() {
    this.form = this.fb.group({
      username: ["test2@test.com", Validators.required],
      password: ["12345", Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  send() {
    this.submitted = true;
    this.spinnerButtonOptions.active = true;
    this.error = "";

    if (this.form.invalid) {
      this.error = "Username or password not valid!";
      return;
    } else {
      this.authService.login(this.f.username.value, this.f.password.value).subscribe(
          (res) => {
            console.log("res:: = " + res);

            if (res) {
              setTimeout(()=> {
                const role = this.authService.currentUserValue.roles;
                console.log("login roles :: = " + role);

                this.router.navigate(['/']);
                this.spinnerButtonOptions.active = false;
              }, 1000);

            } else {
              this.error = "Invalid error";
            }
          }, (error1) => {
            // this.router.navigate(['/']);

            this.error = "Login or password is incorrect!!!"
            this.submitted = false;
            this.spinnerButtonOptions.active = false;
          }
      );
    }
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
