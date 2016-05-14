import { EventEmitter, Output } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { BaseComponent, ShiftTemplate, ShiftTemplateService } from '../../../shared/index';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import * as moment from 'moment';

@BaseComponent({
  selector: 'new-row',
  templateUrl: 'app/+shift-settings/components/new-row/new-row.html',
  styleUrls: ['app/+shift-settings/components/new-row/new-row.css'],
  directives: [TimepickerComponent, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class NewRow {
  @Output() editCancel:EventEmitter<any> = new EventEmitter();
  public shiftTemplate: ShiftTemplate = new ShiftTemplate({});
  public editing: boolean = false;
  public hstep:number = 1;
  public mstep:number = 15;
  public startTime: moment.Moment = moment().startOf('hour');
  public endTime: moment.Moment = moment().add(1, 'hours').startOf('hour');

  constructor(public shiftTemplateService: ShiftTemplateService) {}

  confirm() {
    this.shiftTemplate.startTime = moment(this.startTime);
    this.shiftTemplate.endTime = moment(this.endTime);
    this.shiftTemplateService.save(this.shiftTemplate);
    this.editCancel.emit({});
  }

  cancel() {
    this.editCancel.emit({});
  }
}
