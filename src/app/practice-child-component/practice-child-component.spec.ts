import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeChildComponent } from './practice-child-component';

describe('PracticeChildComponent', () => {
  let component: PracticeChildComponent;
  let fixture: ComponentFixture<PracticeChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PracticeChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeChildComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
