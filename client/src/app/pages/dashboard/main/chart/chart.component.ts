import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() setup: any = {
    refresh: 'event',
    onDblClick: undefined,
    onClick: undefined,
    unit: 'aacc',
    showLegend: false,
    enableExport: false,
    enableScroll: false,
    enableBalloon: false,
    category: 'category',
    value: 'value',
    legend: { position: 'right', valign: 'center' },
  };
  @Input() data?: any[] = [];
  @Input() labels: any[] = [];
  @Input() type: any = 'pie';
  @Input() legend: any = true;

  @ViewChild('pieCanvas') private pieCanvas: ElementRef = {} as ElementRef;;
  pieChart: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.pieChartBrowser();
  }

  pieChartBrowser(): void {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: [{
          backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#ff3232',
            '#9b59b6',
            '#f1c40f',
            '#e74c3c'
          ],
          data: this.data
        }]
      },
      options: {
        layout: {
          padding: 25
        },
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: this.legend
          }
        }
      }
    });
  }

}
