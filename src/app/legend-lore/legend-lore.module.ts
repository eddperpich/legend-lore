import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LegendLoreComponent} from './legend-lore.component';
import {DamagePieComponent} from './damage-pie/damage-pie.component';
import {PlayerTableComponent} from './player-table/player-table.component';
import {ChartsModule} from 'ng2-charts';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    LegendLoreComponent,
    DamagePieComponent,
    PlayerTableComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    ReactiveFormsModule
  ]
})
export class LegendLoreModule {
}
