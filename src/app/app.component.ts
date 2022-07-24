import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'collatz-conjecture-visualizer';

  dataLabel = [0];

  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      
    ],
    labels: this.dataLabel
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

  public randomize(): void {
    let num = Math.round(Math.random() * 100);
    this.lineChartData.datasets.push({
      data: [num],
      label: num + ''
    });
    this.generateSeries();
    this.chart?.update();
    console.log(this.lineChartData.datasets[0].data);
  }

  public generateSeries(): void {
    let index = this.lineChartData.datasets.length;
    let num: any = this.lineChartData.datasets[index - 1].data[0];
    let interval = setInterval(() => {
      if(num % 2 == 1) {
        num = num * 3 + 1;
      }
      else {
        num /= 2;
      }
      this.lineChartData.datasets[index - 1].data.push(num);
      if(this.dataLabel.length <= this.lineChartData.datasets[index - 1].data.length) {
        this.dataLabel.push(this.dataLabel.length);
      }
      this.chart?.update();
      if(num == 1) {
        clearInterval(interval);
      }
    },400);
  }
}
