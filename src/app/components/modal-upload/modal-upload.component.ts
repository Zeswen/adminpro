import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { UploadFileService } from '../../services/upload-file/upload-file.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  uploadingImg: File;
  tempImg: string;
  constructor(
    public _uploadFileService: UploadFileService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {}

  selectImage(file: File) {
    if (!file) {
      return;
    }

    if (!file.type.includes('image')) {
      swal('Only images', 'The selected file is not an image', 'error');
    }

    this.uploadingImg = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => (this.tempImg = reader.result as string);
  }

  uploadImage() {
    this._uploadFileService
      .uploadFile(
        this.uploadingImg,
        this._modalUploadService.type,
        this._modalUploadService._id
      )
      .then(res => {
        this._modalUploadService.notification.emit(res);
        this.closeModal();
      })
      .catch(err => {
        console.error(err);
      });
  }

  closeModal() {
    this.tempImg = null;
    this.uploadingImg = null;

    this._modalUploadService.hideModal();
  }
}
