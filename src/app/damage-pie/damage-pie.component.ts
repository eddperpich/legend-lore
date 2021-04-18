import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SingleDataSet} from 'ng2-charts';


interface EventData {
  damage: number;
  dType: 'NECROTIC'| 'RADIANT' | 'COLD' | 'FIRE';
  player: string;
}

@Component({
  selector: 'app-damage-pie',
  templateUrl: './damage-pie.component.html',
  styleUrls: ['./damage-pie.component.css']
})
export class DamagePieComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  chartLabels: string[] = [];
  chartData: SingleDataSet[] = [];

  title = 'legend-lore';
  form: FormGroup;


  rawData: EventData[] = [
    {
      damage: 3,
      dType: 'RADIANT',
      player: 'ILIRIE'
    },
    {
      damage: 6,
      dType: 'NECROTIC',
      player: 'AUSTIN'
    },
    {
      damage: 12,
      dType: 'NECROTIC',
      player: 'TAYLOR'
    },
    {
      damage: 12,
      dType: 'NECROTIC',
      player: 'TAYLOR'
    },
    {
      damage: 12,
      dType: 'COLD',
      player: 'TAYLOR'
    },
    {
      damage: 12,
      dType: 'RADIANT',
      player: 'TAYLOR'
    },
    {
      damage: 12,
      dType: 'NECROTIC',
      player: 'TAYLOR'
    }
  ];

  public chartColors: Array<any> = [{
    backgroundColor: ['rgba(218,165,32,.8)', 'rgba(169,169,169,.8)', 'rgba(46,139,87,.8)']
  }];

  chartOptions = {
    responsive: true
  };

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        player: 'TAYLOR'
      }
    );
    this.render();
    this.form.valueChanges.subscribe(
      () =>
        this.render()
    );

    // .reduce((v1, v2) => [[...v1[0], v2.damage], [...v1[1], v2.dType]], [[], []]);
    // { base: { x } }
    // { x }
  }

  onChartHover = ($event: any) => {
    window.console.log('onChartHover', $event);
  };

  onChartClick = ($event: any) => {
    window.console.log('onChartClick', $event);
  }

  get players(): string[] {
    return [...new Set(this.rawData.map(item => item.player))];
  }

  get damageType(): string[] {
    return [...new Set(this.rawData.map(item => item.dType))];
  }

  render(): void {
    const damages: { [p: string]: number } = this.rawData
      .filter(item => item.player === this.form.get('player').value)
      .reduce((base, value) => ({...base, [value.dType]: (base[value.dType] || 0) + value.damage}), {});
    [this.chartLabels, this.chartData] = Object.entries(damages).reduce((v1, v2) => [[...v1[0], v2[0]], [...v1[1], v2[1]]], [[], []]);
  }

}