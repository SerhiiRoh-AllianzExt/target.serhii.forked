import { loadRemoteModule } from '@angular-architects/native-federation';
import { Route } from '@angular/router';

const ROUTES = {
  INPUTS: 'inputs',
  QUOTE: 'quote'
};

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTES.INPUTS,
  },
  {
    path: ROUTES.INPUTS,
    loadChildren: () => loadRemoteModule('mfeInputs', './mfe'),
  },
  {
    path: ROUTES.QUOTE,
    loadChildren: () => loadRemoteModule('mfeQuote', './mfe'),
  },
  {
    path: '**',
    redirectTo: ROUTES.INPUTS,
  },
];
