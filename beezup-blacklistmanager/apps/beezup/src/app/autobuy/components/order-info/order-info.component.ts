import { Component, OnInit } from '@angular/core';
import {AutobuyStore} from "../../autobuy-store/autobuy.store";

@Component({
  selector: 'beezup-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {

  constructor(public autobuyStore: AutobuyStore) { }

  ngOnInit(): void {
    console.log("orderInfo")
  }

}
