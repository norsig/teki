import { BaseComponent,
         MultilingualService } from '../../shared/index';
import { CORE_DIRECTIVES }     from 'angular2/common';
import { ROUTER_DIRECTIVES,
         RouteConfig }         from 'angular2/router';
import { SidebarComponent }    from '../sidebar/index';
import { SchedulerComponent,
         TeamComponent,
         SettingComponent,
         ShiftSettingsComponent }  from '../../index';

@BaseComponent({
  selector: 'teki-app',
  templateUrl: 'app/components/app/app.html',
  styleUrls: ['app/components/app/app.css'],
  directives: [ROUTER_DIRECTIVES, SidebarComponent, CORE_DIRECTIVES],
  providers: [MultilingualService]
})

@RouteConfig([
  {
    path: '/scheduler',
    name: 'Scheduler',
    component: SchedulerComponent,
    useAsDefault: true
  },
  {
    path: '/team',
    name: 'Team',
    component: TeamComponent
  },
  {
    path: '/setting',
    name: 'Setting',
    component: SettingComponent
  },
  {
    path: '/shift-settings',
    name: 'ShiftSettings',
    component: ShiftSettingsComponent
  }
])

export class AppComponent {
  open:boolean = false;

  constructor(private multilang: MultilingualService) {
  }

  onToggled() {
    this.open = !this.open;
  }
}