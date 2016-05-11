import { Input, OnChanges } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import {
  BaseComponent,
  Shift,
  ShiftTemplate,
  Employee,
  ShiftService
} from '../../../../shared/index';
import { IDay, IWeek } from '../../../interfaces/index';
import { DailyShifts } from '../daily-shifts/index';
import { WeeklyHoursCalculator } from '../../../services/index';

@BaseComponent({
  selector: 'week',
  templateUrl: 'app/+scheduler/components/calendar/week/week.html',
  styleUrls: ['app/+scheduler/components/calendar/week/week.css'],
  bindings: [WeeklyHoursCalculator],
  directives: [COMMON_DIRECTIVES, DailyShifts]
})

export class Week implements OnChanges {
  @Input() week:    IWeek;
  @Input() shifts:  Array<Shift>;
  @Input() currentDate:    moment.Moment;
  @Input() showAll: boolean;
  @Input() shiftTemplates: Array<ShiftTemplate>;
  @Input() employees: Array<Employee>;
  private addSub:any = null;
  private updateSub:any = null;

  constructor(public calculatorService: WeeklyHoursCalculator, public shiftService: ShiftService) {
    this.addSub = this.shiftService.created.subscribe((shift: Shift) => this.onShiftAdded(shift));
    this.updateSub = this.shiftService.updated.subscribe((shift: Shift) => this.onShiftUpdated(shift));
  }

  ngOnInit() {
    this.initializeWeek();
  }

  ngOnChanges(changes: any) {
    if (changes.currentDate) {
      this.week = <IWeek> { date: this.currentDate, days: <IDay[]>[], shifts: <Shift[]>[] };
      this.week.days = this.getDays(this.shifts);
    }
  }

  ngOnDestroy() {
    this.addSub.unsubscribe();
    this.updateSub.unsubscribe();
    this.calculatorService.clear();
    this.calculatorService = null;
  }

  initializeWeek() {
    let shifts = this.week.shifts || this.shifts;
    let weekStart = this.currentDate.clone().startOf('week');
    let weekEnd = this.currentDate.clone().endOf('week');
    let weeklyShifts = _.filter(shifts, (shift: Shift) => {
      return weekStart <= shift.startTime && shift.endTime <= weekEnd;
    });
    this.week = this.week || <IWeek> { date: this.currentDate, days: <IDay[]>[], shifts: <Shift[]>[] };
    this.week.shifts = weeklyShifts;
    this.week.days = this.getDays(weeklyShifts);
    this.calculatorService.init(this.employees, this.week);
  }

  private onShiftUpdated(shift: Shift) {
    this.calculatorService.updateShift(shift);
  }

  private onShiftAdded(shift: Shift) {
    this.calculatorService.addShift(shift);
  }

  private getDays(shifts: Array<Shift>):Array<IDay> {
    let days = this.initDays(this.week.date);
    let groups = _.groupBy(shifts, (shift) => {
      return moment(shift.startTime).startOf('day').format('YYYYMMDD');
    });
    _.forEach(days, (day: IDay) => {
      day.shifts = groups[day.date.startOf('day').format('YYYYMMDD')] || [];
    });
    return days;
  }

  private initDays(weekStart: moment.Moment) {
    let result = [
      <IDay>{date: weekStart, shifts: []}
    ];
    for (let x = 1; x < 7; x ++ ) {
      let day = <IDay> {date: weekStart.clone().add(x, 'days'), shifts: []};
      result.push(day);
    }
    return result;
  }
}