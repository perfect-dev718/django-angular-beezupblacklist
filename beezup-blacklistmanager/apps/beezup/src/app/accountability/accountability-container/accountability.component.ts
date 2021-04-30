import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GridOptions} from "ag-grid-community";
import {ServerSideRowModelModule} from "@ag-grid-enterprise/server-side-row-model";
import {MenuModule} from "@ag-grid-enterprise/menu";
import {ColumnsToolPanelModule} from "@ag-grid-enterprise/column-tool-panel";
import {colDefs, DEFAULT_GRID_OPTIONS, rowModelType, mockData} from "../constants/accountability.constant";
import {HttpClient} from "@angular/common/http";
import {FakeServer} from "../../repricer/constants/fakeServer";
import {createServerSideDatasource} from "../../../../../../libs/shared/src/lib/utils/fakeServAgGrid";
import {AgGridOptionsUtils} from "../../../../../../libs/shared/src/lib/services/ag-grid-options/ag-grid-options.service";
import {ClipboardModule} from '@ag-grid-enterprise/clipboard';
import {ExcelExportModule} from '@ag-grid-enterprise/excel-export';

@Component({
  selector: 'beezup-accountability',
  templateUrl: './accountability.component.html',
  styleUrls: ['./accountability.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountabilityComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  public gridOptions: GridOptions = DEFAULT_GRID_OPTIONS;
  public modules: any[] = [
    ServerSideRowModelModule,
    MenuModule,
    ColumnsToolPanelModule,
    ClipboardModule,
    ExcelExportModule
  ];
  public columnDefs = colDefs;
  public rowModelType = rowModelType;

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  public onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getData()
  }

  private getData(): void {
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
