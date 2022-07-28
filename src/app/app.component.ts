import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LineChartComponent } from './line-chart/line-chart.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Collatz Conjecture Visualizer';
  dataLabel = [0];
  valueEntered!: number;
  sequenceGenerationTime = 0.4;
  disableSlider = false;
  @ViewChildren('lineChart') lineChartComponents!: QueryList<LineChartComponent>;

  constructor(private _snackBar: MatSnackBar) {}

  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      
    ],
    labels: this.dataLabel
  }

  lineChartLogData: ChartConfiguration['data'] = {
    datasets: [
      
    ],
    labels: this.dataLabel
  }

  checkValue(e: any): void {
    this.valueEntered = e.target.value;
    console.log(this.valueEntered);
    if(this.valueEntered > 1000) {
      this.disableSlider = true;
    }
    else {
      this.disableSlider = false;
    }
  }

  //Slider component
  formatLabel(value: number) {
    return value + 's';
  }

  public randomize() : void {
    let num = this.valueEntered;
    this.lineChartData.datasets.push({
      data: [num],
      label: num + ''
    });
    this.lineChartLogData.datasets.push({
      data: [Math.log10(num)],
      label: num + ''
    });
    this.openSnackBar("Sequence Generating");
    this.generateSeries();
    // this.chart?.update();
    console.log(this.lineChartData.datasets[0].data);
  }

  public generateSeries(): void {
    let index = this.lineChartData.datasets.length;
    let num: any = this.lineChartData.datasets[index - 1].data[0];
    console.log(this.sequenceGenerationTime);
    if(this.sequenceGenerationTime > 0 || !this.disableSlider) {
      let interval = setInterval(() => {
        if(num % 2 == 1) {
          num = num * 3 + 1;
        }
        else {
          num /= 2;
        }
        this.lineChartData.datasets[index - 1].data.push(num);
        this.lineChartLogData.datasets[index - 1].data.push(Math.log10(num));
        if(this.dataLabel.length <= this.lineChartData.datasets[index - 1].data.length) {
          this.dataLabel.push(this.dataLabel.length);
        }
        // this.chart?.update();
        this.lineChartComponents.forEach(lineChartComponent => {
          lineChartComponent.updateChart();
        });
        if(num == 1) {
          clearInterval(interval);
          this.openSnackBar("Sequence Generated");
        }
      },this.sequenceGenerationTime * 1000);
    }
    else {
      while(num != 1) {
        if(num % 2 == 1) {
          num = num * 3 + 1;
        }
        else {
          num /= 2;
        }
        this.lineChartData.datasets[index - 1].data.push(num);
        this.lineChartLogData.datasets[index - 1].data.push(Math.log10(num));
        if(this.dataLabel.length <= this.lineChartData.datasets[index - 1].data.length) {
          this.dataLabel.push(this.dataLabel.length);
        }
      }
      this.lineChartComponents.forEach(lineChartComponent => {
        lineChartComponent.updateChart();
      });
      this.openSnackBar("Sequence Generated");
    }
  }

  openSnackBar(message: string) {
    // this._snackBar.openFromComponent(NotificationComponent, {
    //   duration: this.durationInSeconds * 1000,
    // });
    this._snackBar.open(message, "", {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-green']
    });
  }

  // downloadCanvas(event: any) {
  //   let anchor = event.target;
  //   anchor.href = document.getElementsByTagName('canvas')[0].toDataURL("image/png");
  //   anchor.download = "test.png";
  // }
  downloadCanvas() {
    let a = document.createElement("a");
    a.href = document.getElementsByTagName('canvas')[0].toDataURL("image/png");
    a.download = "test.png";
    a.click();
  }
}
