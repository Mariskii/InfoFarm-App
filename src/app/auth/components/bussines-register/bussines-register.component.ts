import { Component, EventEmitter, inject, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FileUploadModule } from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-bussines-register',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    FileUploadModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  templateUrl: './bussines-register.component.html',
  styleUrl: './bussines-register.component.scss'
})
export class BussinesRegisterComponent {
  fb = inject(FormBuilder);

  @Output() previousStepRequest = new EventEmitter<string>();

  public registerUserForm: FormGroup = this.fb.group({
    bussinesName: ['',[Validators.required]],
  });

  goBack() {
    this.previousStepRequest.emit('');
  }
}
