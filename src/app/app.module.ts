import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChartsModule} from 'ng2-charts';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LegendLoreModule} from './legend-lore/legend-lore.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LegendLoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

