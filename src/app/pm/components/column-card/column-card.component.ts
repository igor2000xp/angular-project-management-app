import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-column-card',
  templateUrl: './column-card.component.html',
  styleUrls: ['./column-card.component.scss']
})
export class ColumnCardComponent implements OnInit {

  public name: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
