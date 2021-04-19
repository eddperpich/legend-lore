import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Color, SingleDataSet} from 'ng2-charts';


interface EventData {
  damage: number;
  dType: 'BLUDGEONING' | 'COLD' | 'FIRE' | 'FORCE' | 'NECROTIC' | 'POISON' | 'PSYCHIC' | 'RADIANT' | 'SLASHING';
  spell: string;
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
  chartColors: Color[] = [];

  chartOptions = {
    responsive: true
  };

  title = 'legend-lore';
  form: FormGroup;

  public primaryFilter: string;
  public secondaryFilter: string;

  rawData: EventData[] = [
    {
      damage: 8,
      dType: 'FIRE',
      spell: 'FIREBOLT',
      player: 'CALAIS'
    },
    {
      damage: 5,
      dType: 'PSYCHIC',
      spell: 'MIND SLIVER',
      player: 'CALAIS'
    },
    {
      damage: 7,
      dType: 'PSYCHIC',
      spell: 'TASHAS MIND WHIP',
      player: 'CALAIS'
    },
    {
      damage: 10,
      dType: 'FIRE',
      spell: 'FIREBOLT',
      player: 'CALAIS'
    },
    {
      damage: 10,
      dType: 'PSYCHIC',
      spell: 'SHADOW BLADE',
      player: 'CALAIS'
    },
    {
      damage: 7,
      dType: 'COLD',
      spell: 'RAY OF FROST',
      player: 'CALAIS'
    },
    {
      damage: 4,
      dType: 'PSYCHIC',
      spell: 'TASHAS MIND WHIP',
      player: 'CALAIS'
    },
    {
      damage: 4,
      dType: 'FIRE',
      spell: 'FIREBOLT',
      player: 'CALAIS'
    },
    {
      damage: 16,
      dType: 'POISON',
      spell: 'CHAOS BOLT',
      player: 'CALAIS'
    },
    {
      damage: 17,
      dType: 'RADIANT',
      spell: 'MOONBEAM',
      player: 'ILIRIE'
    },
    {
      damage: 12,
      dType: 'RADIANT',
      spell: 'MOONBEAM',
      player: 'ILIRIE'
    },
    {
      damage: 8,
      dType: 'RADIANT',
      spell: 'MOONBEAM',
      player: 'ILIRIE'
    },
    {
      damage: 2,
      dType: 'RADIANT',
      spell: 'MOONBEAM',
      player: 'ILIRIE'
    },
    {
      damage: 6,
      dType: 'SLASHING',
      spell: 'LONGSWORD',
      player: 'ILIRIE'
    },
    {
      damage: 6,
      dType: 'RADIANT',
      spell: 'MOONBEAM',
      player: 'ILIRIE'
    },
    {
      damage: 4,
      dType: 'SLASHING',
      spell: 'LONGSWORD',
      player: 'ILIRIE'
    },
    {
      damage: 7,
      dType: 'NECROTIC',
      spell: 'TOLL THE DEAD',
      player: 'ILIRIE'
    },
    {
      damage: 13,
      dType: 'RADIANT',
      spell: 'GUIDING BOLT',
      player: 'ILIRIE'
    },
    {
      damage: 11,
      dType: 'NECROTIC',
      spell: 'TOLL THE DEAD',
      player: 'ILIRIE'
    },
  ];

  public colorCodes = {
    BLUDGEONING: 'rgba(112,128,144,.8)',
    COLD: 'rgba(65,105,225,.8)',
    FIRE: 'rgba(128,0,0,.8)',
    FORCE: 'rgba(245,245,245,.8)',
    NECROTIC: 'rgba(46,139,87,.8)',
    POISON: 'rgba(72,61,139,.8)',
    PSYCHIC: 'rgba(218,112,214,.8)',
    RADIANT: 'rgba(218,165,32,.8)',
    SLASHING: 'rgba(105,105,105,.8)'
  };

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        player: 'CALAIS'
      }
    );
    this.render();
    this.form.valueChanges.subscribe(
      () => {
        this.primaryFilter = undefined, this.secondaryFilter=undefined,
        this.render()
      }
    );

    // .reduce((v1, v2) => [[...v1[0], v2.damage], [...v1[1], v2.dType]], [[], []]);
    // { base: { x } }
    // { x }
  }

  onChartHover = ($event: any) => {
    // window.console.log('onChartHover', $event);
  };

  onChartClick(e:any):void {
    if (e.active.length> 0){
      if (this.primaryFilter != 'spell') {
        this.primaryFilter = 'spell';
        this.secondaryFilter = e.active[0]._chart.config.data.labels[e.active[0]._index];
      } else {
        this.primaryFilter = undefined
        this.secondaryFilter = undefined
      }
      this.render();

      // documentation because imagine reading docs
      // this.chartData = [[100, 50, 60]]; add filter by damage type LABEL
      // console.log("Index" , e.active[0]._index);
      // console.log("Data" , e.active[0]._chart.config.data.datasets[0].data[e.active[0]._index]);
      // console.log("Label" , e.active[0]._chart.config.data.labels[e.active[0]._index]);
    }
  }

  get players(): string[] {
    return [...new Set(this.rawData.map(item => item.player))];
  }

  get damageType(): string[] {
    return [...new Set(this.rawData.map(item => item.dType))];
  }

  aggregate(pFilter: string = "dType", sFilter: string=""): { [p: string]: number } {
    const dict: { [p: string]: number } = this.rawData
      .filter(item => item.player === this.form.get('player').value)
      .filter(item => sFilter != "" ? item.dType === sFilter : 1)
      .reduce((base, value) => ({...base, [value[pFilter]]: (base[value[pFilter]] || 0) + value.damage}), {});
    return dict;
  }

  render(): void {
    const damages = this.aggregate(this.primaryFilter, this.secondaryFilter);

    [this.chartLabels, this.chartData, this.chartColors] = Object.entries(damages).reduce((v1, v2) => [
        [...v1[0], v2[0]],
        [...v1[1], v2[1]],
        [{backgroundColor: [...v1[2][0]?.backgroundColor || [], this.colorCodes[v2[0]]]}]
      ],
      [[], [], []]
    );
  }
}
