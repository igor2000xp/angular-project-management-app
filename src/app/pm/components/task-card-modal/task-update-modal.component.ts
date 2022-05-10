import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-card-modal',
  templateUrl: './task-update-modal.component.html',
  styleUrls: ['./task-update-modal.component.scss'],
})
export class TaskCardModalComponent implements OnInit {

  createTaskForm: FormGroup;

  aaa:string;

  constructor() { }

  ngOnInit(): void {
    this.aaa = 'aaa';
    this.createTaskForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [Validators.required]),
    });
  }

}
