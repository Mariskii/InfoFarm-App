import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterUser, Roles } from '../../interfaces/RegisterUser.interface';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RouterModule,
    PasswordModule,
    FileUploadModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent implements OnInit {

  fb = inject(FormBuilder);

  @Output() nextStepRequest = new EventEmitter<RegisterUser>();

  @Input() userRegister?: RegisterUser;

  registerUserForm?: FormGroup;


  ngOnInit(): void {
    this.registerUserForm = this.fb.group({
      userName: [this.userRegister?.username || '', [Validators.required]],
      email: [this.userRegister?.email || '', [Validators.required, Validators.email]],
      password: [this.userRegister?.password || '', [Validators.required]],
      repeatPassword: [this.userRegister?.password || '', [Validators.required]],
    });
  }

  registerUserData() {

    if(this.registerUserForm!.valid && this.registerUserForm!.get('password')?.value == this.registerUserForm!.get('repeatPassword')?.value) {

      this.userRegister = {
        username: this.registerUserForm!.get('userName')?.value,
        email: this.registerUserForm!.get('email')?.value,
        password: this.registerUserForm!.get('password')?.value,
        roleRequest: [Roles.ADMIN]
      }

      this.nextStepRequest.emit(this.userRegister);
    } else {
      this.markFormGroupAsDirty(this.registerUserForm!)
    }
  }

  markFormGroupAsDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.markAsDirty();
      } else if (control instanceof FormGroup) {
        this.markFormGroupAsDirty(control);
      }
    });
  }
}
