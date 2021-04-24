import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Color, SingleDataSet} from 'ng2-charts';
import {DataFile, EventData} from '../../assets/data';

@Component({
  selector: 'app-damage-pie',
  templateUrl: './damage-pie.component.html',
  styleUrls: ['./damage-pie.component.css']
})
export class DamagePieComponent implements OnInit {
  private filters: ((s: EventData) => boolean)[] = [];

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

  rawData: EventData[] = DataFile.set1;

  public colorCodes = {
    BLUDGEONING: 'rgba(112,128,144)',
    COLD: 'rgba(65,105,225)',
    FIRE: 'rgba(128,0,0)',
    FORCE: 'rgba(245,245,245)',
    NECROTIC: 'rgba(46,139,87)',
    POISON: 'rgba(72,61,139)',
    PSYCHIC: 'rgba(218,112,214)',
    RADIANT: 'rgba(218,165,32)',
    SLASHING: 'rgba(105,105,105)'
};

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        player: 'CALAIS',
        grouping: 'dType'
      }
    );
    this.render();
    this.form.valueChanges.subscribe(
      () => {
        this.filters = [];
        this.render();
      }
    );
  }

  onChartHover = ($event: any) => {
    // window.console.log('onChartHover', $event);
  };

  onChartClick(e: any): void {
    if (e.active.length > 0) {
      if (this.groupingSelection !== 'spell') {
        this.groupingSelection = 'spell';
        this.filters = [...this.filters, this.damageTypeFilter(e.active[0]._chart.config.data.labels[e.active[0]._index])];
      } else {
        this.groupingSelection = 'dType';
        this.filters = [];
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

  get groupingSelection(): string {
    return this.form?.get('grouping').value;
  }

  set groupingSelection(input: string) {
    this.form?.get('grouping').patchValue(input);
  }

  aggregate(dataGrouping: string = 'dType', filters: ((s: EventData) => boolean)[]): { [p: string]: number } {
    const tempFilt = filters.concat(this.playerFilter());
    return this.rawData
      .filter(item => tempFilt.every(a => a(item)))
      .reduce((base, value) => ({...base, [value[dataGrouping]]: (base[value[dataGrouping]] || 0) + value.damage}), {});
  }

  damageTypeFilter(dType: string): (s: EventData) => boolean {
    return (item) => item.dType === dType;
  }

  playerFilter(): (s: EventData) => boolean {
    return item => item.player === this.form?.get('player').value;
  }

  render(): void {
    const damages = this.aggregate(this.groupingSelection, this.filters?.length ? this.filters : [this.playerFilter()]);

    console.log(Object.entries(damages));

    [this.chartLabels, this.chartData, this.chartColors] = Object.entries(damages).reduce((v1, v2) => [
        [...v1[0], v2[0]],
        [...v1[1], v2[1]],
        [{backgroundColor: [...v1[2][0]?.backgroundColor || [], this.colorCodes[v2[0]]]}]
      ],
      [[], [], []]
    );
    const test={1: "test"}
    console.log(test[1])
  }
}
