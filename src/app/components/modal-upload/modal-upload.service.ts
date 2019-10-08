import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public type: string;
  public _id: string;
  public hidden: string = 'hidden';

  public notification = new EventEmitter<any>();

  constructor() {}

  hideModal() {
    this.hidden = 'hidden';
    this.type = null;
    this._id = null;
  }

  showModal(type: string, _id: string) {
    this.hidden = '';
    this.type = type;
    this._id = _id;
  }
}
