import * as config from './constants/constants';
export default {
  items: [
    {
      name: 'Dashboard',
      url: config.BASE_URL + '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Rent Machine',
      url: config.BASE_URL + '/student',
      icon: 'icon-user'
    },
    {
      name: 'Manage Machines',
      url: config.BASE_URL + '/class',
      icon: 'icon-home',
      // children: [
      //   {
      //     name: 'ClassAdd',
      //     url: '/class-add',
      //     icon: 'icon-calendar',
      //   },
      // ]
    },
    {
      name: 'Manage Reports',
      url: config.BASE_URL + '/reports',
      icon: 'cui-chart',
      children: [
        {
          name: 'Machine Detail Report',
          url: config.BASE_URL + '/report',
          icon: 'icon-calendar',
        },
        
      ]
    },
  ],
};
