import React from 'react';
import DefaultLayout from './containers/DefaultLayout';
import * as config from './constants/constants';


const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Login = React.lazy(() => import('./views/Pages/Login/Login'))
const Class = React.lazy(() => import('./views/Class'))
const ClassAdd = React.lazy(() => import('./views/Class/AddClass'))
const UpdateClass = React.lazy(() => import('./views/Class/UpdateClass'))

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: config.BASE_URL + '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: config.BASE_URL + '/login', exact: true, name: 'Login Page', component: Login },
  
  { path: config.BASE_URL + '/class', exact: true, name: 'Class', component: Class },
  { path: config.BASE_URL + '/class-add', exact: true, name: 'Class Add', component: ClassAdd },
  { path: config.BASE_URL + '/class-update', exact: true, name: 'Class Update', component: UpdateClass },
 
];

export default routes;
