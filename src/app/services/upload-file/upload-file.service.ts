import { Injectable } from '@angular/core';
import { BASE_URL } from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  constructor() {}

  uploadFile(file: File, type: string, _id: string) {
    return new Promise((resolve, reject) => {
      let formData: FormData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('img', file, file.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Uploaded image');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Upload failed');
            reject(JSON.parse(xhr.response));
          }
        }
      };
      const url = `${BASE_URL}/upload/${type}/${_id}`;
      xhr.open('put', url, true);
      xhr.send(formData);
    });
  }
}
