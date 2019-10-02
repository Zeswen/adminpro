import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {
  constructor() {
    this.countTo3()
      .then(msg => console.log(msg))
      .catch(err => console.error(err));
  }

  ngOnInit() {}

  countTo3(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter += 1;
        if (counter === 3) {
          resolve(true);
          clearInterval(interval);
        }
        if (counter === 15) {
          reject(false);
        }
      }, 1000);
    });
  }
}
