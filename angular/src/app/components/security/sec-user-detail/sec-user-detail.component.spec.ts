import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecUserDetailComponent } from './sec-user-detail.component';

describe('SecUserDetailComponent', () => {
  let component: SecUserDetailComponent;
  let fixture: ComponentFixture<SecUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecUserDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
