import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Color, SingleDataSet} from 'ng2-charts';
import {ActionEvent, Menu} from '../../assets/data';
import {AuguryApi} from '../services/augury.api';

enum GroupingType {
  DAMAGE_TYPE,
  ACTION
}

@Component({
  selector: 'app-damage-pie',
  templateUrl: './damage-pie.component.html',
  styleUrls: ['./damage-pie.component.css']
})
export class DamagePieComponent implements OnInit {
  private filters: ((s: ActionEvent) => boolean)[] = [];

  constructor(private fb: FormBuilder, private api: AuguryApi) {
  }

  chartLabels: string[] = [];
  chartData: SingleDataSet[] = [];
  chartColors: Color[] = [];

  chartOptions = {
    responsive: true
  };

  title = 'legend-lore';
  form: FormGroup;

  menu: Menu = {
    actions: [],
    encounters: [],
    sessions: [],
    players: []
  };

  rawData: ActionEvent[] = [];

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
        grouping: '0'
      }
    );
    this.render();
    this.api.getMenu().subscribe(
      item =>
        this.menu = item
    );
    this.api.getActionEventsByPlayer('calais').subscribe(
      (result) =>
        this.rawData = result
    );
    this.form.valueChanges.subscribe(
      () => {
        this.filters = [];
        this.render();
      }
    );
    this.form.get('player').valueChanges.subscribe(
      value => {
        this.api.getActionEventsByPlayer(value).subscribe(
          (result) =>
            this.rawData = result
        );
      }
    );

    // .reduce((v1, v2) => [[...v1[0], v2.damage], [...v1[1], v2.dType]], [[], []]);
    // { base: { x } }
    // { x }
  }

  onChartHover = ($event: any) => {
    // window.console.log('onChartHover', $event);
  };

  onChartClick(e: any): void {
    if (e.active.length > 0) {
      // const slice = e.active[0]._chart.config.data.labels[e.active[0]._index]
      if (this.groupingSelection !== GroupingType.ACTION) {
        this.groupingSelection = GroupingType.ACTION;
        this.filters = [...this.filters, this.damageTypeFilter(e.active[0]._chart.config.data.labels[e.active[0]._index])];
      } else {
        this.groupingSelection = GroupingType.DAMAGE_TYPE;
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
    return this.menu.players.map(item => item.entity.name);
  }

  get damageType(): string[] {
    return this.rawData.map(item => item.damageEvent.damageType);
  }

  get groupingSelection(): GroupingType {
    return this.form?.get('grouping').value;
  }

  set groupingSelection(input: GroupingType) {
    this.form?.get('grouping').patchValue(input);
  }

  aggregate(dataGrouping: GroupingType, filters: ((s: ActionEvent) => boolean)[]): { [p: string]: number } {
    const tempFilt = filters.concat(this.playerFilter());
    console.log(this.rawData);
    return this.rawData
      .filter(item => tempFilt.every(a => a(item)))
      .reduce((base, value) => ({...base,
        [this.groupExtractor(value, dataGrouping)]: (base[this.groupExtractor(value, dataGrouping)] || 0) + value.damageEvent.damageVal
      }), {});
  }

  groupExtractor(a: ActionEvent, group: GroupingType): string {
    console.log(group);
    switch (group) {
      case GroupingType.DAMAGE_TYPE:
        return a.damageEvent.damageType;
      case GroupingType.ACTION:
        return a.action.actionTitle;
      default:
        return '';
    }
  }

  damageTypeFilter(dType: string): (s: ActionEvent) => boolean {
    return (item) => item.damageEvent.damageType === dType;
  }

  playerFilter(): (s: ActionEvent) => boolean {
    return item => item.source.name === this.form?.get('player')?.value;
  }

  render(): void {
    const damages = this.aggregate(this.groupingSelection, this.filters?.length ? this.filters : [this.playerFilter()]);
    console.log(damages);
    [this.chartLabels, this.chartData, this.chartColors] = Object.entries(damages).reduce((v1, v2) => [
        [...v1[0], v2[0]],
        [...v1[1], v2[1]],
        [{
          backgroundColor: [...v1[2][0]?.backgroundColor || [], this?.colorCodes[v2[0]] ? this.colorCodes[v2[0]] :
            this.colorCodes.PSYCHIC]
        }]
      ],
      [[], [], []]
    );
  }
}
