import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, retry, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {
    this.subscription = this.returnObservable().subscribe(
      num => console.log('Subs', num),
      err => console.log('Error', err),
      () => console.log('Finished')
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter += 1;

        const returned = {
          value: counter
        };
        observer.next(returned);
      }, 1000);
    }).pipe(
      map(({ value }) => value),
      filter((value, i) => value % 2 === 0)
    );
  }
}
