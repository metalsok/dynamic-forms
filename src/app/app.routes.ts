import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dynamic-form/dynamic-form').then(v => v.DynamicForm)
  }
];
