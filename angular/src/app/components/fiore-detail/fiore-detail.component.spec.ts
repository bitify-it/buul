import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FioreDetailComponent } from './fiore-detail.component';

describe('FioreDetailComponent', () => {
  let component: FioreDetailComponent;
  let fixture: ComponentFixture<FioreDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FioreDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FioreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
