import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-ag-cell-link',
  templateUrl: './ag-cell-link.component.html',
  styleUrls: ['./ag-cell-link.component.scss']
})
export class AgCellLinkComponent implements OnInit {
  public value: any;
  private params: any;
  public href: string;
  constructor() { }

  agInit(params) {
    // console.log(params.colDef.field);
    this.params = params;
    this.value = params.value;
    switch (params.colDef.field) {
      case 'marketplace_order_number':
        this.href = `https://www.google.fr`
        break;
      case 'amazon_order_number':
        this.href = `https://www.google.com`
        break;

    }
  }

  ngOnInit() {
  }

}
