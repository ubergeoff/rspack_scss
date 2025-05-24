import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', loadComponent: () => import('@ffx/ui').then((c) => c.UiComponent) },
];
