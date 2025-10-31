export enum PrivateRoute {
  DefaultRoute = '/',
  LoginRoute = '/login',
  ProfileRoute = '/profile'
}

export enum AbsoluteAppRoute {
  Root = '/',
  Feed = '/feed',
  FeedNumber = '/feed/:number',
  Profile = '/profile',
  ProfileOrders = '/profile/orders',
  ProfileOrdersNumber = '/profile/orders/:number',
  Login = '/login',
  Register = '/register',
  ForgotPassword = '/forgot-password',
  IngredientsId = '/ingredients/:id',
  NotFound404 = '*'
}
