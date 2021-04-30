import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningWithIconComponent } from './warning-with-icon.component';

xdescribe('WarningWithIconComponent', () => {
  let component: WarningWithIconComponent;
  let fixture: ComponentFixture<WarningWithIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningWithIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningWithIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

