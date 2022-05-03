import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecRoleComponent } from './sec-role.component';

describe('SecRoleComponent', () => {
  let component: SecRoleComponent;
  let fixture: ComponentFixture<SecRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
