import { Component, inject } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { LoginUser } from '../../interfaces/LoginUser';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterModule,
    PasswordModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  failedLogin:boolean = false;

  formLogin = this.fb.group({
      userName: ['',[Validators.required]],
      password: ['',[Validators.required]],
  });


  login() {
    if(this.formLogin.valid) {

      const user: LoginUser = {
        username: this.formLogin.get('userName')!.value!,
        password: this.formLogin.get('password')!.value!,
      }

      this.authService.login(user).pipe(
        catchError(error => {
          this.failedLogin = true;
          return of(error);
      })
      )
      .subscribe(res => {
        this.failedLogin = false;

        if(res.status === 'success') {
          localStorage.setItem('accessToken',res.accessToken);
          this.router.navigate(['/dashboard']);
        } else {
          this.failedLogin = true;
        }
      });
    } else {
      this.formLogin.get('userName')?.markAsDirty();
      this.formLogin.get('password')?.markAsDirty();
    }
  }

}
