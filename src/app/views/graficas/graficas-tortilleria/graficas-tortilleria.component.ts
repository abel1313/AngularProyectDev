import { Component, OnInit } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-graficas-tortilleria',
  templateUrl: './graficas-tortilleria.component.html',
  styleUrls: ['./graficas-tortilleria.component.scss']
})
export class GraficasTortilleriaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    let startDateArry: any[] = [];
    let blinkArry: any[] = [];

    for (var i = 0; i < 7; i++) {
      blinkArry.push(Math.round(Math.random() * 100));
      startDateArry.push(Math.round(Math.random() * 100));
    }

    this.barChartData = [{ data: [10,2,3,4,5,6,7], label: 'blinks' }];


    /* SOLUTION */
    this.barChartLabels = ['uno','uno','uno','uno','uno','uno','uno'];
    console.log('this is the fix!!!', this.barChartLabels);
 
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[];


  public datox(): Array<string>
  {
    let a: Array<string> = ['uno','dos'];
  return a;
  }

}
