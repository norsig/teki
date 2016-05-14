import { ChangeDetectionStrategy } from '@angular/core';
import {
  BaseComponent,
  ShiftTemplate,
  ShiftTemplateService,
  PrivatePage
}  from '../shared/index';
import { AppLayoutComponent } from '../components/app-layout/index';
import { Widget }             from '../components/widget/index';
import { WidgetBody }         from '../components/widget-body/index';
import { WidgetHeader }       from '../components/widget-header/index';
import { Row }                from './components/row/index';
import { Headers }            from './components/headers/index';
import { NewRow }             from './components/new-row/index';
import { Observable }         from 'rxjs/Observable';

@BaseComponent({
  selector: 'teki-shift-settings',
  templateUrl: 'app/+shift-settings/shift-settings.html',
  styleUrls: ['app/+shift-settings/shift-settings.css'],
  directives: [Widget, WidgetBody, WidgetHeader, Row, Headers, NewRow, AppLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

@PrivatePage()
export class ShiftSettingsComponent {
  templates: Observable<Array<ShiftTemplate>>;
  adding: boolean = false;

  constructor(private shiftTemplateService: ShiftTemplateService) {}

  ngOnInit() {
    this.templates = this.shiftTemplateService.shiftTemplates;
    this.shiftTemplateService.load();
  }

  add() {
    this.adding = true;
  }

  cancel() {
    this.adding = false;
  }

  editCancel() {
    this.cancel();
  }
}
