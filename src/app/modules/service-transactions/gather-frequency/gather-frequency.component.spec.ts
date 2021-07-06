import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatherFrequencyComponent } from './gather-frequency.component';

describe('GatherFrequencyComponent', () => {
  let component: GatherFrequencyComponent;
  let fixture: ComponentFixture<GatherFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatherFrequencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatherFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
