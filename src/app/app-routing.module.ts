import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LegendLoreComponent} from './legend-lore/legend-lore.component';
import {ElijahCoreComponent} from './elijah-core/elijah-core.component';

const routes: Routes = [
  {
    path: 'lore',
    component: LegendLoreComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: ElijahCoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
