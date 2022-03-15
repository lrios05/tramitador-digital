import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApisignatureComponent } from './apisignature.component';

describe('ApisignatureComponent', () => {
  let component: ApisignatureComponent;
  let fixture: ComponentFixture<ApisignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApisignatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApisignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
