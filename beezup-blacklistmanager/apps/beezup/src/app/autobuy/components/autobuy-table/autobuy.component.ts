import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GridOptions} from "ag-grid-community";
import {ServerSideRowModelModule} from "@ag-grid-enterprise/server-side-row-model";
import {MenuModule} from "@ag-grid-enterprise/menu";
import {ColumnsToolPanelModule} from "@ag-grid-enterprise/column-tool-panel";
import {HttpClient} from "@angular/common/http";
import {AgGridOptionsUtils} from "../../../../../../../libs/shared/src/lib/services/ag-grid-options/ag-grid-options.service";
import {FakeServer} from "../../../repricer/constants/fakeServer";
import {colDefs, DEFAULT_GRID_OPTIONS, mockData1, rowModelType, mockData} from "../../constants/autobuy.constant";
import {createServerSideDatasource} from "../../../../../../../libs/shared/src/lib/utils/fakeServAgGrid";
import {ClipboardModule} from "@ag-grid-enterprise/clipboard";
import {ExcelExportModule} from "@ag-grid-enterprise/excel-export";
import {AutobuyStore} from "../../autobuy-store/autobuy.store";
import {IReactionDisposer, reaction} from "mobx";
import {Subscription} from "rxjs";


@Component({
  selector: 'beezup-autobuy',
  templateUrl: './autobuy.component.html',
  styleUrls: ['./autobuy.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutobuyComponent implements OnInit {
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
  public isActiveOrders: boolean = true;

  private reconnectUnsub: IReactionDisposer;
  private subMessages: Subscription;

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef, private autoBuyStore: AutobuyStore) { }

  ngOnInit(): void {
    // this.openSocketConnection();
  }

  // private openSocketConnection() {
  //   this.autoBuyStore.openOrdersStream()
  //     .then(() => {
  //       this.reconnectEvent();
  //       this.getSocketUpdate();
  //     });
  // }
  //
  // private getSocketUpdate() {
  //   this.subMessages = this.autoBuyStore.getOrdersMessages().subscribe((orders) => {
  //     this.updateNotifications(notification);
  //   });
  // }
  //
  // private reconnectEvent() {
  //   this.reconnectUnsub = reaction(() => this.autoBuyStore.socketService.reconnect,
  //     () => {
  //       this.subMessages?.unsubscribe();
  //       setTimeout(() => this.getSocketUpdate());
  //     })
  // }
  //
  // ngOnDestroy(): void {
  //   this.autoBuyStore.closeSocket(true);
  //   if (this.reconnectUnsub) {
  //     this.reconnectUnsub();
  //   }
  //   this.subMessages?.unsubscribe();
  // }

  public toggleTableMode(): void {
    this.isActiveOrders = !this.isActiveOrders;
    this.getData(this.isActiveOrders ? 'url1' : 'url2')
  }

  public onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getData(this.isActiveOrders ? 'url1' : 'url2')
    //send ws message to get orders

  }

  private getData(url?): void {
    console.log(url);
    this.http
      .get(
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json'
      )
      .subscribe(data => {
        console.log(data);
        var fakeServer = FakeServer(this.isActiveOrders ? mockData : mockData1);
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
