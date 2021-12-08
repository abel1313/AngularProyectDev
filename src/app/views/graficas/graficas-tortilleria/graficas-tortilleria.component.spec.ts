import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasTortilleriaComponent } from './graficas-tortilleria.component';

describe('GraficasTortilleriaComponent', () => {
  let component: GraficasTortilleriaComponent;
  let fixture: ComponentFixture<GraficasTortilleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficasTortilleriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasTortilleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
