import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-board-card-modal',
  templateUrl: './board-card-modal.component.html',
  styleUrls: ['./board-card-modal.component.scss'],
})
export class BoardCardModalComponent implements OnInit {

  boadForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.boadForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }

}
