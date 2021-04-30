import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AgGridOptionsUtils } from '../../../../../../libs/shared/src/lib/services/ag-grid-options/ag-grid-options.service';
import { HttpClient } from '@angular/common/http';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { colDefs, DEFAULT_GRID_OPTIONS, mockData, RepricerModel, rowModelType } from '../constants/repricer.constant';
import { GridOptions } from 'ag-grid-community';
import {FakeServer} from '../constants/fakeServer';
import {createServerSideDatasource} from "../../../../../../libs/shared/src/lib/utils/fakeServAgGrid";
// import '@ag-grid-community/core/dist/styles/ag-grid.css';
// import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';

@Component({
  selector: 'beezup-repricer',
  templateUrl: './repricer.component.html',
  styleUrls: ['./repricer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RepricerComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  public gridOptions: GridOptions = DEFAULT_GRID_OPTIONS;
  public modules: any[] = [
    ServerSideRowModelModule,
    MenuModule,
    ColumnsToolPanelModule,
  ];
  private columnDefs = colDefs;
  private rowModelType = rowModelType;
  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.http
      .get(
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json'
      )
      .subscribe(data => {
        var fakeServer = FakeServer(mockData);
        var datasource = createServerSideDatasource(fakeServer);
        // debugger
        this.gridApi.setServerSideDatasource(datasource);
        this.cdRef.detectChanges();
      });
  }

  private onGridGroupingChanged(table, e) {
    AgGridOptionsUtils.autosizeGroupColumns(table.gridColumnApi);
    this.onGridDataChanged(table, e);
  }

  private onShowHideColumn(table, e) {
    AgGridOptionsUtils.resizeTable(table.gridApi);
  }

  private onGridDataChanged(table, e) {
    if (e.type === 'filterChanged') {
      table.setFiltersTags(e);
    }
  }

}

