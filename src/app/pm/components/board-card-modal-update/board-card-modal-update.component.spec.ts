import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCardModalUpdateComponent } from './board-card-modal-update.component';

describe('BoardCardModalUpdateComponent', () => {
  let component: BoardCardModalUpdateComponent;
  let fixture: ComponentFixture<BoardCardModalUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardCardModalUpdateComponent ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCardModalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
