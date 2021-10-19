import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarViewComponent } from './eliminar-view.component';

describe('EliminarViewComponent', () => {
  let component: EliminarViewComponent;
  let fixture: ComponentFixture<EliminarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
