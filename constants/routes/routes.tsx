import { RoutesClassification } from '../../typesDefs/constants/routes/types';


export const RoutesHeadTitles = {
  HOME: 'home',
  BUS_ROUTE_PAGE: 'bus-route',
  ALL_BUS_ROUTES: 'all-bus-routes'
};
export const AllRoutes = {
  HOME: '/',
  BUS_ROUTE: '/bus-routes/:id',
  ALL_BUS_ROUTES: '/bus-routes',
};

export const AppRoutes: RoutesClassification = {
  PUBLIC: {
    HOME: {
      path: AllRoutes.HOME,
      exact: false
    },
    BUS_ROUTE: {
      path: AllRoutes.BUS_ROUTE,
      exact: false
    },
    ALL_BUS_ROUTES: {
      path: AllRoutes.ALL_BUS_ROUTES,
      exact: true
    },
  }
};
