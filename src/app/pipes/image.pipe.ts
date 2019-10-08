import { Pipe, PipeTransform } from '@angular/core';
import { BASE_URL } from '../config/constants';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  transform(img: string, type: string = 'users'): any {
    const url = BASE_URL + '/img';
    if (!img) {
      return `${url}/${type}/notfound`;
    }
    if (img.includes('https')) {
      return img;
    }
    return `${url}/${type}/${img}`;
  }
}
