import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccederViewComponent } from './acceder-view.component';

describe('AccederViewComponent', () => {
  let component: AccederViewComponent;
  let fixture: ComponentFixture<AccederViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccederViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccederViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
