import {Component} from '@angular/core';

@Component({
  selector: 'tr-ag-grid-custom-header',
  templateUrl: './ag-grid-defualt-header.component.html',
  styleUrls: ['./ag-grid-defualt-header.component.scss']
})
export class AgGridDefualtHeaderComponent {
  public params: any;

  public ascSort: boolean = false;
  public descSort: boolean = false;
  public noSort: boolean = false;
  private currentSort = 'noSort';

  constructor() {
  }

  agInit(params): void {
    this.params = params;
    params.column.addEventListener('sortChanged', this.onSortChanged.bind(this));
    this.onSortChanged();
  }

  onSortChanged() {
    this.ascSort = this.descSort = this.noSort = false;
    if (this.params.column.isSortAscending()) {
      this.ascSort = true;
    } else if (this.params.column.isSortDescending()) {
      this.descSort = true;
    } else {
      this.noSort = true;
    }
  }

  onSortRequested(event) {
    switch (this.currentSort) {
      case'noSort':
        this.currentSort = 'asc';
        break;
      case 'asc':
        this.currentSort = 'desc';
        break;
      default:
        this.currentSort = 'noSort';
        break
    }
    this.params.setSort(this.currentSort, event.shiftKey);
  }
}
