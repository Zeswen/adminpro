import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  constructor() {}

  progress1: number = 20;
  progress2: number = 30;

  ngOnInit() {}
}
