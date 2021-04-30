import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModalDialogComponent } from './main-modal-dialog.component';

xdescribe('MainModalDialogComponent', () => {
  let component: MainModalDialogComponent;
  let fixture: ComponentFixture<MainModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
