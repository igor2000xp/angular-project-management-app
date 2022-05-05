import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCardModalComponent } from './board-card-modal.component';

describe('BoardCardModalComponent', () => {
  let component: BoardCardModalComponent;
  let fixture: ComponentFixture<BoardCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardCardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
