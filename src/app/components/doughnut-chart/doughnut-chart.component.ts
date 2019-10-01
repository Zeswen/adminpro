import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styles: []
})
export class DoughnutChartComponent implements OnInit {
  @Input() public doughnutChartLabels: Label[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales'
  ];
  @Input() public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70]
  ];
  @Input() public doughnutChartType: ChartType = 'doughnut';
  constructor() {}

  ngOnInit() {}
}
