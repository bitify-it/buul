import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegozioDetailComponent } from './negozio-detail.component';

describe('NegozioDetailComponent', () => {
  let component: NegozioDetailComponent;
  let fixture: ComponentFixture<NegozioDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegozioDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NegozioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
