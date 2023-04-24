import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-elijah-core',
  templateUrl: './elijah-core.component.html',
  styleUrls: ['./elijah-core.component.css']
})
export class ElijahCoreComponent implements OnInit {

  readonly projectList = [{
    project: 'A MOVEMENT IN EVERY DIRECTION LEGACIES OF THE GREAT MIGRATION',
    client: 'THE BROOKLYN MUSEUM',
    work: 'EXHIBITION, MARKETING',
    date: '2023',
    src: 'greatmigration.png'
  },
    {
      project: 'FIRST SATURDAYS',
      client: 'THE BROOKLYN MUSEUM',
      work: 'EXPERIENTIAL, MARKETING',
      date: '2023'
    },
    {
      project: 'REALLY FREE! THE RADICAL ART OF NELLIE MAE ROWE',
      client: 'THE BROOKLYN MUSEUM',
      work: 'EXHIBITION',
      date: '2022',
      src: 'nelliemae.jpg'
    },
    {
      project: 'VIRGIL ABLOH: "FIGURES OF SPEECH"',
      client: 'THE BROOKLYN MUSEUM',
      work: 'EXHIBITION, MARKETING',
      date: '2022',
      src: 'virgilabloh.png'
    },
    {
      project: 'PHOTOS FOR WHO',
      client: '',
      work: 'PRINTMAKING',
      date: '2022',
      src: 'photosforwho.jpg'
    },
    {
      project: 'GUADALUPE MARAVILLA: TIERRA BLANCA JOVEN',
      client: 'THE BROOKLYN MUSEUM',
      work: 'EXHIBITION',
      date: '2022',
    },
    {
      project: 'AIGA COMMAND X 2021 CONTESTANT',
      client: 'AIGA',
      work: 'BRANDING',
      date: '2021',
      src: 'aigacommand.png'
    },
    {
      project: 'THE OBAMA PORTRAITS TOUR',
      client: 'THE BROOKLYN MUSEUM',
      work: 'EXHIBITION, MARKETING',
      date: '2021',
      src: 'obamaportraits.jpg'
    },
    {
      project: 'THE SLIPSTREAM: REFLECTION, RESILIENCE, AND RESISTANCE IN THE ART OF OUR TIME',
      client: 'THE BROOKLYN MUSEUM',
      work: 'EXHIBITION',
      date: '2021'
    },
    {
      project: 'CUP ANNUAL BENEFIT LETTER',
      client: 'THE CENTER FOR URBAN PEDAGOGY',
      work: 'PACKAGING, IDENTITY',
      date: '2020'
    },
    {
      project: 'CUP INSTAGRAM MOTION GRAPHICS',
      client: 'THE CENTER FOR URBAN PEDAGOGY',
      work: 'MOTION',
      date: '2020'
    },
    {
      project: 'EASTERN MICHIGAN ART + DESIGN DEPARTMENT',
      client: 'EASTERN MICHIGAN',
      work: 'EXHIBITION, MARKETING',
      date: '2019',
      src: 'easternmichigan.jpg'
    },
    {
      project: 'DEATH ZINE',
      client: '',
      work: 'PRINT',
      date: '2019',
      src: 'deathzine.jpg'
    },
    {
      project: 'TOGETHER AT FORD HALL',
      client: 'EASTERN MICHIGAN',
      work: 'EXHIBITION',
      date: '2019',
      src: 'togetheratfordhall.jpg'
    },
  ];
  public now: number = Date.now();

  constructor() {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.now = Date.now();
    }, 1000);
  }
}
