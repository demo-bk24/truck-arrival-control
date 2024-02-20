import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  images: string[] = [];
  sending = false;
  errorMsg = '';
  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.maxLength(20)]],
    admin: [true],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {}

  public loadBackgroundImage() {
    this.images = ['bg1'];
    const img = this.images[Math.floor(Math.random() * this.images.length)];
    return {
      background: `url(assets/images/${img}.png) no-repeat center center fixed`,
    };
  }

  public login() {
    this.sending = true;
    this.authService.login(this.form.value).subscribe(
      (res) => {
        this.toastrService.show(
          `Bienvenido ${res.user.firstName}: Iniciaste sessión correctamente`,
          `Bienvenido`,
          { status: 'success' }
        );
        this.router.navigateByUrl('/pages');
      },
      (err: any) => {
        const errorMsg = err.error.error;
        this.toastrService.show(errorMsg, `Error`, { status: 'danger' });
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  public isValid(field: string) {
    return this.f[field].touched && this.f[field].valid;
  }

  public isInvalid(field: string) {
    return this.f[field].touched && this.f[field].invalid;
  }
}
