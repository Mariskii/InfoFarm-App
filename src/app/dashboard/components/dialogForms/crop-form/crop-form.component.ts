import { Component, EventEmitter, inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Crop } from '../../../interfaces/Crop/Crop.interface';
import { FileUploadModule } from 'primeng/fileupload';
import { CreateCrop } from '../../../interfaces/Crop/CreateCrop.interface';
import { UpdateCrop } from '../../../interfaces/Crop/UpdateCrop.interface';

@Component({
  selector: 'app-crop-form',
  standalone: true,
  imports: [
    ButtonModule,
    FloatLabelModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  templateUrl: './crop-form.component.html',
  styleUrl: './crop-form.component.scss'
})
export class CropFormComponent {

  @ViewChild('fileUpload') fileUpload: any;

  @Input() cropToEdit?: Crop;

  @Output() sendCreateData = new EventEmitter<CreateCrop>();
  @Output() sendEditData = new EventEmitter<UpdateCrop>();

  fb = inject(FormBuilder);

  cropImage?: File;

  formCrop = this.fb.group({
    cropName: ['', [Validators.required]],
    description: ['']
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cropToEdit'] && this.cropToEdit) {
      this.formCrop.patchValue({
        cropName: this.cropToEdit.cropName,
        description: this.cropToEdit.cropDescription
      });
    }
  }

  onSelect(event: any) {
    this.cropImage = event.files[0];
  }

  clearUpload() {
    this.fileUpload.clear();
    this.cropImage = undefined;
  }

  completeCrop() {
    if(this.formCrop.valid) {

      if(!this.cropToEdit) {
        const newCrop: CreateCrop = {
          crop: {
            cropName: this.formCrop.get('cropName')!.value!,
            cropDescription: this.formCrop.get('description')!.value!,
          },
          file: this.cropImage
        }

        this.sendCreateData.emit(newCrop);
      } else {
        const updateCrop: UpdateCrop = {
          crop:{
            id: this.cropToEdit.id,
            cropName: this.formCrop.get('cropName')!.value!,
            cropDescription: this.formCrop.get('description')!.value!,
            cropImage: this.cropToEdit.cropImage
          },
          cropImage: this.cropImage
        }

        this.cropToEdit = undefined;

        this.sendEditData.emit(updateCrop);
      }

      this.clearUpload();
    }
  }

  resetForm() {
    this.formCrop.reset();
    this.clearUpload();
  }

}
