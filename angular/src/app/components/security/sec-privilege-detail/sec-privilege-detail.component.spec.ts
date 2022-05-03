import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecPrivilegeDetailComponent } from './sec-privilege-detail.component';

describe('SecPrivilegeDetailComponent', () => {
  let component: SecPrivilegeDetailComponent;
  let fixture: ComponentFixture<SecPrivilegeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecPrivilegeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecPrivilegeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
