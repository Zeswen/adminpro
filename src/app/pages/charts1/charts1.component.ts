import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts1',
  templateUrl: './charts1.component.html',
  styles: []
})
export class Charts1Component implements OnInit {
  charts: any = [
    {
      labels: ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      data: [24, 30, 46],
      title: 'El pan se come con'
    },
    {
      labels: ['Hombres', 'Mujeres'],
      data: [4500, 6000],
      title: 'Entrevistados'
    },
    {
      labels: ['Si', 'No'],
      data: [95, 5],
      title: '¿Le dan gases los frijoles?'
    },
    {
      labels: ['No', 'Si'],
      data: [85, 15],
      title: '¿Le importa que le den gases?'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
