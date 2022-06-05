import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

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
  @Input() data?: any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
