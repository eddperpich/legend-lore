import {Component, Input, OnInit} from '@angular/core';
import {Players} from '../../assets/data';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit {
  @Input() players: Players[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
