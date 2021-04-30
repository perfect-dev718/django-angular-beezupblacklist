import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridDefualtHeaderComponent } from './ag-grid-defualt-header.component';

xdescribe('AgGridDefualtHeaderComponent', () => {
  let component: AgGridDefualtHeaderComponent;
  let fixture: ComponentFixture<AgGridDefualtHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridDefualtHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridDefualtHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
