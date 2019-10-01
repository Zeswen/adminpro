import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {
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

  /*
  graficos: any = {
    grafico1: {
      labels: ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      data: [24, 30, 46],
      type: 'doughnut',
      leyenda: 'El pan se come con'
    },
    grafico2: {
      labels: ['Hombres', 'Mujeres'],
      data: [4500, 6000],
      type: 'doughnut',
      leyenda: 'Entrevistados'
    },
    grafico3: {
      labels: ['Si', 'No'],
      data: [95, 5],
      type: 'doughnut',
      leyenda: '¿Le dan gases los frijoles?'
    },
    grafico4: {
      labels: ['No', 'Si'],
      data: [85, 15],
      type: 'doughnut',
      leyenda: '¿Le importa que le den gases?'
    }
  };
  */

  constructor() {}

  ngOnInit() {}
}
