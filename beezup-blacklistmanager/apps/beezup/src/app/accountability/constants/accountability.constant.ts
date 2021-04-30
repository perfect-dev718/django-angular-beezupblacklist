import {AgCellLinkComponent} from "../../autobuy/ag-cells/ag-cell-link/ag-cell-link.component";

export const DEFAULT_GRID_OPTIONS = {
  rowSelection: 'multiple',
  getContextMenuItems: () => ['copy', 'copyWithHeaders', 'export'],
  pivotGroupHeaderHeight: 40,
  pivotHeaderHeight: 40,
  groupHeaderHeight: 40,
  floatingFiltersHeight: 40,
  // enableCharts: true,
  headerHeight: 42,
  rowHeight: 32,
  // suppressRowClickSelection: true,
  enableCellChangeFlash: true,
  animateRows: true,
  rowGroupPanelShow: 'always',
  pivotPanelShow: 'always',
  defaultColDef: {
    sortable: true,
    resizable: true,
    // rowGroup: true,
    enableRowGroup: true,
    editable: false,
    filter: true,
    minWidth: 120,
    flex: 1
  },
  frameworkComponents: {
    linkRenderer: AgCellLinkComponent
  },
  sideBar: {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {suppressSyncLayoutWithGrid: true},
      },
    ],
    defaultToolPanel: "columns"
  },
  overlayNoRowsTemplate: '<span class="ag-overlay-loading-center">No data to display</span>'
}

export const colDefs = [
  {
    headerName: 'Ean',
    field: 'ean',
    cellRenderer: 'agGroupCellRenderer',
    lockVisible: true,
    minWidth: 120,
    // headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true,
    sortable: true
  },
  {
    headerName: 'Asin',
    field: 'asin',
    minWidth: 120,
    sortable: true,
  },
  {
    headerName: 'Marketplace',
    field: 'marketplace',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Title',
    field: 'keepa_title',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Date',
    field: 'ordered_date',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Status',
    field: 'status',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'A_Order',
    field: 'amazon_order_number',
    cellRenderer: 'linkRenderer',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'M_Order',
    field: 'marketplace_order_number',
    cellRenderer: 'linkRenderer',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Price',
    field: 'price',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'A_Price',
    field: 'amazon_price',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Fees',
    field: 'commission_marketplace',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Profit',
    field: 'net_profit',
    minWidth: 120,
    sortable: true
  },

];

export const rowModelType = 'serverSide';

export interface accountabilityModel {
  ean: string;
  asin: string;
  marketplace: string;
  keepa_title: string;
  ordered_date: string;
  status: string;
  amazon_order_number: string;
  marketplace_order_number: string;
  price: string;
  amazon_price: string;
  commission_marketplace: string;
  net_profit: string;
}

export const mockData: accountabilityModel[] = [
  {
    ean: "5013873018299",
    asin: "B07B1WGVVM",
    marketplace: "CDISCOUNT",
    keepa_title: "MARLIES MÖLLER Specialists UV-light & Pollution Protect Hairspray/ Spray Coiffant, 125ml",
    ordered_date: "27/11/2020",
    status: "SUCCESS",
    amazon_order_number: "",
    marketplace_order_number: "2011082133QMBM1",
    price: "20.45",
    amazon_price: "14.23",
    commission_marketplace: "0.43",
    net_profit: "2.32",
  },
  {
    ean: "5013873018299",
    asin: "B07B1WGVVM",
    marketplace: "CDISCOUNT",
    keepa_title: "MARLIES MÖLLER Specialists UV-light & Pollution Protect Hairspray/ Spray Coiffant, 125ml",
    ordered_date: "27/11/2020",
    status: "ERROR: ADDRESS IS NOT RECOGNIZED BY AMAZON",
    amazon_order_number: "",
    marketplace_order_number: "2011082133QMBM1",
    price: "20.45",
    amazon_price: "14.23",
    commission_marketplace: "0.43",
    net_profit: "2.32",
  },
  {
    ean: "5013873018299",
    asin: "B07B1WGVVM",
    marketplace: "CDISCOUNT",
    keepa_title: "MARLIES MÖLLER Specialists UV-light & Pollution Protect Hairspray/ Spray Coiffant, 125ml",
    ordered_date: "27/11/2020",
    status: "ERROR: CREDIT CARD WAS NOT ACCEPTED",
    amazon_order_number: "",
    marketplace_order_number: "2011082133QMBM1",
    price: "20.45",
    amazon_price: "14.23",
    commission_marketplace: "0.43",
    net_profit: "2.32",
  },
];
