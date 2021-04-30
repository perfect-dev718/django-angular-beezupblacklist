import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'tr-ag-cell-productInfo',
  templateUrl: './ag-cell-productInfo.component.html',
  styleUrls: ['./ag-cell-productInfo.component.scss']
})
export class AgCellProductInfoComponent implements OnInit {
  public value: any;
  private params: any;
  constructor(private router: Router, private route: ActivatedRoute) { }

  agInit(params) {
    // console.log(params.colDef.field);
    this.params = params;
    this.value = params.value;
  }

  ngOnInit() {
  }

  public goToOrderInfoPage(): void  {
    this.router.navigate([`order-info`], {queryParams: {orderId: this.params.data.marketplace_order_number},relativeTo : this.route})
  }

}
