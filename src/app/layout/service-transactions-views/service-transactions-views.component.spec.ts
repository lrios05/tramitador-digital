import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTransactionsViewsComponent } from './service-transactions-views.component';

describe('ServiceTransactionsViewsComponent', () => {
  let component: ServiceTransactionsViewsComponent;
  let fixture: ComponentFixture<ServiceTransactionsViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceTransactionsViewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTransactionsViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
