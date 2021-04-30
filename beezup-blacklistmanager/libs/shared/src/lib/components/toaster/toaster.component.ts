import {Component, OnInit, ViewChild} from '@angular/core';
import {findIndex} from 'lodash';
import {Toast} from 'primeng/toast';
import {ToasterService} from '../../services/toaster/toaster.service';

@Component({
  selector: 'tr-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {
  @ViewChild('toaster', {static: false}) toaster: Toast;

  constructor(private toasterService: ToasterService) {
  }

  ngOnInit() {
  }

  /**
   * Find index in event and closing clicked toaster
   * @param event
   */
  public closeToaster(event: any) {
    const index = findIndex(this.toaster.messages, ['id', event]);
    this.toaster.messages.splice(index, 1);
    if (!this.toaster.messages.length) {
      this.toasterService.indexId = 0;
    }
  }

}
