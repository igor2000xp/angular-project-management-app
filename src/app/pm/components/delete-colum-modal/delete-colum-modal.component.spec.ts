import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteColumModalComponent } from './delete-colum-modal.component';

describe('DeleteColumModalComponent', () => {
  let component: DeleteColumModalComponent;
  let fixture: ComponentFixture<DeleteColumModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteColumModalComponent ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteColumModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
