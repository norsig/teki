import {
  HttpErrorHandler,
  LoginService,
  AuthenticationService
} from './services/index';

import * as Api from './api/index';
import * as Reducer from './reducers/index';
import * as Model from './models/index';
import * as Actions from './actions/index';
import * as Service from './services/index';

import { MULTILINGUAL_PROVIDERS } from './i18n/index';

export * from './services/index';
export * from './directives/index';

export * from './core/index';
export * from './i18n/index';

export * from './constants/index';

export * from './interfaces/index';


import { WeekHelper } from '../index';

const APP_PROVIDERS: any[] = [
  MULTILINGUAL_PROVIDERS,
  LoginService,
  Api.Employee,
  Api.Admin.Shift,
  Api.Admin.Employee,
  Api.Admin.ShiftTemplate,
  Api.Admin.Company,
  Api.Shift,
  Api.Profile,
  AuthenticationService,
  HttpErrorHandler,
  Service.Admin.Shift,
  Service.Admin.Employee,
  Service.Admin.ShiftTemplate,
  Service.Admin.Company,
  Service.Shift,
  Service.Profile,
  Service.Employee,
  WeekHelper
];

const APP_STORE: any = {
  'admin.employees': Reducer.Admin.Employee,
  'admin.shiftTemplates': Reducer.Admin.ShiftTemplate,
  'admin.shifts': Reducer.Admin.Shift,
  'admin.companies': Reducer.Admin.Company,
  'shifts': Reducer.Shift,
  'profile': Reducer.Profile,
  'employees': Reducer.Employee
};

export {
  Model,
  Reducer,
  Api,
  Actions,
  APP_STORE,
  APP_PROVIDERS
};
