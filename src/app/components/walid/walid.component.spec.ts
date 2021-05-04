import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalidComponent } from './walid.component';

describe('WalidComponent', () => {
  let component: WalidComponent;
  let fixture: ComponentFixture<WalidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
