import { ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent, PrivatePage }  from '../shared/index';
import { AppLayoutComponent } from '../components/app-layout/index';
import { Widget }           from '../components/widget/index';
import { WidgetBody }       from '../components/widget-body/index';
import { WidgetHeader }     from '../components/widget-header/index';
import { Row }              from './components/row/index';
import { Headers }          from './components/headers/index';
import { NewRow }           from './components/new-row/index';
import * as Service         from '../shared/services/index';

@BaseComponent({
  selector: 'teki-employee',
  templateUrl: 'app/+employee/employee.html',
  styleUrls: ['app/+employee/employee.css'],
  directives: [Widget, WidgetBody, WidgetHeader, Row, Headers, NewRow, AppLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

@PrivatePage()
export class EmployeeComponent {
  adding: boolean = false;

  constructor(private employeeService: Service.Admin.Employee) {}

  ngOnInit() {
    this.employeeService.load();
  }

  add() {
    this.adding = true;
  }

  cancel() {
    this.adding = false;
  }

  editCancel() {
    this.adding = false;
  }
}
