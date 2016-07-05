import {
  BaseComponent,
  SecurityRouterOutlet,
  MultilingualService
} from '../../shared/index';
import { CORE_DIRECTIVES } from '@angular/common';
import {
  Router,
  ROUTER_DIRECTIVES,
  RouteConfig
} from '@angular/router-deprecated';
import { TekiRoutes } from './routes';
import { ViewContainerRef } from '@angular/core';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap/index';
import { Loading } from '../loading/index';
import * as Service from '../../shared/services/index';

@BaseComponent({
  selector: 'teki-app',
  templateUrl: 'app/components/app/app.html',
  styleUrls: ['app/components/app/app.css'],
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, SecurityRouterOutlet, Loading],
  viewProviders: [...BS_MODAL_PROVIDERS],
  providers: [MultilingualService]
})

//TODO: switch home route based on permissions
@RouteConfig(TekiRoutes)

export class AppComponent {
  constructor(
    private modal: Modal,
    private multilang: MultilingualService,
    private viewContainer: ViewContainerRef,
    private profileService: Service.Profile,
    private router: Router
  ) {
    modal.defaultViewContainer = viewContainer;
  }

  ngOnInit() {
    this.profileService.load();
  }
}
