import {Injectable} from '@angular/core';
import {BlackListI} from '../constants/black-list.interface';
import { HttpClient } from '@angular/common/http';
import { isArray } from 'util';
import { environment } from '@env/environment';

@Injectable({providedIn: "root"})
export class BlackListStore {

  public blackListValues: BlackListI[];
  public isFinishedClearing: boolean;
  public baseUrl: string = environment.backend.baseUrl;
  public totalRecords: number;
  public currentPage: number;
  public lastPage: number;
  public loading: boolean;

  constructor(private http: HttpClient) {
  }


  public getBlackListJson(payload?: number | string): void {
    this.loading = true;
    this.http.get(`${this.baseUrl}blacklist-prodcucts/page/${payload}`)
      .subscribe((res: any) => {
      this.blackListValues = res.data;
      this.currentPage = res.currentPage;
      this.totalRecords = res.totalrecords;
      this.lastPage = Math.round(this.totalRecords/50);
      this.isFinishedClearing = false;
      this.loading = false;
      })
  }

  public getBlackListByEanOrAsin(payload?: number | string): void {
    this.loading = true;
    this.http.get(`${this.baseUrl}blacklist-prodcucts/${payload.toString()}`)
      .subscribe((res: any) => {
        this.blackListValues = res.data;
        this.isFinishedClearing = false;
        this.loading = false;
      }, (err) => {
        this.isFinishedClearing = false;
        this.loading = false;
      })
  }

  addBlackListJson(blackList) {
    const body = {data: isArray(blackList) ? blackList : [{asin: "", ...blackList}]}
    return this.http.post(`${this.baseUrl}blacklist-prodcucts`, body)
  }

  public removeBlackListJson(blackListItem?: any) {
    return this.http.delete(`${this.baseUrl}blacklist-prodcucts${blackListItem ? '/'+blackListItem.id : ''}`)
  }
}
