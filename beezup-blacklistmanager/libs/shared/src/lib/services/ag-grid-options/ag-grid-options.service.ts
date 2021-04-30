import {Injectable} from '@angular/core';
import {convert, DateTimeFormatter, LocalDateTime} from 'js-joda';
import {debounce, isNumber, isString, isEmpty, sortBy} from 'lodash';

// import {TranslateService} from '@ngx-translate/core';

import {ChartType, GridApi} from "ag-grid-community";
// import {ToasterService} from "@tr-libs/toaster/src/lib/service/toaster.service";

const ENABLE_RESIZE_EVENTS = ['columnVisible', 'toggleToolsPanel', 'notesPanel'];
const RANGE_CHART_PARAMS = (count, chartContainer, type, columns = [], options = []) => {
  return chartContainer ? {
    cellRange: {
      columns: columns,
      columnStart: '',
      rowStartIndex: 0,
      rowEndIndex: count
    },
    chartContainer: chartContainer,
    chartType: type,
    suppressChartRanges: false,
    processChartOptions: (params) => {
      let overriddenChartOptions = params.options;
      if (options) {
        overriddenChartOptions = options
      }
      return overriddenChartOptions;
    }
  } : null;
};

@Injectable()
export class AgGridOptionsUtils {
  private readonly invalidDateMsg: any;


  static getFilterParams(field, invalidDateMsg?) {
    return field.type === 'Date/Time' ? {
      comparator: (filterLocalDateAtMidnight, cellValue) => { // create a Date object for comparison  filter date
        const dateFormatter = DateTimeFormatter.ofPattern(field.dateTimeFormat);
        const localDateTime = LocalDateTime.parse(cellValue, dateFormatter);
        const cellDate = convert(localDateTime).toDate();

        if (cellDate.toString() === 'Invalid Date') {
          if (invalidDateMsg) {
            invalidDateMsg();
          }
          return -1;
        }

        cellDate.setHours(0);
        cellDate.setMinutes(0);
        cellDate.setSeconds(0);

        if (cellDate < filterLocalDateAtMidnight) { // Now that both parameters are Date objects, we can compare
          return -1;
        } else if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        } else {
          return 0;
        }
      },
      clearButton: true
    } : {};
  }

  /**
   * resizeTable - resize table colums in specific cases
   * @param e - grid event
   * @param gridApi - grid instance
   */
  static resizeTable(gridApi, e?) {
    if (gridApi) {
      const viewPort: any = document.getElementsByClassName('ag-body-viewport')[0];
      const agGridContainer: any = document.getElementsByClassName('ag-center-cols-container')[0];
      if (agGridContainer && viewPort?.offsetWidth >= agGridContainer.offsetWidth && ENABLE_RESIZE_EVENTS.includes(e?.type)
        || !e) {
        setTimeout(() => {
          gridApi.sizeColumnsToFit();
        });
      }
    }
  }

  static autosizeGroupColumns(gridColumnApi) {
    if (gridColumnApi?.columnController?.groupAutoColumns) {
      const allColumnIds = [];
      gridColumnApi.columnController.groupAutoColumns.forEach((column) => {
        allColumnIds.push(column.colId);
      });
      setTimeout(() => {
        gridColumnApi.autoSizeColumns(allColumnIds);
      });
    }
  }

  /**
   *
   * @param row
   */
  static toggleFocuedRow(row): void {
    const ROW_INDEX = 1;
    const rowElement = document.querySelectorAll(`[row-index="${row.rowIndex}"]`)[ROW_INDEX];
    if (rowElement.classList.contains('ag-row-focused')) {
      rowElement.classList.remove('ag-row-focused');
    } else {
      rowElement.classList.add('ag-row-focused');
    }
  }


  /**
   * expend or collapse all groups rows by isExpended
   * every apply of new layout the group column will be minimized - this is why we use autosizeGroupColumns
   * @param gridApi
   * @param isExpended - groups expected state
   */
  static toggleGroups(gridApi, isExpended: boolean) {
    if (gridApi && gridApi.columnController.rowGroupColumns.length) {
      isExpended ? gridApi.expandAll() : gridApi.collapseAll();
    }
  }


  constructor(
    // private translateService: TranslateService,
              // private toasterService: ToasterService
  ) {
    // this.invalidDateMsg = debounce(() => {
    //   this.translateService.get('transactions.wrong_date_format').subscribe((res: string) => {
    //     this.toasterService.createToasterMessage({success: res});
    //   });
    // }, 300);
  }

  // public getLocaleFormatting() {
  //   return this.translateService.getBrowserLang();
  // }


  public isAllGroupsExpended(gridApi): boolean {
    let isExpended = true;
    if (gridApi.columnController.rowGroupColumns.length) {
      gridApi.forEachNode((rowNode) => {
        if (rowNode.group && !rowNode.expanded) {
          isExpended = false;
        }
      });
    }
    return isExpended;
  }

  private getChartElementContainer(index, containerIndex?): HTMLElement {
    return document.querySelector(`#chart-container-body-${index}-table-${containerIndex || '0'}`);
  }

  /**
   * create empty chart to index container
   * @param index
   */
  public createChart(gridApi: GridApi, index: number, containerIndex?: number) {
    const chartContainer = this.getChartElementContainer(index, containerIndex);
    const count = gridApi.getDisplayedRowCount();
    const chartParams = RANGE_CHART_PARAMS(count, chartContainer, ChartType.GroupedColumn); //{ // TODO:: type CreateRangeChartParams
    return chartParams ? gridApi.createRangeChart(chartParams) : null;
  }

  /**
   * duplicate chart to index container by the opposite container
   * @param gridApi
   * @param index
   * @param containerIndex
   */
  public duplicateChart(gridApi: GridApi, index: number, containerIndex?: number) {
    const chartContainer = this.getChartElementContainer(index, containerIndex);
    const count = gridApi.getDisplayedRowCount();
    const duplicatedChart: any = gridApi.getChartModels();
    if (duplicatedChart[0]) {
      const chartParams = RANGE_CHART_PARAMS(count, chartContainer, duplicatedChart[0].chartType, duplicatedChart[0].cellRange.columns, duplicatedChart[0].chartOptions);
      return chartParams ? gridApi.createRangeChart(chartParams) : null;
    }
    return null;
  }

  public applyCharts(gridApi, chartsMetadata, elementContainer) {
    if (gridApi && chartsMetadata && !isEmpty(chartsMetadata)) {
      const count = gridApi.getDisplayedRowCount();
      return chartsMetadata.map((chart, index) => {
        if (chart && chart.chartType && chart.cellRange.columns) {
          const chartContainer = this.getChartElementContainer(index, elementContainer);
          /** delete this values in order to support competability of ag grid **/
          delete chart.chartOptions.width;
          delete chart.chartOptions.height;
          const chartParams = RANGE_CHART_PARAMS(count, chartContainer, chart.chartType, chart.cellRange.columns, chart.chartOptions);
          return chartParams && chartContainer ? gridApi.createRangeChart(chartParams) : null;
        }
      })
    }
  }

  /**
   * in case group is resize do not save layout as recent for the reason
   * many automatic proccess is resize this column and not by the user
   * @param e
   */
  public isGroupResized(e): boolean {
    return e && e.type === 'columnResized' && e.columns.length === 1 && e.columns[0].colId === 'ag-Grid-AutoColumn';
  }

  /**
   * sort Panel Columns by alphabet
   */
  static sortPanelColumns(gridApi, columnDefs) {
    const columnToolPanel = gridApi.getToolPanelInstance('columns');
    const colDefs = sortBy(columnDefs, [(col) => col.headerName.toLowerCase()]);
    columnToolPanel?.setColumnLayout(colDefs);
  }

}
