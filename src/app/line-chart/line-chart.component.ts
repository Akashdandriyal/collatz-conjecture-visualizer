import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() lineChartData!: ChartConfiguration['data'];
  @Input() chartTitle!: string;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  lineChartOptions: ChartConfiguration['options']; 
  lineChartType: ChartType = 'line';

  constructor() { }

  ngOnInit(): void {
    console.log(this.chartTitle);
    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0.1
        }
      },
      scales: {
        x: {},
        y: {
            position: 'left',
            grid: {
              color: '#ff4081'
            },
          },
      },
      plugins: {
        title: {
          display: true,
          text: this.chartTitle
        },
        legend: {
          display: true,
          position: 'bottom',
        }
      }
    };
  }

  updateChart(): void {
    this.chart?.update();
  }

}
