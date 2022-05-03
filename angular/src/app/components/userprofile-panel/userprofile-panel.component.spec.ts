import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofilePanelComponent } from './userprofile-panel.component';

describe('UserprofilePanelComponent', () => {
  let component: UserprofilePanelComponent;
  let fixture: ComponentFixture<UserprofilePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserprofilePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofilePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
