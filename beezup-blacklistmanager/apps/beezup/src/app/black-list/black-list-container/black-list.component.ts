import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BlackListStore } from '../black-list-store/black-list.store';
import { find } from 'lodash';
import { Papa } from 'ngx-papaparse';
import { MessageService, SelectItem } from 'primeng';
import {marketplaces} from '../constants/black-list.constant';


@Component({
  selector: 'beezup-black-list',
  templateUrl: './black-list.component.html',
  styleUrls: ['./black-list.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class BlackListComponent implements OnInit {
  public currentBlackList: string;
  public marketplaces: SelectItem[] = marketplaces;
  public selectedMarketPlace: string = marketplaces[0].value;
  private formatError: boolean;
  @ViewChild('uploader', { static: false }) uploader: any;
  public showErrorDuplicate: boolean;
  public filterPayload: string;
  @ViewChild('dv', {static: false}) dataTable: any;
  constructor(public blackListStore: BlackListStore,
              private parserCsv: Papa,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.blackListStore.getBlackListJson(1);
  }

  public lazyfilter(event): void {
    this.filterPayload = event;
    if (this.isValidFilter(this.filterPayload)) {
      this.loadData(null, this.filterPayload)
    }
    if (!this.filterPayload) {
      console.log(this.dataTable);
      this.setCurrentPage(this.blackListStore.currentPage);
      this.blackListStore.getBlackListJson(this.blackListStore.currentPage);
    }
  }

  public setCurrentPage(n: number) {
    let paging = {
      first: ((n - 1) * this.dataTable.rows),
      rows: this.dataTable.rows
    };
    this.dataTable.paginate(paging);
  }

  public loadData(event, filterPayload?: string): void {
    console.log(event);
    if (!event && filterPayload) {
      this.blackListStore.getBlackListByEanOrAsin(filterPayload);
    } else {
      this.blackListStore.getBlackListJson((event.first/50)+1);
    }
  }

  public isDuplicate(identifier, marketplace): void {
    this.currentBlackList = identifier;
    const findAsin = find(this.blackListStore.blackListValues, { asin: identifier, marketplace: marketplace || '' });
    const findEan = find(this.blackListStore.blackListValues, { ean: identifier, marketplace: marketplace || '' });
    this.showErrorDuplicate = !!(findEan || findAsin);
  }

  public addSingleToJson(identifier, marketplace): void {
    this.isDuplicate(identifier, marketplace);
    if (!this.showErrorDuplicate) {
      if (identifier.length === 10 && identifier.startsWith('B')) {
        const blackListItem = { asin: identifier, marketplace, ean: '' };
        this.blackListStore.isFinishedClearing = true;
        this.blackListStore.addBlackListJson(blackListItem).subscribe((res: any) => {
          if (res.success) {
            this.blackListStore.getBlackListJson(1);
            this.setCurrentPage(1);
          }
        });
      } else if (identifier.length === 13) {
        const blackListItem = { ean: identifier, marketplace, asin: '' };
        this.blackListStore.isFinishedClearing = true;
        this.blackListStore.addBlackListJson(blackListItem).subscribe((res: any) => {
          if (res.success) {
            this.blackListStore.getBlackListJson(1);
            this.setCurrentPage(1);
          }
        });
      } else if (identifier.length > 0) {
        this.messageService.add({
          severity: 'error', summary: `Format Error ${identifier}, can't be added`,
          life: 3000,
          detail: ''
        });
      }
    } else {
      this.messageService.add({
        severity: 'error', summary: `Duplicate Identifier ${identifier}, can't be added`,
        life: 3000,
        detail: ''
      });
    }
  }

  private isValidFilter(payloadfilter: string): boolean {
    return (payloadfilter.length === 10 && payloadfilter.startsWith('B')) ||
      (payloadfilter.length === 13 && !!Number(payloadfilter));

  }

  private isAsin(asin): string {
    if (asin.length === 10 && asin.startsWith('B')) {
      return asin;
    } else if (asin.length > 1) {
      console.log("format error asin : ", asin)

      this.formatError = true;
      return 'wrong asin format';
    } else {
      return null;
    }
  }

  private isEan(ean): string {
    if (ean.length === 13 && !!Number(ean)) {
      return ean;
    } else if (ean.length > 1) {
      console.log("format error ean : ", ean)
      this.formatError = true;
      return 'wrong ean format';
    } else {
      return null;
    }
  }

  public handleFileSelect(event): void {
    console.log(event);
    const blacklistList = [];
    const file = event.currentFiles[0]; // FileList object
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e: any) => {
      const csv = e.target.result; // Content of CSV file
      console.log(csv);
      this.parserCsv.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: (results) => {
          for (let i = 0; i < results.data.length; i++) {
            const blackListObj = {
              ean: this.isEan(results.data[i]?.ean.toUpperCase()) || '',
              asin: this.isAsin(results.data[i]?.asin.toUpperCase()) || '',
              marketplace: results.data[i]?.marketplace.toUpperCase() || null
            };
            if (this.formatError) {
              this.messageService.add({
                severity: 'error',
                summary: `Formatting Error ${blackListObj?.ean || blackListObj?.asin} at line ${i}`,
                detail: '',
                life: 3000
              });
              return;
            }
            this.isDuplicate(blackListObj?.ean || blackListObj?.asin, results.data[i]?.marketplace.toUpperCase());
            if (!this.showErrorDuplicate) {
              blacklistList.push(blackListObj);
            }
          }
          if (blacklistList.length) {
            this.blackListStore.isFinishedClearing = true;
            this.blackListStore.addBlackListJson(blacklistList).subscribe( (res: any) => {
              console.log(res);
              if (res.success) {
                this.blackListStore.getBlackListJson(1);
                //go last page
                this.setCurrentPage(1);
                if (!this.formatError && !this.showErrorDuplicate) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'File BlackListed Successfully',
                    detail: '',
                    life: 3000
                  });
                }
              }
            });

          } else {
            this.messageService.add({
              severity: 'info',
              summary: `Nothing to add`,
              life: 3000,
              detail: ''
            });
          }
          console.log('Parsed: k', results.data);
        }
      });
      this.reset();
      this.uploader.clear();
    };
  }

  public reset(): void {
    this.formatError = false;
    this.showErrorDuplicate = false;
  }


  public removeBlackListJson(item?): void {
    console.log(item);
    this.blackListStore.isFinishedClearing = true;
    this.blackListStore.removeBlackListJson(item).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.blackListStore.getBlackListJson(item ? this.blackListStore.currentPage : 1);
        this.setCurrentPage(item ? this.blackListStore.currentPage : 1);
      }
      this.blackListStore.isFinishedClearing = false;
    })
}



}
