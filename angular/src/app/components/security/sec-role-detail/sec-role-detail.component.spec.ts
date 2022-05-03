import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecRoleDetailComponent } from './sec-role-detail.component';

describe('SecRoleDetailComponent', () => {
  let component: SecRoleDetailComponent;
  let fixture: ComponentFixture<SecRoleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecRoleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecRoleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
