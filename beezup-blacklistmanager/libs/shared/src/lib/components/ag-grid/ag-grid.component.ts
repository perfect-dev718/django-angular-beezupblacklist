import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GridOptions} from 'ag-grid-community/main';
import {defaults, isNil} from 'lodash';

const DEFAULT_OPTIONS: GridOptions = {
  paginationPageSize: 50,
  maxConcurrentDatasourceRequests: 2,
  headerHeight: 50,
  suppressAutoSize: true,
  colWidth: 150,
  rowHeight: 50
};

export const DEFAULT_COLUMN_OPTIONS = {
  sortable: true,
  filter: true,
  resizable: true
};

@Component({
  selector: 'tr-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnInit {

  @Input() backendSorting: boolean = false;
  @Input() rowData: any[];
  @Input() onGridReady = () => {
  };
  @Input() onColumnVisible;
  @Input() cellValueChanged;
  @Input() cellKeyPress;
  @Input() cellKeyDown;
  @Input() gridOptions = <GridOptions>{};
  @Input() columnDefs: any[];
  @Input() data: any[];
  @Input() isFullWidthCell: any;
  @Input() getRowHeight: any;
  @Input() getNodeChildDetails: any;
  @Input() fullWidthCellRendererFramework: any;
  @Input() expandedComponent: any;
  @Input() frameworkComponents: any;
  @Input() onSelectionChanged;
  @Input() rowSelection: string;
  @Input() toolPanel: string;
  @Input() tableHeight: string;
  @Input() tableWidth: string;
  @Input() suppressMenuHide: boolean;
  @Input() suppressRowClickSelection: boolean;
  /**
   * suppressFieldDotNotation should receive the false value if the table use headerComponentFramework
   */
  @Input() suppressFieldDotNotation: boolean;
  @Output() whenGridReady: EventEmitter<any> = new EventEmitter();
  @Output() whenCellValueChanged: EventEmitter<any> = new EventEmitter();
  @Output() columnVisible: EventEmitter<any> = new EventEmitter();
  @Output() onSorting = new EventEmitter();
  @Output() columnResize = new EventEmitter();
  private showToolPanel: boolean;
  public isNil: any = isNil;

  ngOnInit(): void {
    defaults(this.gridOptions, DEFAULT_OPTIONS);
    this.showToolPanel = false;
  }

  constructor() {
  }

  toggle() {
    this.showToolPanel = !this.showToolPanel;
    this.gridOptions.api.setSideBarVisible(this.showToolPanel);
    this.gridOptions.api.openToolPanel('columns');
    this.gridOptions.api.sizeColumnsToFit();
  }

  indicateSorting() {
    this.onSorting.emit();
  }

  public columnResized(e) {
    if (e.type === 'columnResized' && e.source !== 'sizeColumnsToFit' && e.finished) {
      this.columnResize.emit(e);
    }
  }

  getFullWidthCellRenderer() {
    return this.expandedComponent;
  }


}
