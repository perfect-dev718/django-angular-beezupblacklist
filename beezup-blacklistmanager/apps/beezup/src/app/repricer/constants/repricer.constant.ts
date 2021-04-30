export const DEFAULT_GRID_OPTIONS = {
  rowSelection: 'multiple',
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
    headerName: 'Id',
    field: 'repricer_id',
    cellRenderer: 'agGroupCellRenderer',
    lockVisible: true,
    minWidth: 120,
    // headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true,
    sortable: true
  },
  {
    headerName: 'Link',
    field: 'repricer_item_link',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Price',
    field: 'repricer_item_price',
    minWidth: 120,
    sortable: true,
    editable: true,
  },
  {
    headerName: 'Competitor Price',
    field: 'repricer_item_competitor_lowest_price',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Min',
    field: 'repricer_min_price',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Max',
    field: 'repricer_max_price',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Status',
    field: 'repricer_status',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Algo',
    field: 'repricer_algo',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Marketplaces',
    field: 'repricer_marketplace',
    minWidth: 120,
    sortable: true,
  },
  {
    headerName: 'Competitors w/ Repricer',
    field: 'repricer_competitors_with_repricer',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Competitors',
    field: 'repricer_competitors',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Last Price Change',
    field: 'repricer_price_last_date_change',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Last Price Change Best Competitor',
    field: 'repricer_price_last_date_change_competitor',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'My Sells',
    field: 'repricer_own_sells',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Total Sells',
    field: 'repricer_total_sells',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Net Profit',
    field: 'repricer_net_profit',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Category',
    field: 'repricer_category',
    minWidth: 120,
    sortable: true
  },
];

export const rowModelType = 'serverSide';

export const mockData: RepricerModel[] = [
  {
    repricer_id: "0",
    repricer_item_link: "www.cdiscount.com/product/12345",
    repricer_item_price: "27,66",
    repricer_item_competitor_lowest_price: "27,67",
    repricer_min_price: "25,25",
    repricer_max_price: "32,50",
    repricer_status: true,
    repricer_algo: "BeatRepricer",
    repricer_marketplace: "CDISCOUNT",
    repricer_competitors_with_repricer: 3,
    repricer_competitors: 6,
    repricer_price_last_date_change: "27/08/2020",
    repricer_price_last_date_change_competitor: "26/08/2020",
    repricer_own_sells: 5,
    repricer_total_sells: 9,
    repricer_net_profit: "9,77",
    repricer_category: "ECOMMERCE"
  },
  {
    repricer_id: "1",
    repricer_item_link: "www.cdiscount.com/product/12345",
    repricer_item_price: "27,66",
    repricer_item_competitor_lowest_price: "27,67",
    repricer_min_price: "25,25",
    repricer_max_price: "32,50",
    repricer_status: true,
    repricer_algo: "BeatRepricer",
    repricer_marketplace: "RAKUTEN",
    repricer_competitors_with_repricer: 3,
    repricer_competitors: 6,
    repricer_price_last_date_change: "27/08/2020",
    repricer_price_last_date_change_competitor: "26/08/2020",
    repricer_own_sells: 5,
    repricer_total_sells: 9,
    repricer_net_profit: "9,77",
    repricer_category: "ECOMMERCE"
  },
  {
    repricer_id: "2",
    repricer_item_link: "www.cdiscount.com/product/12345",
    repricer_item_price: "27,66",
    repricer_item_competitor_lowest_price: "27,67",
    repricer_min_price: "25,25",
    repricer_max_price: "32,50",
    repricer_status: true,
    repricer_algo: "BeatRepricer",
    repricer_marketplace: "DARTY",
    repricer_competitors_with_repricer: 3,
    repricer_competitors: 6,
    repricer_price_last_date_change: "27/08/2020",
    repricer_price_last_date_change_competitor: "26/08/2020",
    repricer_own_sells: 5,
    repricer_total_sells: 9,
    repricer_net_profit: "9,77",
    repricer_category: "ECOMMERCE"
  },
  {
    repricer_id: "3",
    repricer_item_link: "www.cdiscount.com/product/12345",
    repricer_item_price: "27,66",
    repricer_item_competitor_lowest_price: "27,67",
    repricer_min_price: "25,25",
    repricer_max_price: "32,50",
    repricer_status: true,
    repricer_algo: "BeatRepricer",
    repricer_marketplace: "CDISCOUNT",
    repricer_competitors_with_repricer: 3,
    repricer_competitors: 6,
    repricer_price_last_date_change: "27/08/2020",
    repricer_price_last_date_change_competitor: "26/08/2020",
    repricer_own_sells: 5,
    repricer_total_sells: 9,
    repricer_net_profit: "9,77",
    repricer_category: "ECOMMERCE"
  },
  {
    repricer_id: "4",
    repricer_item_link: "www.cdiscount.com/product/12345",
    repricer_item_price: "27,66",
    repricer_item_competitor_lowest_price: "27,67",
    repricer_min_price: "25,25",
    repricer_max_price: "32,50",
    repricer_status: true,
    repricer_algo: "BeatRepricer",
    repricer_marketplace: "BOL",
    repricer_competitors_with_repricer: 3,
    repricer_competitors: 6,
    repricer_price_last_date_change: "27/08/2020",
    repricer_price_last_date_change_competitor: "26/08/2020",
    repricer_own_sells: 5,
    repricer_total_sells: 9,
    repricer_net_profit: "9,77",
    repricer_category: "ECOMMERCE"
  }
];

export interface RepricerModel {
  repricer_id: string;
  repricer_item_link: string;
  repricer_item_price: string;
  repricer_item_competitor_lowest_price: string;
  repricer_min_price: string;
  repricer_max_price: string;
  repricer_status: boolean;
  repricer_algo: string;
  repricer_marketplace: string;
  repricer_competitors_with_repricer: number;
  repricer_competitors: number;
  repricer_price_last_date_change: string;
  repricer_price_last_date_change_competitor: string;
  repricer_own_sells: number;
  repricer_total_sells: number;
  repricer_net_profit: string;
  repricer_category: string;
}
