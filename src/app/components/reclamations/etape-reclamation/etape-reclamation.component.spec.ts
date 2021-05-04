import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapeReclamationComponent } from './etape-reclamation.component';

describe('EtapeReclamationComponent', () => {
  let component: EtapeReclamationComponent;
  let fixture: ComponentFixture<EtapeReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapeReclamationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapeReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
