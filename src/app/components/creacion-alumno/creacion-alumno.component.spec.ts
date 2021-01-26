import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionAlumnoComponent } from './creacion-alumno.component';

describe('CreacionAlumnoComponent', () => {
  let component: CreacionAlumnoComponent;
  let fixture: ComponentFixture<CreacionAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
