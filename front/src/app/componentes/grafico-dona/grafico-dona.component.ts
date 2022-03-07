import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
})
export class GraficoDonaComponent implements OnInit {
  @Input() doughnutChartLabels: string[] = [];
  @Input() data: number[] = [];

  @Input() doughnutChartType: ChartType = 'doughnut';

  @Input() leyenda: string;
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: this.data }],
  };
  constructor() {}

  ngOnInit(): void {
console.log(this.doughnutChartLabels);
console.log(this.data);
console.log(this.doughnutChartType);
console.log(this.leyenda);





  }
}
