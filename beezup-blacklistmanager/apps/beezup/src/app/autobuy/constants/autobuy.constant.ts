import {AgCellLinkComponent} from "../ag-cells/ag-cell-link/ag-cell-link.component";
import {AgCellActionsComponent} from "../ag-cells/ag-cell-actions/ag-cell-actions.component";
import {AgCellProductInfoComponent} from "../ag-cells/ag-cell-productInfo/ag-cell-productInfo.component";

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
    linkRenderer: AgCellLinkComponent,
    productInfoRenderer: AgCellProductInfoComponent,
    actionRenderer: AgCellActionsComponent,
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
    field: 'autobuy_id',
    cellRenderer: 'agGroupCellRenderer',
    lockVisible: true,
    minWidth: 120,
    // headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true,
    sortable: true
  },
  {
    headerName: 'Ean',
    field: 'ean',
    minWidth: 120,
    sortable: true,
    cellRenderer: 'productInfoRenderer'
  },
  {
    headerName: 'Asin',
    field: 'asin',
    minWidth: 120,
    sortable: true,
  },
  {
    headerName: 'Price',
    field: 'price',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Marketplace',
    field: 'marketplace',
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
    headerName: 'A_Order',
    field: 'amazon_order_number',
    cellRenderer: 'linkRenderer',
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
    headerName: 'Messages',
    field: 'number_messages',
    minWidth: 120,
    sortable: true,
  },
  {
    headerName: 'A_Price',
    field: 'amazon_price',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Profit',
    field: 'net_profit',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'date',
    field: 'ordered_date',
    minWidth: 120,
    sortable: true
  },
  {
    headerName: 'Actions',
    field: 'actions',
    cellRenderer: 'actionRenderer',
    minWidth: 280,
    sortable: true
  }
];

export const rowModelType = 'serverSide';

export enum actionWS {
  GetActiveOrders= 'GetActiveOrders',
  GetHistoryOrders= 'GetHistoryOrders',
  ConfirmOrder= 'ConfirmOrder'
}

export enum typeWS {
  Ping = 'Ping',
  TraceBackData = 'TraceBackData'
}

export interface OrderStreamWS {
  rows: AutoBuyModel[];
  action: actionWS;
  lastRow: number;
}

export interface ConfirmOrderActionSendWS {
  action: actionWS;
  autobuy_action: Actions;
  marketplace_order_number: string;
}


// we pass a VO (Value Object) of the column and not the column itself,
// so the data can be converted to a JSON string and passed to server-side
interface ColumnVO {
  id: string;
  displayName: string;
  field: string;
  aggFunc: string;
}

export interface GetOrdersActionSendWS {
  action: actionWS;
  type: typeWS;
  // first row requested
  startRow?: number;

  // last row requested
  endRow?: number;

  // row group columns
  rowGroupCols?: ColumnVO[];

  // value columns
  valueCols?: ColumnVO[];

  // pivot columns
  pivotCols?: ColumnVO[];

  // true if pivot mode is one, otherwise false
  pivotMode?: boolean;

  // what groups the user is viewing
  groupKeys?: string[];

  // if filtering, what the filter model is
  filterModel?: any;

  // if sorting, what the sort model is
  sortModel?: any;
}

export interface PingWS {
  type: typeWS.Ping;
}


export interface AutoBuyModel {  //this is model for table active and history mysql // ? means optional
  autobuy_id: string;
  ean: string;
  asin: string;
  price: string;
  marketplace: string;
  marketplace_order_number: string;
  amazon_order_number: string;
  status: Status;
  number_messages: number;
  amazon_price: string;
  net_profit: string;
  ordered_date: string;
  marketplace_fees: string;
  marketplace_discussion: Disccusion;
  autobuy_action?: Actions;
  autobuy_status?: string;
}

export enum Status {
  NONE= "NONE",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED"
}

export enum Actions {
  REVIEWED= "REVIEWED",
  REFUSED = "REFUSED",
  CONFIRMED = "CONFIRMED"
}

export enum SenderType {
  SELLER= 'SELLER',
  BUYER = 'BUYER'
}

export interface Message {
  senderType: SenderType;
  content: string;
  sender: string;
  timestamp: number;
}

export interface Disccusion {
  messages: Message[];
  subject: string;
  status: string;
  order_number: string;
  discussion_id: string;
  encrypted_email: string;
  creation_date: string;
  last_update_date: string;
}


export const mockData: AutoBuyModel[] = [
  {
    autobuy_id: "0",
    ean: "5013873018299",
    asin: "B07B1WGVVM",
    price: "20.45",
    marketplace: "CDISCOUNT",
    marketplace_order_number: "2011082133QMBM1",
    amazon_order_number: "",
    status: Status.NONE,
    number_messages: 3,
    amazon_price: "14.23",
    net_profit: "2.32",
    ordered_date: "27/11/2020",
    autobuy_action: null,
    marketplace_fees: "2.35",
    marketplace_discussion: {
      messages: [{
        content: "Commande livrée Votre commande Réf.FZN33-29720100486 vient d\\'être livrée. Afin d\\'améliorer le service Societe, &#xD;\n" +
          "veuillez nous confirmer la bonne réception de votre commande et donner votre avis&#xD;\n" +
          "(C\\'est important sinon nous ne pouvons pas savoir si vous avez été satisfait(e)).Pour cela Copier-coller le lien suivant dans un navigateur internet : Merci de votre confiance.Vous pouvez à tout moment consulter le suivi de livraison ou bien nous",
        senderType: SenderType.SELLER,
        sender: "CHALOM D",
        timestamp: 12132154546
      },
        {
          content: "Commande livrée Votre commande Réf.FZN33-29720100486 vient d\\'être livrée. Afin d\\'améliorer le service Societe, &#xD;\n" +
            "veuillez nous confirmer la bonne réception de votre commande et donner votre avis&#xD;\n" +
            "(C\\'est important sinon nous ne pouvons pas savoir si vous avez été satisfait(e)).Pour cela Copier-coller le lien suivant dans un navigateur internet : Merci de votre confiance.Vous pouvez à tout moment consulter le suivi de livraison ou bien nous",
          senderType: SenderType.BUYER,
          sender: "JEAN DUPONT",
          timestamp: 12132154578
        }],
      subject: "Suivi de commande",
      status: "Open",
      order_number: "130427200ee225rt",
      discussion_id: "652270",
      encrypted_email: "12134654873431@@9i93!@",
      creation_date: "27/12/2020",
      last_update_date: "28/12/2020"
    }
  },
];

export const mockData1: AutoBuyModel[] = [
  {
    autobuy_id: "0",
    ean: "5013873018299",
    asin: "B07B1WGVVM",
    price: "20.45",
    marketplace: "CDISCOUNT",
    marketplace_order_number: "2011082133QMBM1",
    amazon_order_number: "",
    status: Status.NONE,
    number_messages: 3,
    amazon_price: "14.23",
    net_profit: "2.32",
    ordered_date: "27/11/2020",
    autobuy_action: null,
        marketplace_fees: "2.35",
    marketplace_discussion: {
      messages: [{
        content: "Commande livrée Votre commande Réf.FZN33-29720100486 vient d\\'être livrée. Afin d\\'améliorer le service Societe, &#xD;\n" +
          "veuillez nous confirmer la bonne réception de votre commande et donner votre avis&#xD;\n" +
          "(C\\'est important sinon nous ne pouvons pas savoir si vous avez été satisfait(e)).Pour cela Copier-coller le lien suivant dans un navigateur internet : Merci de votre confiance.Vous pouvez à tout moment consulter le suivi de livraison ou bien nous",
        senderType: SenderType.SELLER,
        sender: "CHALOM D",
        timestamp: 12132154546
      },
        {
          content: "Commande livrée Votre commande Réf.FZN33-29720100486 vient d\\'être livrée. Afin d\\'améliorer le service Societe, &#xD;\n" +
            "veuillez nous confirmer la bonne réception de votre commande et donner votre avis&#xD;\n" +
            "(C\\'est important sinon nous ne pouvons pas savoir si vous avez été satisfait(e)).Pour cela Copier-coller le lien suivant dans un navigateur internet : Merci de votre confiance.Vous pouvez à tout moment consulter le suivi de livraison ou bien nous",
          senderType: SenderType.BUYER,
          sender: "JEAN DUPONT",
          timestamp: 12132154578
        }],
      subject: "Suivi de commande",
      status: "Open",
      order_number: "130427200ee225rt",
      discussion_id: "652270",
      encrypted_email: "12134654873431@@9i93!@",
      creation_date: "27/12/2020",
      last_update_date: "28/12/2020"
    }
  },
  {
    autobuy_id: "1",
    ean: "5013873018299",
    asin: "B07B1WGVVM",
    price: "20.45",
    marketplace: "CDISCOUNT",
    marketplace_order_number: "2011082133QMBM1",
    amazon_order_number: "",
    status: Status.NONE,
    number_messages: 3,
    amazon_price: "14.23",
    net_profit: "2.32",
    ordered_date: "27/11/2020",
    autobuy_action: null,
        marketplace_fees: "2.35",
    marketplace_discussion: {
      messages: [{
        content: "Commande livrée Votre commande Réf.FZN33-29720100486 vient d\\'être livrée. Afin d\\'améliorer le service Societe, &#xD;\n" +
          "veuillez nous confirmer la bonne réception de votre commande et donner votre avis&#xD;\n" +
          "(C\\'est important sinon nous ne pouvons pas savoir si vous avez été satisfait(e)).Pour cela Copier-coller le lien suivant dans un navigateur internet : Merci de votre confiance.Vous pouvez à tout moment consulter le suivi de livraison ou bien nous",
        senderType: SenderType.SELLER,
        sender: "CHALOM D",
        timestamp: 12132154546
      },
        {
          content: "Commande livrée Votre commande Réf.FZN33-29720100486 vient d\\'être livrée. Afin d\\'améliorer le service Societe, &#xD;\n" +
            "veuillez nous confirmer la bonne réception de votre commande et donner votre avis&#xD;\n" +
            "(C\\'est important sinon nous ne pouvons pas savoir si vous avez été satisfait(e)).Pour cela Copier-coller le lien suivant dans un navigateur internet : Merci de votre confiance.Vous pouvez à tout moment consulter le suivi de livraison ou bien nous",
          senderType: SenderType.BUYER,
          sender: "JEAN DUPONT",
          timestamp: 12132154578
        }],
      subject: "Suivi de commande",
      status: "Open",
      order_number: "130427200ee225rt",
      discussion_id: "652270",
      encrypted_email: "12134654873431@@9i93!@",
      creation_date: "27/12/2020",
      last_update_date: "28/12/2020"
    }
  },
  {
    autobuy_id: "2",
    ean: "5013873018299",
    asin: "B07B1WGVVM",
    price: "20.45",
    marketplace: "CDISCOUNT",
    marketplace_order_number: "2011082133QMBM1",
    amazon_order_number: "",
    status: Status.NONE,
    number_messages: 3,
    amazon_price: "14.23",
    net_profit: "2.32",
    ordered_date: "27/11/2020",
    autobuy_action: null,
        marketplace_fees: "2.35",
    marketplace_discussion: {
      messages: [{
        content: "Commande livrée Votre commande Réf.FZN33-29720100486 vient d\\'être livrée. Afin d\\'améliorer le service Societe, &#xD;\n" +
          "veuillez nous confirmer la bonne réception de votre commande et donner votre avis&#xD;\n" +
          "(C\\'est important sinon nous ne pouvons pas savoir si vous avez été satisfait(e)).Pour cela Copier-coller le lien suivant dans un navigateur internet : Merci de votre confiance.Vous pouvez à tout moment consulter le suivi de livraison ou bien nous",
        senderType: SenderType.SELLER,
        sender: "CHALOM D",
        timestamp: 12132154546
      },
        {
          content: "Commande livrée Votre commande Réf.FZN33-29720100486 vient d\\'être livrée. Afin d\\'améliorer le service Societe, &#xD;\n" +
            "veuillez nous confirmer la bonne réception de votre commande et donner votre avis&#xD;\n" +
            "(C\\'est important sinon nous ne pouvons pas savoir si vous avez été satisfait(e)).Pour cela Copier-coller le lien suivant dans un navigateur internet : Merci de votre confiance.Vous pouvez à tout moment consulter le suivi de livraison ou bien nous",
          senderType: SenderType.BUYER,
          sender: "JEAN DUPONT",
          timestamp: 12132154578
        }],
      subject: "Suivi de commande",
      status: "Open",
      order_number: "130427200ee225rt",
      discussion_id: "652270",
      encrypted_email: "12134654873431@@9i93!@",
      creation_date: "27/12/2020",
      last_update_date: "28/12/2020"
    }
  }
];

export interface OrderInfo {
  general: {
    asin: string;  //table active or history order (find by marketplace_order_number)
    ean: string; //table active or history order (find by marketplace_order_number)
    amazon_price: string; //table active or history order (find by marketplace_order_number)
    price: string; //table active or history order (find by marketplace_order_number)
    amazon_order_number: string; //table active or history order (find by marketplace_order_number)
    marketplace_order_number: string; //table active or history order (find by marketplace_order_number)
    status: Status; //table active or history order (find by marketplace_order_number)
  };
  marketplace: {
    marketplace_name: string; //table active or history order (find by marketplace_order_number)
    marketplace_product_title: string; //table cdiscount_brands under field name
    marketplace_product_brand: string; //table cdiscount_brands under field brand
    marketplace_product_main_image: string; //leave it empty for now
    marketplace_price: string; //table active or history order (find by marketplace_order_number)
    marketplace_fees: string; //table active or history order (find by marketplace_order_number)
    marketplace_discussion: Disccusion; //table active or history order (find by marketplace_order_number)
  };
  keepa: {
    keepa_product_title: string; // table catalog
    keepa_product_brand: string; // table catalog
    keepa_product_description: string; // table catalog
    keepa_product_main_image: string; // table catalog
    keepa_price: string; // table catalog
  }
}

export const mockOrder = {
  general: {
    asin: "B07B1WGVVM",
    ean: "5013873018299",
    amazon_price: "16.5",
    price: "24.73",
    amazon_order_number: "405-9828054-1495529",
    marketplace_order_number: "2011082130QMNHP",
    status: Status.SHIPPED,
  },
  marketplace: {
    marketplace_name: "CDISCOUNT",
    marketplace_product_title: "MARLIES MÖLLER Specialists UV-light & Pollution Protect",
    marketplace_product_brand: "BOUGNOUL",
    marketplace_product_description: "À propos de cet article\n" +
      "\n" +
      "\n" +
      "\n" +
      "Dimensions (L x L x H). 120 x 60 x 75 cm; couleur Blancs, noyer; Matériel: mélamine qualItalieé 18mm e1 fabriqué en Turquie (y compris les matières premières). Mélamine d'acétate de polyvinyle bande latérale 0,40 mm; Poids: 24,00; VerpackungsgrÃÃŸe: 128 x 66 x 9 cm (W x L x H).\n" +
      "\n" +
      "\n" +
      "\n" +
      "Fabriqué en:Turkey\n" +
      "\n" +
      "\n" +
      "\n" +
      "Couleur:Bianco - Noce\n" +
      "\n" +
      "\n" +
      "\n" +
      "matériel:Bois",
    marketplace_product_main_image: "amazon.com/images/I/51eWu5MyyfL._SL1500_.jpg",
    marketplace_price: "24.73",
    marketplace_fees: "2.35",
    net_profit: "1.57",
    marketplace_discussion: {
      messages: [{
        content: "Commande livrée Votre commande Réf.FZN33-29720100486 vient d\\'être livrée. Afin d\\'améliorer le service Societe, &#xD;\n" +
          "veuillez nous confirmer la bonne réception de votre commande et donner votre avis&#xD;\n" +
          "(C\\'est important sinon nous ne pouvons pas savoir si vous avez été satisfait(e)).Pour cela Copier-coller le lien suivant dans un navigateur internet : Merci de votre confiance.Vous pouvez à tout moment consulter le suivi de livraison ou bien nous",
        senderType: SenderType.SELLER,
        sender: "CHALOM D",
        timestamp: 12132154546
      },
        {
        content: "Commande livrée Votre commande Réf.FZN33-29720100486 vient d\\'être livrée. Afin d\\'améliorer le service Societe, &#xD;\n" +
          "veuillez nous confirmer la bonne réception de votre commande et donner votre avis&#xD;\n" +
          "(C\\'est important sinon nous ne pouvons pas savoir si vous avez été satisfait(e)).Pour cela Copier-coller le lien suivant dans un navigateur internet : Merci de votre confiance.Vous pouvez à tout moment consulter le suivi de livraison ou bien nous",
        senderType: SenderType.BUYER,
        sender: "JEAN DUPONT",
        timestamp: 12132154578
      }],
      subject: "Suivi de commande",
      status: "Open",
      order_number: "130427200ee225rt",
      discussion_id: "652270",
      encrypted_email: "12134654873431@@9i93!@",
      creation_date: "27/12/2020",
      last_update_date: "28/12/2020"
    }
  },
  keepa: {
    keepa_product_title: "MARLIES MÖLLER Specialists UV-light & Pollution Protect Hairspray/ Spray Coiffant, 125ml",
    keepa_product_brand: "CHANEL",
    keepa_product_description: "À propos de cet article\n" +
      "\n" +
      "\n" +
      "\n" +
      "Dimensions (L x L x H). 120 x 60 x 75 cm; couleur Blancs, noyer; Matériel: mélamine qualItalieé 18mm e1 fabriqué en Turquie (y compris les matières premières). Mélamine d'acétate de polyvinyle bande latérale 0,40 mm; Poids: 24,00; VerpackungsgrÃÃŸe: 128 x 66 x 9 cm (W x L x H).\n" +
      "\n" +
      "\n" +
      "\n" +
      "Fabriqué en:Turkey\n" +
      "\n" +
      "\n" +
      "\n" +
      "Couleur:Bianco - Noce\n" +
      "\n" +
      "\n" +
      "\n" +
      "matériel:Bois",
    keepa_product_main_image: "amazon.com/images/I/51eWu5MyyfL._SL1500_.jpg",
    keepa_price: "16.5",
  }
}


