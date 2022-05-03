import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecPrivilegeComponent } from './sec-privilege.component';

describe('SecPrivilegeComponent', () => {
  let component: SecPrivilegeComponent;
  let fixture: ComponentFixture<SecPrivilegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecPrivilegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
