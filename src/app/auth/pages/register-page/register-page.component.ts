import { Component } from '@angular/core';
import { UserRegisterComponent } from '../../components/user-register/user-register.component';
import { BussinesRegisterComponent } from '../../components/bussines-register/bussines-register.component';
import { RegisterUser } from '../../interfaces/RegisterUser.interface';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    UserRegisterComponent,
    BussinesRegisterComponent,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  formStep: number = 0;
  userInfo?: RegisterUser;

  onNextStep(userData:RegisterUser) {
    this.formStep = this.formStep + 1;

    this.userInfo = userData;
  }

  onPreviousStep() {
    this.formStep = this.formStep - 1
  }
}
