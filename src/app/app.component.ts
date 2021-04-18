import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'legend-lore';

  chartData = [
    {
      data: [58, 10, 18],
      label: 'Ilirie'
    }
  ];

  chartLabels = [
    'Radiant',
    'Slashing',
    'Necrotic'
  ];
  
  public chartColors: Array < any > = [{
    backgroundColor: ['rgba(218,165,32,.8)', 'rgba(169,169,169,.8)', 'rgba(46,139,87,.8)']
  }];

  chartOptions = {
    responsive: true
  };

  onChartHover = ($event: any) => {
    window.console.log('onChartHover', $event);
  };

  onChartClick = ($event: any) => {
    window.console.log('onChartClick', $event);
  };

  addDataPoint(dataArr = (1), label) {
    this.chartData.forEach((dataset, index) => {
      this.chartData[index] = Object.assign({}, this.chartData[index], {
        data: [...this.chartData[index].data, dataArr[index]]
      });
    });

    this.chartLabels = [...this.chartLabels, label];
  };
}
