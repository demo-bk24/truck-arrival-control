import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.form.invalid) return;
    this.loading = true;
    this.authService.login(this.form.value).subscribe(
      ({ user }) => {
        this.setRole(user);
      },
      (err) => {
        this.loading = false;
        this.toastrService.error(err.error.error, 'Error');
      }
    );
  }

  setRole(user: any) {
    const {
      isDriver,
      isControl,
      isAssistant,
      isOperator,
      isSorter,
      isPicking,
    } = user;
    if (isDriver) {
      this.router.navigateByUrl('control/driver');
      this.saveRoute('control/driver');
    } else if (isControl) {
      this.router.navigateByUrl('control/control');
      this.saveRoute('control/control');
    } else if (isAssistant) {
      this.router.navigateByUrl('control/warehouse');
      this.saveRoute('control/warehouse');
    } else if (isOperator) {
      this.router.navigateByUrl('control/lift');
      this.saveRoute('control/lift');
    }
  }

  saveRoute(route: string) {
    localStorage.setItem('route', route);
  }
}
