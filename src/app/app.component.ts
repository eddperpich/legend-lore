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
      data: [58, 10, 18, 0, 0, 0, 0, 0, 0],
      label: 'Calais'
    }
    // {
    //   data: [0, 0, 0, 22, 26, 7, 16, 0, 0],
    //   label: 'Ilirie'
    // },
    // {
    //   data: [0, 0, 0, 24, 0, 0, 0, 10, 42],
    //   label: 'Kemvari'
    // },
    // {
    //   data: [33, 4, 0, 0, 0, 0, 0, 0, 4],
    //   label: 'Ojjun'
    // },
    // {
    //   data: [0, 0, 22, 5, 0, 0, 0, 25, 0],
    //   label: 'Viktor'
    // }
  ];

  chartLabels: string[] = [
    'Radiant',
    'Slashing',
    'Necrotic'
    // 'Fire',
    // 'Psychic',
    // 'Cold',
    // 'Poison',
    // 'Force',
    // 'Bludgeoning'
  ];

  chartOptions = {
    responsive: true
  };

  public chartColors: Array < any > = [{
    backgroundColor: ['rgba(218,165,32,.8)',
    'rgba(169,169,169,.8)',
    'rgba(46,139,87,.8)'
  ]
 }];

  onChartHover = ($event: any) => {
    window.console.log('onChartHover', $event);
  }

  onChartClick = ($event: any) => {
    window.console.log('onChartClick', $event);
  }
}
