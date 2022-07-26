import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() lineChartData!: ChartConfiguration['data'];
  constructor() { }

  ngOnInit(): void {
  }

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      y: {
          position: 'left',
          grid: {
            color: 'rgba(255,0,0,0.3)'
          },
        },
    }
  };

  lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  updateChart(): void {
    this.chart?.update();
  }

}
