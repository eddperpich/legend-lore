import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Color, SingleDataSet} from 'ng2-charts';
import {ActionEvent, DataUtils, Menu, Players} from '../../../assets/data';
import {zip} from 'rxjs';
import {ChartOptions} from 'chart.js';
import {AuguryApi} from '../services/augury.api';

enum GroupingType {
  DAMAGE_TYPE,
  ACTION
}

interface GraphData {
  [p: string]: { value: number, color: string };
}

type GraphInput = [string[], number[], Color[]];

@Component({
  selector: 'app-damage-pie',
  templateUrl: './damage-pie.component.html',
  styleUrls: ['./damage-pie.component.css']
})
export class DamagePieComponent implements OnInit {

  constructor(private fb: FormBuilder, private api: AuguryApi) {
  }

  get players(): string[] {
    return this.menu.players.map(item => item.entity.name);
  }

  get damageType(): string[] {
    return this.rawData.map(item => item.damageEvent.damageType);
  }

  get groupingSelection(): GroupingType {
    switch (this.form?.get('grouping').value) {
      case '0':
        return GroupingType.DAMAGE_TYPE;
      case '1':
        return GroupingType.ACTION;
      default:
        return GroupingType.DAMAGE_TYPE;
    }
  }

  set groupingSelection(input: GroupingType) {
    this.form?.get('grouping').patchValue(input.valueOf().toString());
  }

  get getPlayerPortrait(): { [p: string]: string } {
    const name = this.currentPlayer?.entity?.name.toUpperCase();
    return {
      content: 'url(assets/' + name + '.png)',
      width: '35%',
      top: '0',
    };
  }

  get currentPlayer(): Players {
    return this.menu.players.find(item => (this.form?.get('player')?.value) === item?.entity?.name) || {
      id: 0,
      description: '',
      entity: {
        id: 0,
        name: ''
      },
      playerName: '',
      className: '',
      race: ''
    };
  }

  private filters: ((s: ActionEvent) => boolean)[] = [];

  chartLabels: string[] = [];
  chartData: SingleDataSet = [];
  chartColors: Color[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    legend: {position: 'right'}
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

  public colorCodes: { [p: string]: string } = {
    BLUDGEONING: 'hsl(210, 13%, 50%)',
    COLD: 'hsl(225, 73%, 57%)',
    FIRE: 'hsl(0, 100%, 25%)',
    FORCE: 'hsl(0, 0%, 96%)',
    NECROTIC: 'hsl(146, 50%, 36%)',
    POISON: 'hsl(248, 39%, 39%)',
    PSYCHIC: 'hsl(302, 59%, 65%)',
    RADIANT: 'hsl(43, 74%, 49%)',
    SLASHING: 'hsl(0, 0%, 41%)'
  };

  static groupExtractor(a: ActionEvent, group: GroupingType): string {
    if (group === GroupingType.DAMAGE_TYPE) {
      return DataUtils.getDamageType(a);
    }
    if (group === GroupingType.ACTION) {
      return a.action.actionTitle;
    }
    return '';
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        player: 'Calais',
        grouping: '0'
      }
    );
    zip(this.api.getMenu(), this.api.getActionEventsByPlayer('calais')).subscribe(
      ([menu, actionEvents]) => {
        this.menu = menu;
        this.rawData = actionEvents;
        this.render();
      }
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
          (result) => {
            this.rawData = result;
            this.render();
          }
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

  aggregate(dataGrouping: GroupingType, filters: ((s: ActionEvent) => boolean)[] = []): GraphData {
    const tempFilt = filters.concat(this.playerFilter());
    console.log(this.rawData);
    const data = this.rawData
      .filter(item => tempFilt.every(a => a(item)))
      .reduce((base: GraphData, event) => ({
        ...base,
        [DamagePieComponent.groupExtractor(event, dataGrouping)]: {
          value: (base[DamagePieComponent.groupExtractor(event, dataGrouping)]?.value || 0) + event.damageEvent.damageVal,
          color: (this.colorCodes[DataUtils.getDamageType(event)] || this.colorCodes.PSYCHIC)
        }
      }), {});
    const colorData = DataUtils.reverseMap(data, (item) => item.color);
    Object.entries(data)
      .forEach(([key, value], index, array) => {
        const itemListForColor = colorData[value.color];
        const indexOfItem = itemListForColor.findIndex(item => item.originalKey === key);
        const colorString = value.color;
        const [, hue, saturation, luminance] = colorString.match(/hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)*)?%\)/);
        const luminanceFloat = Number.parseFloat(luminance);
        const lumResult = (luminanceFloat / itemListForColor.length) * (indexOfItem + 1);
        value.color = `hsl(` + hue + ',' + saturation + ',' + lumResult + '%)';
      });
    return data;
  }

  damageTypeFilter(dType: string): (s: ActionEvent) => boolean {
    return (item) => DataUtils.getDamageType(item) === dType;
  }

  playerFilter(): (s: ActionEvent) => boolean {
    return item => item.source.name === this.form?.get('player')?.value;
  }

  render(): void {
    const damages: GraphData = this.aggregate(this.groupingSelection, this.filters);
    [this.chartLabels, this.chartData, this.chartColors] = this.convertGraphData(damages);
  }

  private convertGraphData(damages: GraphData): GraphInput {
    return Object.entries(damages)
      .sort(([a, c], [b, d]) => c.color > d.color ? 1 : -1)
      .reduce(([labelA, valueA, colorA]: GraphInput, [label, item]) => [
          [...labelA, label],
          [...valueA, item.value],
          [{backgroundColor: [...colorA[0]?.backgroundColor || [], item.color]}]],
        [[], [], []]
      );
  }
}
